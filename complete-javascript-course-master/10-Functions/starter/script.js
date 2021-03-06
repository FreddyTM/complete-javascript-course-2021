'use strict';

///////////////////////////////////////
// Default Parameters
const bookings = [];

const createBooking = function (
  flightNum,
  numPassengers = 1,
  price = 199 * numPassengers
) {
  // ES5
  // numPassengers = numPassengers || 1;
  // price = price || 199;

  const booking = {
    flightNum,
    numPassengers,
    price,
  };
  console.log(booking);
  bookings.push(booking);
};

createBooking('LH123');
createBooking('LH123', 2, 800);
createBooking('LH123', 2);
createBooking('LH123', 5);

createBooking('LH123', undefined, 1000);

///////////////////////////////////////
// How Passing Arguments Works: Values vs. Reference
const flight = 'LH234';
const jonas = {
  name: 'Jonas Schmedtmann',
  passport: 24739479284,
};

const checkIn = function (flightNum, passenger) {
  flightNum = 'LH999';
  passenger.name = 'Mr. ' + passenger.name;

  if (passenger.passport === 24739479284) {
    alert('Checked in');
  } else {
    alert('Wrong passport!');
  }
};

/* checkIn(flight, jonas); */
console.log(flight);
console.log(jonas);

// Is the same as doing...
// const flightNum = flight;
// const passenger = jonas;

const newPassport = function (person) {
  person.passport = Math.trunc(Math.random() * 100000000000);
};

newPassport(jonas);
/* checkIn(flight, jonas); */

///////////////////////////////////////
// Functions Accepting Callback Functions
const oneWord = function (str) {
  return str.replace(/ /g, '').toLowerCase();
};

const upperFirstWord = function (str) {
  const [first, ...others] = str.split(' ');
  return [first.toUpperCase(), ...others].join(' ');
};

// Higher-order function
const transformer = function (str, fn) {
  console.log(`Original string: ${str}`);
  console.log(`Transformed string: ${fn(str)}`);

  console.log(`Transformed by: ${fn.name}`);
};

transformer('JavaScript is the best!', upperFirstWord);
transformer('JavaScript is the best!', oneWord);

// JS uses callbacks all the time
const high5 = function () {
  console.log('👋');
};
document.body.addEventListener('click', high5);
['Jonas', 'Martha', 'Adam'].forEach(high5);

///////////////////////////////////////
// Functions Returning Functions
const greet = function (greeting) {
  return function (name) {
    console.log(`${greeting} ${name}`);
  };
};

const greeterHey = greet('Hey');
greeterHey('Jonas');
greeterHey('Steven');

greet('Hello')('Jonas');

// Challenge
const greetArr = greeting => name => console.log(`${greeting} ${name}`);

greetArr('Hi')('Jonas');

///////////////////////////////////////
// The call and apply Methods
const lufthansa = {
  airline: 'Lufthansa',
  iataCode: 'LH',
  bookings: [],
  // book: function() {}
  book(flightNum, name) {
    console.log(
      `${name} booked a seat on ${this.airline} flight ${this.iataCode}${flightNum}`
    );
    this.bookings.push({ flight: `${this.iataCode}${flightNum}`, name });
  },
};

lufthansa.book(239, 'Jonas Schmedtmann');
lufthansa.book(635, 'John Smith');

const eurowings = {
  airline: 'Eurowings',
  iataCode: 'EW',
  bookings: [],
};

const book = lufthansa.book;

// Does NOT work
// book(23, 'Sarah Williams');

// Call method - Calls a method of an object, substituting another object for the current object.
book.call(eurowings, 23, 'Sarah Williams');
console.log(eurowings);

book.call(lufthansa, 239, 'Mary Cooper');
console.log(lufthansa);

const swiss = {
  airline: 'Swiss Air Lines',
  iataCode: 'LX',
  bookings: [],
};

book.call(swiss, 583, 'Mary Cooper');

// Apply method - the same as call() but the arguments must be inside an array
const flightData = [583, 'George Cooper'];
book.apply(swiss, flightData);
console.log(swiss);
//so we can still use call() with an array if we just deconstruct it as we pass it to the function
book.call(swiss, ...flightData);

// The bind Method
//For a given function, creates a bound function that has the same body as the original function. The this object of the bound function is associated with the specified object, and has the specified initial parameters.

