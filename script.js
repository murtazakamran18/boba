let order = [];
let playerOrder = [];
let timeLeft = 40;
let score = 0;
let timer;
let ingredients = ["boba", "milk", "ice", "sugar"];
let customerEmotion = 'neutral';

const orderElement = document.getElementById("order");
const timerElement = document.getElementById("time-left");
const scoreElement = document.getElementById("score");
const messageElement = document.getElementById("message");
const restartButton = document.getElementById("restart-button");
const customerReaction = document.getElementById("customer-reaction");

function startGame() {
  generateOrder();
  resetTimer();
  messageElement.textContent = "";
  restartButton.style.display = "none";
  playBackgroundMusic();
}

function generateOrder() {
  const ingredientCount = 2 + Math.floor(Math.random() * 3); // 2 to 4 ingredients per order
  order = [];
  for (let i = 0; i < ingredientCount; i++) {
    const randomIngredient = ingredients[Math.floor(Math.random() * ingredients.length)];
    if (!order.includes(randomIngredient)) {
      order.push(randomIngredient);
    }
  }
  orderElement.textContent = order.join(" + ");
  playerOrder = [];
  customerEmotion = 'neutral';
  updateCustomerReaction();
}

function addIngredient(ingredient) {
  playerOrder.push(ingredient);
  messageElement.textContent = `Added: ${ingredient}`;
  messageElement.style.color = "#4b3832";
  
  if (playerOrder.length === order.length) {
    checkOrder();
  }
}

function checkOrder() {
  if (JSON.stringify(playerOrder) === JSON.stringify(order)) {
    score += 10;
    document.getElementById("correct-sound").play();
    messageElement.textContent = "✔️ Order completed!";
    messageElement.style.color = "green";
    customerEmotion = 'happy';
  } else {
    score -= 5;
    document.getElementById("wrong-sound").play();
    messageElement.textContent = "❌ Wrong order!";
    messageElement.style.color = "red";
    customerEmotion = 'angry';
  }
  scoreElement.textContent = score;
  updateCustomerReaction();
  generateOrder();
  resetTimer();
}

function resetTimer() {
  clearInterval(timer);
  timerElement.textContent = timeLeft;
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      messageElement.textContent = "⏰ Time's up!";
      messageElement.style.color = "red";
      restartButton.style.display = "block";
    }
  }, 1000);
}

function updateCustomerReaction() {
  if (customerEmotion === 'happy') {
    customerReaction.innerHTML = "😊 Customer is happy!";
    customerReaction.style.color = "green";
  } else if (customerEmotion === 'angry') {
    customerReaction.innerHTML = "😡 Customer is angry!";
    customerReaction.style.color = "red";
  } else {
    customerReaction.innerHTML = "😐 Customer is waiting...";
    customerReaction.style.color = "orange";
  }
}

function restartGame() {
  score = 0;
  timeLeft = 40;
  scoreElement.textContent = score;
  messageElement.textContent = "";
  restartButton.style.display = "none";
  startGame();
}

function playBackgroundMusic() {
  document.getElementById("bg-music").play();
}

startGame();
