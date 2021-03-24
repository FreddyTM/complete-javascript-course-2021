'use strict';

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = Number(document.querySelector('.score').textContent);
let highScore = Number(document.querySelector('.highscore').textContent);
let winColor = '#60b347';
let startColor = '#222';

//Restarts the game when the user clicks the button 'Again!""
function reStartGame() {
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  score = 20;
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
  setMessage('Start guessing...');
  document.querySelector('body').style.backgroundColor = startColor;
  document.querySelector('.number').textContent = '?';
  document.querySelector('.number').style.width = '15rem';
}

//Checks the game to see if the player wins or loses
function checkGame() {
  const guess = Number(document.querySelector('.guess').value);

  if (!guess) {
    setMessage('No number!');
  } else if (guess === secretNumber) {
    setMessage('Correct number!');
    document.querySelector('body').style.backgroundColor = winColor;
    document.querySelector('.number').textContent = secretNumber;
    document.querySelector('.number').style.width = '30rem';
    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }
  } else if (score > 0) {
    if (guess > secretNumber) {
      setMessage('Too high!');
    } else {
      setMessage('Too low!');
    }
    score--;
    document.querySelector('.score').textContent = score;
  } else {
    setMessage('You lost the game!');
  }
}

//Sets the message
function setMessage(message) {
  document.querySelector('.message').textContent = message;
}

//Listener of the button 'Check!' click
document.querySelector('.check').addEventListener('click', function () {
  checkGame();
});

//Listener of the button 'Again!' click
document.querySelector('.again').addEventListener('click', function () {
  reStartGame();
});
