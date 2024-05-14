let gameInit = false;
let level = 1;

// These arrays will contain the ids.
// In the manner they are pressed.
const aiActions = [];
const userActions = [];

const btnIds = [];

// Track the click of the user on each and every box.
// To also check the terminate condition.
let userActionIndex = 0;

// By this variable we will make the user to wait for the Animation of the AI to get complete.
// So that the user doesn't have to interact while AI animation is going on.
let isAIWorking = false;

// CSS Classes Variables.
const pressedCSSClassName = "pressed";
const gameOverCSSClassName = "game-over";

// ----------------------------------------------------------------
// MAIN
// ----------------------------------------------------------------

const buttons = document.querySelectorAll(".container .btn");

for (let i = 0; i < buttons.length; i++) {
  const button = buttons[i];
  btnIds.push(button.getAttribute("id"));
  button.addEventListener("click", _handleButtonClick);
}

document.addEventListener("keypress", function(event) {
  // If the game was over & is restarted
  if (gameInit) {
    _startGame();
  }

  // First Time to Start the game.
  if (!gameInit && event.key.toLowerCase() === "a") {
    _startGame();
    gameInit = true;
  }
});

// ----------------------------------------------------------------
// EXIT
// ----------------------------------------------------------------

function _startGame() {
  const levelTitle = document.querySelector("#level-title");
  levelTitle.textContent = `Level: ${level}`;
  _ai();
}

function _ai() {
  isAIWorking = true;

  // Generate a random Index from the btnIds array.
  const randomIndex = Math.round(Math.random() * (btnIds.length - 1));

  // Generate a Random Id from the random function.
  const randomId = btnIds[randomIndex];

  // Push the random Id into the AI List.
  aiActions.push(randomId);

  // Play the Animation and Sound Effect.
  const btn = document.querySelector(`#${randomId}`);
  btn.classList.add(pressedCSSClassName);

  _playSound(`sounds/${randomId}.mp3`);

  setTimeout(() => {
    btn.classList.remove(pressedCSSClassName);
  }, 150);

  // Reset the user Interaction Index
  userActionIndex = 0;

  // Reset the user Interaction Array
  userActions.length = 0;

  isAIWorking = false;
}

function _handleButtonClick() {
  if (isAIWorking) {
    return;
  }

  const btnId = this.getAttribute("id").toLowerCase();

  userActions.push(btnId);

  if (aiActions[userActionIndex] !== userActions[userActionIndex]) {
    _gameOver();
    return;
  }

  this.classList.add(pressedCSSClassName);
  _playSound(`sounds/${btnId}.mp3`);

  setTimeout(() => {
    this.classList.remove(pressedCSSClassName);
  }, 100);

  if (aiActions.length === userActions.length) {
    setTimeout(() => {
      _levelUp();
      _ai();
    }, 800);
  }
}

function _gameOver() {
  userActionIndex = 0;
  aiActions.length = 0;
  userActions.length = 0;

  level = 1;

  const levelTitle = document.querySelector("#level-title");
  levelTitle.textContent = "Game Over, Press Any Key to Restart";

  const body = document.querySelector("body");
  body.classList.add(gameOverCSSClassName);

  _playSound("sounds/wrong.mp3");

  setTimeout(() => {
    body.classList.remove(gameOverCSSClassName);
  }, 150);
}

function _playSound(path) {
  const audio = new Audio(path);
  audio.play();
}

function _levelUp() {
  level++;
  const levelTitle = document.querySelector("#level-title");
  levelTitle.textContent = `Level: ${level}`;
}
