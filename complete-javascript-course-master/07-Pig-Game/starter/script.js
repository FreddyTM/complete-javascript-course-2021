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

let playing, currentScore, activePlayer, scores;

const init = function () {
  //Game is active again
  playing = true;
  //Reset scores
  scores = [0, 0]; //Total scores of the players
  currentScore = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  for (let i = 0; i < scores.length; i++) {
    scores[i] = 0;
  }
  //Reset active player
  activePlayer = 0;
  //Hide the dice
  diceEl.classList.add('hidden');
  //Remove player winner state
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  //Set player 0 as player active
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

//Starting conditions
init();

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
  //If the game is not finished yet
  if (playing) {
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
  }
});

btnHold.addEventListener('click', function () {
  //If the game is not finished yet
  if (playing) {
    //Add current score to active player score
    /* Number(`score${activePlayer}El`.textContent) += currentScore; */
    scores[activePlayer] += currentScore;
    activePlayer === 0
      ? (score0El.textContent = scores[activePlayer])
      : (score1El.textContent = scores[activePlayer]);
    //Check score > 100. If so, finish the game
    if (scores[activePlayer] >= 100) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      //Hide the dice
      diceEl.classList.add('hidden');
      //Game is no longer active
      playing = false;
      //Score < 100, switch players
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
