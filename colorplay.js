const colors = ["red", "green", "blue", "yellow"];
let sequence = [];
let playerSequence = [];
let level = 0;
let canClick = false;

const statusEl = document.getElementById("status");
const startBtn = document.getElementById("startBtn");

// Hiển thị hiệu ứng nhấp sáng màu
function flashColor(color) {
  const btn = document.getElementById(color);
  btn.style.opacity = "1";
  btn.style.scale = "1.05";
  setTimeout(() => {
    btn.style.opacity = "0.85";
    btn.style.scale = "1";
  }, 400);
}

// Phát chuỗi màu cho người chơi xem
async function playSequence() {
  canClick = false;
  for (let color of sequence) {
    flashColor(color);
    await new Promise(res => setTimeout(res, 600));
  }
  canClick = true;
}

// Khi người chơi nhấn nút màu
function handleColorClick(color) {
  if (!canClick) return;
  flashColor(color);
  playerSequence.push(color);

  const currentStep = playerSequence.length - 1;
  if (playerSequence[currentStep] !== sequence[currentStep]) {
    statusEl.textContent = "❌ Sai rồi! Trò chơi kết thúc.";
    canClick = false;
    level = 0;
    sequence = [];
    startBtn.textContent = "Chơi lại";
    return;
  }

  if (playerSequence.length === sequence.length) {
    level++;
    statusEl.textContent = "✅ Đúng rồi! Cấp độ: " + level;
    playerSequence = [];
    setTimeout(nextRound, 1000);
  }
}

// Bắt đầu vòng chơi mới
function nextRound() {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  sequence.push(randomColor);
  statusEl.textContent = "Cấp độ " + (level + 1);
  playSequence();
}

startBtn.addEventListener("click", () => {
  sequence = [];
  playerSequence = [];
  level = 0;
  statusEl.textContent = "Chuẩn bị...";
  nextRound();
  startBtn.textContent = "Đang chơi...";
});

colors.forEach(color => {
  document.getElementById(color).addEventListener("click", () => handleColorClick(color));
});