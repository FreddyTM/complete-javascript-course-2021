'use strict';

//Selecting elements
//Getting element by id with querySelector and #
const score0El = document.querySelector('#score--0');
//Getting element by id with getElementById (no neeo of #)
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

//Starting conditions
const scores = [0, 0]; //Total scores of the players
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

let currentScore = 0;
let activePlayer = 0;
const switchPlayer = function () {
  //Set current score back to 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  //Switch player
  activePlayer = activePlayer === 0 ? 1 : 0;
  //Change background
  /*toggle() removes a class if the element has it, or adds it if the element
  doesn't have it*/
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//Button listeners
btnRoll.addEventListener('click', function () {
  //1. Generate random number
  const diceNumber = Math.trunc(Math.random() * 6) + 1;
  //2. Display dice
  diceEl.classList.remove('hidden');
  /*Instead of an if or switch statement, we'll use a template literal
  to directly assign the name of the image source*/
  diceEl.src = `dice-${diceNumber}.png`;
  //3. Check for rolled 1. If true, switch to next player
  if (diceNumber !== 1) {
    //Add the score to the current score
    currentScore += diceNumber;
    //show currentScore of the active player
    document.getElementById(
      `current--${activePlayer}`
    ).textContent = currentScore;
  } else {
    switchPlayer();
  }
});

btnHold.addEventListener('click', function () {
  //Add current score to active player score
  /* Number(`score${activePlayer}El`.textContent) += currentScore; */
  scores[activePlayer] += currentScore;
  activePlayer === 0
    ? (score0El.textContent = scores[activePlayer])
    : (score1El.textContent = scores[activePlayer]);
  //Check score > 100. If so, finish the game
  if (Number(`score${activePlayer}El`.textContent) >= 100) {
    console.log('End game');
    //Score < 100, switch players
  } else {
    switchPlayer();
  }
});
