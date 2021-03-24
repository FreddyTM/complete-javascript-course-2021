'use strict';

let hasDriversLicense = false;
const passTest = true;

if (passTest) hasDriversLicense = true;
if (hasDriversLicense) console.log('I can drive :D');
/* const interface = "Audio"; --RESERVED NAME */
/* const private = 534; --RESERVED NAME */

/*FUNCTIONS*/
function logger() {
  console.log('My name is Jonas');
}

logger();

function fruitProcessor(apples, oranges) {
  const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
  return juice;
}

const appleJuice = fruitProcessor(5, 0);
console.log(appleJuice);

const appleOrangeJuice = fruitProcessor(2, 4);
console.log(appleOrangeJuice);

//Function declaration (the function can be called before being declared)
function calcAge1(birthYear) {
  const age = 2037 - birthYear;
  return age;
}

const age1 = calcAge1(1991);
console.log(age1);

//Function expression (the function cannot be called before being declared)
const calcAge2 = function (birthYear) {
  return 2037 - birthYear;
};
const age2 = calcAge2(1991);
console.log(age2);

//Arrow function
//Cannot use 'this'
//Optional parenthesis if only one parameter
//Single line of code, no curly braces & implicit return;
const calcAge3 = (birthYear) => 2037 - birthYear;
const age3 = calcAge3(1991);
console.log(age3);

//Multiple lines of code, curly braces & need of explicit return;
const yearsUntilRetirement = (birthYear, firstName) => {
  const age = 2037 - birthYear;
  const retirement = 65 - age;
  /*   return retirement; */
  return `${firstName} retires in ${retirement} years`;
};
console.log(yearsUntilRetirement(1991, 'Jonas'));
console.log(yearsUntilRetirement(1980, 'Bob'));

/* function fruitProcessor(apples, oranges) {
    const juice = `Juice with ${apples} apples and ${oranges} oranges.`;
    return juice;
  } */

function cutFruitPieces(fruit) {
  return fruit * 4;
}

function fruitProcessor(apples, oranges) {
  const applePieces = cutFruitPieces(apples);
  const orangePieces = cutFruitPieces(oranges);

  const juice = `Juice with ${applePieces} pieces of apple and ${orangePieces} pieces of orange.`;
  return juice;
}

console.log(fruitProcessor(2, 3));

/* ARRAYS */
const friends = ['Michael', 'Steven', 'Peter'];
console.log(friends);
const dates = new Array(1991, 1984, 2008, 2020);
console.log(friends[0]);
console.log(friends.length);
console.log(friends[friends.length - 1]);
/*Althoug declared as constant, the values of an array can be reassigned. But you can't replace the whole array
if it was declared as constant
friends = ['Bob', 'Alice'] --NOT ALLOWED--*/
friends[2] = 'Jay';
console.log(friends);

const firstName = 'Jonas';
const jonas = [firstName, 'Schmedtmann', 2037 - 1991, 'teacher', friends];
console.log(jonas);
console.log(jonas.length);

const years = [1990, 1967, 2002, 2010, 2018];
const newAge = calcAge1(years[0]);
console.log(newAge);

//ADD ELEMENTS
//push(), add elements to the end of an array. It returns the array length
const newLength = friends.push('Mike');
console.log(friends);
console.log(newLength);
//unshift(), add elementes to the beginning of an array. It also returns the array length
friends.unshift('John');
console.log(friends);

//REMOVE ELEMENTS
//pop(), remove last element of an array. It returns the removed element
const popped = friends.pop();
console.log(friends);
console.log(popped);
//shift(), remove first element of an array. It also returns the removed element
friends.shift();
console.log(friends);

//ELEMENT AT POSITION
//indexOf(x), returns the element at the position x, or -1 if it doesn't exists
console.log(friends.indexOf('Steven'));
console.log(friends.indexOf('Bob'));
//includes, returns true if the element is in the array, false if it's not
//Strict equality, the elements searched must match the value and the type
console.log(friends.includes('Steven'));
console.log(friends.includes('Bob'));

/*OBJECTS*/
//Object literal syntax
const newJonas = {
  firstName: 'Jonas',
  lastName: 'Schmedtmann',
  birthYear: 1991,
  job: 'teacher',
  friends: ['Michael', 'Peter', 'Steven'],
  hasDriversLicense: true,
  //This is an object method (a function within an object)
  /*   calcAge: function (birthYear) {
    return 2037 - birthYear;
  }, */
  calcAge: function () {
    return 2037 - this.birthYear;
  },
};

//Access to object propierties
//Dot notation (like Java)
console.log(newJonas.lastName);
//Brackets notation (property as string). It can be a literal or an expression
console.log(newJonas['lastName']);
const nameKey = 'Name';
console.log(newJonas['first' + nameKey]);
//It's possible to add elements to the objecto with both notations
newJonas.location = 'Portugal';
newJonas['twitter'] = '@jonasschmedtman';
console.log(newJonas);

console.log(
  `${newJonas.firstName} has ${newJonas.friends.length} friends, and his best friend is called ${newJonas.friends[0]}`
);
/* console.log(newJonas.calcAge(1991));
//the same as
console.log(newJonas['calcAge'](1991)); */
console.log(newJonas.calcAge());
//the same as
console.log(newJonas['calcAge']());

//Object with computed property. The method calcAge declares the age property and calculates it.
//Everytime the method is called, it returns the property without having to do the calculation over and over
const newObject = {
  firstName: 'John',
  lastName: 'Smith',
  birthYear: 1991,
  job: 'teacher',
  hasDriversLicense: false,

  calcAge: function () {
    this.age = 2037 - this.birthYear;
    return this.age;
  },
  getSummary: function () {
    return `${this.firstName} is a ${this.calcAge()}-year old ${this.job}, and he has ${
      this.hasDriversLicense ? 'a' : 'no '
    }driver's license`;
  },
};
console.log(
  `${newObject.firstName} is a ${newObject.calcAge()}-year old ${newObject.job}, and he has ` +
    (newObject.hasDriversLicense ? `a ` : `no `) +
    "driver's license"
);
console.log(newObject.getSummary());

//LOOPS
//Normal ones, identical to Java
for (let i = 1; i <= 10; i++) {
  console.log('Lifting weights repetition ' + i + ' 🏋️‍♂️');
}

/* const jonas = [firstName, 'Schmedtmann', 2037 - 1991, 'teacher', friends]; */
const types = [];
jonas[5] = true;
for (let i = 0; i < jonas.length; i++) {
  console.log(jonas[i], typeof jonas[i]);
  /* types[i] = typeof jonas[i]; */
  types.push(typeof jonas[i]);
}
console.log(types);

//WHILE
let dice = Math.trunc(Math.random() * 7); //Random number between 0 and less than 7, without the decimal part
while (dice !== 6) {
  console.log(`You rolled a ${dice}`);
  dice = Math.trunc(Math.random() * 7);
}
console.log(dice);
