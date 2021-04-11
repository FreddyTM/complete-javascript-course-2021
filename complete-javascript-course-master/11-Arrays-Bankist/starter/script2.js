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

// SOME: CONDITION (true if any element pass the condition)
console.log(movements.some(mov => mov === -130));

const anyDeposits = movements.some(mov => mov > 0);
console.log('Any deposits? ' + anyDeposits); //True

// EVERY : CONDITION (true if all the elements pass the condition)
console.log(movements.every(mov => mov > 0));
console.log(account40.movements.every(mov => mov > 0));

// Separate callback
const deposit = mov => mov > 0;
console.log(movements.some(deposit));
console.log(movements.every(deposit));
console.log(movements.filter(deposit));

///////////////////////////////////////
// flat and flatMap
//FLAT: removes nested arrays. We get an array with only single elements
//No callback function needed
const arrX = [[1, 2, 3], [4, 5, 6], 7, 8];
console.log(arrX.flat());
//flat(flat_levels) -> if there are multiple-level nested arrays, flat_levels tells how deep you flat the array
const arrDeep = [[[1, 2], 3], [4, [5, 6]], 7, 8];
console.log(arrDeep.flat()); //[1, 2, 3, 4, 5, 6, 7, 8]
console.log(arrDeep.flat(2)); //[[1, 2], 3, 4, [5, 6], 7, 8]

// flat
const overalBalance = newAccounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

// flatMap combines flat & map methods. We need the callback of the map function
//It goes only one level deep flat
const overalBalance2 = newAccounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);

///////////////////////////////////////
// Sorting Arrays
//IMPORTANT: The original array gets changed
//sort() doesn't work with mixed arrays, only with strings or numbers arrays

// Strings
const owners = ['Jonas', 'Zach', 'Adam', 'Martha'];
console.log(owners.sort());
console.log(owners);

// Numbers
//sort() transform numbers into strings and sort them in alphabetical order
//so the sorting is not numerically correct. To achieve that, we need a callback function
console.log(movements);

// return < 0, A, B (keep order)
// return > 0, B, A (switch order)

// Ascending
//a, b -> any two consecutive numbers in the array

/* movements.sort((a, b) => {
  if (a > b) return 1; //Any value greater than 0
  if (a < b) return -1; //Any value less than 0
}); */
movements.sort((a, b) => a - b); //a > b, return positive | a < b, return negative
console.log(movements);

// Descending
movements.sort((a, b) => {
  if (a > b) return -1;
  if (a < b) return 1;
});
movements.sort((a, b) => b - a);
console.log(movements);

///////////////////////////////////////
// More Ways of Creating and Filling Arrays
const arr3 = [1, 2, 3, 4, 5, 6, 7];
console.log(new Array(1, 2, 3, 4, 5, 6, 7));

// Empty arrays + fill method
const x = new Array(7);
console.log(x); //7 empty spaces in the array

//fill(content, start_index, end_index)
x.fill(1, 3, 5); // [empty × 3, 1, 1, empty × 2]
console.log(x);
x.fill(1); // [1, 1, 1, 1, 1, 1, 1]
console.log(x);
//The array doesn't have to be empty
arr3.fill(23, 2, 6); //Before [1, 2, 3, 4, 5, 6, 7] , after [1, 2, 23, 23, 23, 23, 7]
console.log(arr3);

// Array.from
const y = Array.from({ length: 7 }, () => 1);
console.log(y); //// [1, 1, 1, 1, 1, 1, 1]

// Array.from({object_length}, (current_element, index) => callback function)
const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z); //[1, 2, 3, 4, 5, 6, 7]

console.log(Math.trunc(Math.random() * 6 + 1));
const diceArray = Array.from({ length: 100 }, () =>
  Math.trunc(Math.random() * 6 + 1)
);
console.log(diceArray);

/* labelBalance.addEventListener('click', function () {
  const movementsUI = Array.from(
    document.querySelectorAll('.movements__value'),
    el => Number(el.textContent.replace('€', ''))
  );
  console.log(movementsUI);

  const movementsUI2 = [...document.querySelectorAll('.movements__value')];
}); */

// 4. Capitalice first letter of every word of a sentence
// this is a nice title -> This Is a Nice Title
// some words must not be capitalize, they'll be in an array of exceptions
const convertTitleCase = function (title) {
  const exceptions = [
    'a',
    'an',
    'and',
    'the',
    'but',
    'or',
    'on',
    'in',
    'with',
    'to',
    'of',
  ];

  //The first word of the sentence must be capitalized no matter what
  const capitalize = str => str[0].toUpperCase() + str.slice(1);
  const splitted = title
    .toLowerCase()
    .split(' ')
    .map(val => (exceptions.includes(val) ? val : capitalize(val)))
    .join(' ');
  return capitalize(splitted);
};
console.log(convertTitleCase('this is a nice title'));
console.log(convertTitleCase('THis iS A niCE TiTLe'));
console.log(
  convertTitleCase(
    'tHis wiLl be ANOTHER SENtence to ChecK, the loNGest one anD THE mosT COMpLEx'
  )
);
console.log(convertTitleCase('and this IS The fiNAL CHEck oF all'));
//////////////////////////////////////////////////////
