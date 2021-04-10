'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
const account10 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account20 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account30 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account40 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};
const newAccounts = [account10, account20, account30, account40];

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

///////////////////////////////////////
// LOOPING ARRAYS: forEach()
const newMovements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// for (const movement of movements) {
for (const [i, newMovement] of movements.entries()) {
  if (newMovement > 0) {
    console.log(`Movement ${i + 1}: You deposited ${newMovement}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(newMovement)}`);
  }
}

console.log('---- FOREACH ----');
//mov, The current element being processed in the array
//i, The index of currentValue in the array
//arr, The array forEach() was called upon
//IMPORTANT: continue & break don't work into forEach.
newMovements.forEach(function (mov, i, arr) {
  if (mov > 0) {
    console.log(`Movement ${i + 1}: You deposited ${mov}`);
  } else {
    console.log(`Movement ${i + 1}: You withdrew ${Math.abs(mov)}`);
  }
});
// 0: function(200)
// 1: function(450)
// 2: function(400)
// ...

///////////////////////////////////////
// forEach With Maps and Sets
// Map - forEach(function (value, key, map)
const currencies2 = new Map([
  ['USD', 'United States dollar'],
  ['EUR', 'Euro'],
  ['GBP', 'Pound sterling'],
]);

currencies2.forEach(function (value, key, map) {
  console.log(`${key}: ${value}`);
});

// Set
//We don't need the key parameter, as sets don't have keys
//To omit a parameter that we don't need, we have to use an underscore '_'
const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
console.log(currenciesUnique);
currenciesUnique.forEach(function (value, _, set) {
  console.log(`${value}: ${value}`);
});

///////////////////////////////////////
// The map Method
const eurToUsd = 1.1;

// const movementsUSD = movements.map(function (mov) {
//   return mov * eurToUsd;
// });

const movementsUSD = movements.map(mov => mov * eurToUsd);

console.log(movements);
console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
console.log(movementsUSDfor);

const movementsDescriptions = movements.map(
  (mov, i) =>
    `Movement ${i + 1}: You ${mov > 0 ? 'deposited' : 'withdrew'} ${Math.abs(
      mov
    )}`
);
console.log(movementsDescriptions);

///////////////////////////////////////
// The filter Method
const deposits = movements.filter(function (mov) {
  //filter() creates an array of elements from another array
  return mov > 0; //if mov fits the conditions, goes into the deposits array
});
console.log(movements);
console.log(deposits);

const depositsFor = [];
for (const mov of movements) if (mov > 0) depositsFor.push(mov);
console.log(depositsFor);

//filter() creates an array of elements from another array
const withdrawals = movements.filter(function (mov) {
  return mov < 0; //if mov fits the conditions, goes into the deposits array
});
/* const withdrawals = movements.filter(mov => mov < 0); */
console.log(withdrawals);

///////////////////////////////////////
// The reduce Method - Reducing all the values of an array to a single value
//array.reduce(function(accumulator, arrayElement, i, array), accumulator_initial_value)
console.log(movements);

// accumulator -> SNOWBALL that accumulates the values
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}: ${acc}`);
//   return acc + cur;
// }, 0);
const balance = movements.reduce((acc, cur) => acc + cur, 0);
console.log(balance);

let balance2 = 0;
for (const mov of movements) balance2 += mov;
console.log(balance2);
console.log('aaaaaaaaaaaaaaaaaaa');

const maxValue = movements.reduce((acc, cur) => {
  cur > acc ? (acc = cur) : acc;
  return acc;
}, movements[0]); //Number.MIN_VALUE to get the minimum possible value
console.log(maxValue);

const maxValue2 = movements.reduce(
  (acc, cur) => (acc > cur ? acc : cur),
  movements[0]
);
console.log(maxValue2);
/* // Maximum value
const max = movements.reduce((acc, mov) => {
  if (acc > mov) return acc;
  else return mov;
}, movements[0]);
console.log(max);
 */

///////////////////////////////////////
// The Magic of Chaining Methods
/* const eurToUsd = 1.1; */

//PIPELINE
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

///////////////////////////////////////
// The find Method
//Retrieves the FIRST element in the array that satisfies the condition
//Just the element, not an array
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);

console.log(newAccounts);

const account = newAccounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

///////////////////////////////////////
// The includes Method
//Determines whether an array includes a certain value among its entries, returning true or false
const array1 = [1, 2, 3];

console.log(array1.includes(2));
// expected output: true
console.log(array1.includes(8));
// expected output: false

///////////////////////////////////////
// some and every
console.log(movements);

// ONLY EQUALITY
console.log(movements.includes(-130));

// SOME: CONDITION
console.log(movements.some(mov => mov === -130));

const anyDeposits = movements.some(mov => mov > 0);
console.log('Any deposits? ' + anyDeposits); //True

// EVERY
console.log(movements.every(mov => mov > 0));
console.log(account40.movements.every(mov => mov > 0));

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));
