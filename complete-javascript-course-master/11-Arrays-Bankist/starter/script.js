'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

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
// LECTURES

const currencies = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/////////////////////////////////////////////////
//SIMPLE ARRAY METHODS
let arr = ['a', 'b', 'c', 'd', 'e'];
// SLICE (Returns a sliced array (start_position, end_position)) (IT DOESN'T CHANGE)
console.log(arr.slice(2)); //["c", "d", "e"] without end, we get from position 2 to the end
console.log(arr.slice(2, 4)); //["c", "d"] with an end, we get from position 2 to position end - 1
console.log(arr.slice(-2)); //["d", "e"] negative position, start from the end
console.log(arr.slice(-1)); //["e"]
console.log(arr.slice(1, -2)); //["b", "c"]
console.log(arr.slice()); //["a", "b", "c", "d", "e"] --SHALLOW COPY
console.log([...arr]); //["a", "b", "c", "d", "e"] --SHALLOW COPY

// SPLICE - adds, inserts or delete elements of he original array (IT DOES CHANGE)
//console.log(arr.splice(2)); // arr = ["c", "d", "e"]
arr.splice(-1); //arr = ["a", "b", "c", "d"]
console.log(arr);
//second parameter is delete_count, so deletion starts at start_position, and deletes delete_count elements
arr.splice(1, 2);
console.log(arr); //arr = ["a", "d"]

const months = ['Jan', 'March', 'April', 'June'];
months.splice(1, 0, 'Feb'); //if delete_count is 0, 'Feb' is inserted at position 1
// inserts at index 1
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "June"]
months.splice(4, 1, 'May'); //if delete_count is 1, element at position 4 is replaced by 'May'
// replaces 1 element at index 4
console.log(months);
// expected output: Array ["Jan", "Feb", "March", "April", "May"]

// REVERSE - reverse the elements of the original array (IT DOES CHANGE)
arr = ['a', 'b', 'c', 'd', 'e'];
const arr2 = ['j', 'i', 'h', 'g', 'f'];
console.log(arr2.reverse()); // ["f", "g", "h", "i", "j"]
console.log(arr2); // ["f", "g", "h", "i", "j"]

// CONCAT - the original arrays are not changed
const letters = arr.concat(arr2);
console.log(letters); //["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"]
console.log([...arr, ...arr2]); //the same as concat()

// JOIN - Gets a string with all the elements of an array separated by the character passed as argument
console.log(letters.join(' - ')); //a - b - c - d - e - f - g - h - i - j
