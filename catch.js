// Game elements
const gameContainer = document.getElementById("gameContainer");
const ball = document.getElementById("ball");
const paddle = document.getElementById("paddle");
const scoreDisplay = document.getElementById("score");

// Ball and paddle properties
let ballX = Math.random() * (gameContainer.offsetWidth - 20);
let ballY = 0;
let ballSpeedX = 2;
let ballSpeedY = 2;

let paddleX = gameContainer.offsetWidth / 2 - 50;
const paddleSpeed = 20;

let score = 0;

// Power-up element
const powerUp = document.createElement("div");
powerUp.id = "powerUp";
powerUp.style.position = "absolute";
powerUp.style.width = "20px";
powerUp.style.height = "20px";
powerUp.style.backgroundColor = "yellow";
powerUp.style.borderRadius = "50%";
powerUp.style.display = "none"; // Initially hidden
gameContainer.appendChild(powerUp);

// Move the paddle
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft" && paddleX > 0) {
    paddleX -= paddleSpeed;
  } else if (
    e.key === "ArrowRight" &&
    paddleX < gameContainer.offsetWidth - paddle.offsetWidth
  ) {
    paddleX += paddleSpeed;
  }
  paddle.style.left = `${paddleX}px`;
});

// Ball movement
function moveBall() {
  ballX += ballSpeedX;
  ballY += ballSpeedY;

  // Ball bouncing off walls
  if (ballX <= 0 || ballX >= gameContainer.offsetWidth - ball.offsetWidth) {
    ballSpeedX *= -1;
  }
  if (ballY <= 0) {
    ballSpeedY *= -1;
  }

  // Ball hitting the paddle
  if (
    ballY + ball.offsetHeight >=
      gameContainer.offsetHeight - paddle.offsetHeight &&
    ballX + ball.offsetWidth >= paddleX &&
    ballX <= paddleX + paddle.offsetWidth
  ) {
    ballSpeedY *= -1;
    score++;
    scoreDisplay.textContent = score;
  }

  // Ball falling out of bounds
  if (ballY > gameContainer.offsetHeight) {
    alert(`Game Over! Your score: ${score}`);
    ballX = Math.random() * (gameContainer.offsetWidth - 20);
    ballY = 0;
    score = 0;
    scoreDisplay.textContent = score;
  }

  ball.style.left = `${ballX}px`;
  ball.style.top = `${ballY}px`;

  requestAnimationFrame(moveBall);
}

// Randomly spawn power-ups
function spawnPowerUp() {
  powerUp.style.display = "block";
  powerUp.style.left = `${Math.random() * (gameContainer.offsetWidth - 20)}px`;
  powerUp.style.top = `${Math.random() * (gameContainer.offsetHeight / 2)}px`;

  // Detect collision with paddle
  const collisionInterval = setInterval(() => {
    const powerUpRect = powerUp.getBoundingClientRect();
    const paddleRect = paddle.getBoundingClientRect();
    if (
      powerUpRect.bottom >= paddleRect.top &&
      powerUpRect.right >= paddleRect.left &&
      powerUpRect.left <= paddleRect.right
    ) {
      powerUp.style.display = "none"; // Hide power-up
      paddle.style.width = `${paddle.offsetWidth + 20}px`; // Enlarge paddle
      setTimeout(() => {
        paddle.style.width = "100px"; // Reset paddle size
      }, 5000);
      clearInterval(collisionInterval);
    }
  }, 100);
}

// Spawn power-up every 10 seconds
setInterval(spawnPowerUp, 10000);

// Start the game
moveBall();
