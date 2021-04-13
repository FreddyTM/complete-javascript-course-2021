'use strict';

///////////////////////////////////////
// Constructor Functions and the new Operator
const Person = function (firstName, birthYear) {
  // Instance properties
  this.firstName = firstName;
  this.birthYear = birthYear;

  //Never create functions inside a constructor function
  // Never to this!
  // this.calcAge = function () {
  //   console.log(2037 - this.birthYear);
  // };
};

const jonas = new Person('Jonas', 1991);
console.log(jonas);

// 1. New {} is created
// 2. function is called, this = {}
// 3. {} linked to prototype
// 4. function automatically return {}

const matilda = new Person('Matilda', 2017);
const jack = new Person('Jack', 1975);
const mike = { firstName: 'Mike', birthYear: 1980 };

console.log(jonas instanceof Person); //True
console.log(mike instanceof Person); //False. Object not created throug new Object() statement

///////////////////////////////////////
// Prototypes
console.log(Person.prototype);

//Adding a function to the prototype linked to Person objects
//So the function is not in the object, but in the object prototype associated to the object
//And the object can use the function as if it was part of it
Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
};

jonas.calcAge();
matilda.calcAge();
//Person_instance.__proto__ = Person.prototype
console.log(jonas.__proto__);
console.log(jonas.__proto__ === Person.prototype); // True

console.log(Person.prototype.isPrototypeOf(jonas));
console.log(Person.prototype.isPrototypeOf(matilda));
//Person.prototype is the prototype of the linked objects of Person, but not the prototype of Person itself
console.log(Person.prototype.isPrototypeOf(Person));

//Adding a property to the prototype linked to Person objects
//So the property is not in the object, but in the object prototype associated to the object
//And the object can use the property as if it was part of it
Person.prototype.species = 'Homo Sapiens';
console.log(jonas.species, matilda.species);

console.log(jonas.hasOwnProperty('firstName'));
console.log(jonas.hasOwnProperty('species'));

/* jonas
Person {firstName: "Jonas", birthYear: 1991}
  birthYear: 1991 -> part of the object
  firstName: "Jonas" -> part of the object
  __proto__:
    calcAge: ƒ () -> part of the prototype
    species: "Homo Sapiens" -> part of the prototype 
    constructor: ƒ (firstName, birthYear) -> part of the prototype
    __proto__: Object */

///////////////////////////////////////
// Prototypal Inheritance on Built-In Objects
console.log(jonas.__proto__);
// Object.prototype (top of prototype chain)
console.log(jonas.__proto__.__proto__);
console.log(jonas.__proto__.__proto__.__proto__);

console.dir(Person.prototype.constructor);

const arr = [3, 6, 6, 5, 6, 9, 9]; // new Array === []
console.log(arr.__proto__);
console.log(arr.__proto__ === Array.prototype);

console.log(arr.__proto__.__proto__);

//Just an example. DON'T add funtcionts to the prototype of built-in objects like Array
Array.prototype.unique = function () {
  return [...new Set(this)];
};

console.log(arr.unique());

const h1 = document.querySelector('h1');
console.dir(x => x + 1);