// book.call(eurowings, 23, 'Sarah Williams');

const bookEW = book.bind(eurowings); //We can bind the object to the function
const bookLH = book.bind(lufthansa);
const bookLX = book.bind(swiss);

bookEW(23, 'Steven Williams');

//Partial application. Some of the arguments of the function are already applied
const bookEW23 = book.bind(eurowings, 23); //We can bind the object and some arguments as well
bookEW23('Jonas Schmedtmann');
bookEW23('Martha Cooper');

// With Event Listeners
lufthansa.planes = 300;
lufthansa.buyPlane = function () {
  console.log(this);

  this.planes++;
  console.log(this.planes);
};
// lufthansa.buyPlane();

//Here inside the listener we need to bind buyPlane() to the lufthansa object, because the caller of the function is not that object.
//Instead, is the element selected by the querySelector() method
document
  .querySelector('.buy')
  .addEventListener('click', lufthansa.buyPlane.bind(lufthansa));

// Partial application
const addTax = (rate, value) => value + value * rate;
console.log(addTax(0.1, 200));

//We can also bind arguments to the function without binding to an object. The object will be null
//Always respect the arguments order
const addVAT = addTax.bind(null, 0.23);
// addVAT = value => value + value * 0.23;

console.log(addVAT(100));
console.log(addVAT(23));

//Binding arguments is not the same as giving default parameters to the arguments of the function, because it implies the creation of a new
//function, not just setting the presets of the original one

const addTaxRate = function (rate) {
  return function (value) {
    return value + value * rate;
  };
};
const addVAT2 = addTaxRate(0.23);
console.log(addVAT2(100));
console.log(addVAT2(23));

///////////////////////////////////////
// Immediately Invoked Function Expressions (IIFE)
//Functions executed once, and then dissapear
const runOnce = function () {
  console.log('This will never run again');
};
runOnce();

// IIFE
//anonymous function wrapped in parentheses, with the final () to be executed immediately
(function () {
  console.log('This will never run again');
  const isPrivate = 23;
})();

// console.log(isPrivate);

//We can use arrow functions as well
(() => console.log('This will ALSO never run again'))();

{
  const isPrivate = 23;
  var notPrivate = 46;
}
// console.log(isPrivate);
console.log(notPrivate);

///////////////////////////////////////
// Closures
//A FUNCTION HAS ACCESS TO THE VARIABLE ENVIRONMENT OF THE EXECUTION CONTEXT IN WHICH IT WAS CREATED,
//EVEN THIS EXECUTION CONTEXT NO LONGER INCLUDES THAT FUNCTION IN THE CALL STACK

//THE CLOSURE IS THE VARIABLE ENVIRONMENT ATTACHED TO THE FUNCTION, SO THE SCOPE CHAIN IS PRESERVED
//THE CLOSURE GIVES A FUNCTION ACCESS TO ALL THE VARIABLES OF ITS OUTER SCOPE, WHICH PRESERVES THE SCOPE CHAIN
//THROUGHOUT TIME

//A CLOSURE MAKES SURE THAT A FUNCTION DOESN'T LOSE CONNECTION TO VARIABLES THAT EXISTED AT THE FUNCTION'S BIRTH PLACE
const secureBooking = function () {
  let passengerCount = 0;

  return function () {
    passengerCount++;
    console.log(`${passengerCount} passengers`);
  };
};

const booker = secureBooking();

booker();
booker();
booker();

console.dir(booker);

///////////////////////////////////////
// More Closure Examples
// Example 1
let f;

const g = function () {
  const a = 23;
  f = function () {
    console.log(a * 2);
  };
};

const h = function () {
  const b = 777;
  f = function () {
    console.log(b * 2);
  };
};

g();
f(); //46
console.dir(f);

// Re-assigning f function
h();
f(); //1554
console.dir(f);

// Example 2
const boardPassengers = function (n, wait) {
  const perGroup = n / 3;

  setTimeout(function () {
    console.log(`We are now boarding all ${n} passengers`);
    console.log(`There are 3 groups, each with ${perGroup} passengers`);
  }, wait * 1000);

  console.log(`Will start boarding in ${wait} seconds`);
};

const perGroup = 1000;
//setTimeout() will still use the perGroup constant inside of boardPassengers. Closures have precedence over global scope
boardPassengers(180, 3); //There are 3 groups, each with 60 passengers (not 1000 passengers)
