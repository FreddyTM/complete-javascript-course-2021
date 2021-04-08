'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

/////////////////////////////////////////////////
// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

/////////////////////////////////////////////////
/////////////////////////////////////////////////

const displayMovements = function (movements) {
  //Empty movements list
  //innerHTML replaces whatever html code with the code on the right of =, in this case, nothing.
  containerMovements.innerHTML = '';

  movements.forEach(function (mov, i) {
    //Set the type: positive -> deposit, negative -> withdrawal
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    //html to insert into the movements div as a new movement row
    const html = `
      <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    } ${type}</div>
        <div class="movements__value">${mov}€</div>
      </div>
    `;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

/* displayMovements(account1.movements); */

const createUserNames = function (accs) {
  //accs -> array of objects
  accs.forEach(function (account) {
    //for each object into the array of objects
    account.userName = account.owner //create new property called userName, and put the initials of owner property
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUserNames(accounts);
/* const createUserNames = function (user) {
  const userName = user
    .toLowerCase()
    .split(' ')
    .map(name => name[0])
    .join('');
  return userName;
}; */
console.log(accounts);

/* const user = 'Steven Thomas Williams'; */
//["s", "t", "w"] -> join() -> stw
/* console.log(userName); */
/* const userName = user.toLowerCase().split(' '); //['steven`, 'thomas', 'williams']
const userInitials = [];
userName.forEach(function (mov, i, arr) {
  userInitials.push(arr[i].slice(0, 1).toUpperCase());
});
console.log(userInitials); */

const calcDisplayBalance = function (account) {
  account.balance = account.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${account.balance}€`;
};

/* calcDisplayBalance(account1.movements); */

const calcDisplaySummary = function (account) {
  const incomes = account.movements
    .filter(mov => mov > 0) //positive values
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes}€`;
  const out = account.movements
    .filter(mov => mov < 0) //negative values
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}€`;
  //interest 1.2% only if interest >= 1€
  const interest = account.movements
    .filter(mov => mov > 0) //positive values
    .map(deposit => (deposit * account.interestRate) / 100)
    .filter(interest => interest >= 1) //interest >= 1
    .reduce((acc, interest) => acc + interest, 0);
  labelSumInterest.textContent = `${interest}€`;
};
/* calcDisplaySummary(account1.movements); */

//Display movements, balance & summary
const updateUI = function (account) {
  displayMovements(account.movements);
  calcDisplayBalance(account);
  calcDisplaySummary(account);
};

// EVENT HANDLER
let currentAccount;

//Hitting enter in an input element into a from will trigger the click event of the button in the form
btnLogin.addEventListener('click', function (e) {
  //Prevent form from submitting
  e.preventDefault();
  currentAccount = accounts.find(
    acc => acc.userName === inputLoginUsername.value
  );
  console.log(currentAccount);
  //optional chaining (currentAccount?) -> ok if exists (not null or)
  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;
    //Clear input fields
    //CHAIN ASSIGNMENT
    inputLoginUsername.value = inputLoginPin.value = '';
    //Remove focus from an element
    inputLoginUsername.blur();
    inputLoginPin.blur();
    //Update UI
    updateUI(currentAccount);
    /* displayMovements(currentAccount.movements);
    calcDisplayBalance(currentAccount);
    calcDisplaySummary(currentAccount); */
  }
  console.log('LOGIN');
});

//inputTransferTo inputTransferAmount btnTransfer
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.userName === inputTransferTo.value
  );
  if (
    amount > 0 &&
    currentAccount.balance >= amount &&
    receiverAcc && //receiver account exists
    receiverAcc?.userName !== currentAccount.userName
  ) {
    //Transfer money
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    console.log('Transfer valid');
    //Update UI
    updateUI(currentAccount);
  }
  //Clean input values
  inputTransferAmount.value = inputTransferTo.value = '';
  inputTransferAmount.blur();
  inputTransferTo.blur();
});
