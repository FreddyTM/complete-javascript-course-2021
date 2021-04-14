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

///////////////////////////////////////
// ES6 Classes

// Class expression
// const PersonCl = class {}

// Class declaration
class PersonCl {
  //The constructor method NEEDS to be named 'constructor'
  constructor(fullName, birthYear) {
    this.fullName = fullName;
    this.birthYear = birthYear;
  }
  // Instance methods
  // Methods will be added to .prototype property
  calcAge() {
    console.log(2037 - this.birthYear);
  }

  greet() {
    console.log(`Hey ${this.fullName}`);
  }

  // Setters and Getters with objects that are defined in classes
  //We use the keywords set & get to create setters & getters
  //But we don't call setter & getter functions as functions (with ()), we do it just like attributes
  //Althoug setters & getters are methods, they're treated as attributes inside the object & prototype
  /*   PersonCl {fullName: "Jessica Davis", birthYear: 1996}
    birthYear: 1996
    fullName: "Jessica Davis"
    age: (...)
    __proto__:
      age: (...)
      calcAge: ƒ calcAge()
      constructor: class PersonCl
      greet: ƒ greet()
      get age: ƒ age()
      __proto__: Object */
  get age() {
    return 2037 - this.birthYear;
  }

  // Set a property that already exists
  //To avoid a conflict, by convention the property name starts by underscore, so fullName becomes _fullName
  set fullName(name) {
    if (name.includes(' ')) this._fullName = name;
    else alert(`${name} is not a full name!`);
  }

  get fullName() {
    return this._fullName;
  }

  // Static method
  static hey() {
    console.log('Hey there 👋');
    console.log(this);
  }
}

const jessica = new PersonCl('Jessica Davis', 1996);
console.log(jessica);
jessica.calcAge();
console.log(jessica.age);

console.log(jessica.__proto__ === PersonCl.prototype);

// PersonCl.prototype.greet = function () {
//   console.log(`Hey ${this.firstName}`);
// };
jessica.greet();

/* const walter = new PersonCl('Walter', 1965); //Walter is not a full name. set fullName() checks for that*/
/* walter.greet(); //Hey undefined */
const walter2 = new PersonCl('Walter White', 1965);
walter2.greet(); //Hey Walter White

PersonCl.hey();

// 1. Classes are NOT hoisted
// 2. Classes are first-class citizens
// 3. Classes are executed in strict mode

///////////////////////////////////////
// Setters and Getters with objects that are not defined in classes
const account = {
  owner: 'Jonas',
  movements: [200, 530, 120, 300],

  //We use the keywords set & get to create setters & getters
  get latest() {
    return this.movements.slice(-1).pop();
  },

  set latest(mov) {
    this.movements.push(mov);
  },
};

//But we don't call setter & getter functions as functions (with ()), we do it just like attributes
console.log(account.latest); //To get latest

account.latest = 50; //To set latest
console.log(account.movements);

///////////////////////////////////////
// Object.create
//First we create the prototype object, and then we create a new object and assign it the prototype object
const PersonProto = {
  calcAge() {
    console.log(2037 - this.birthYear);
  },

  init(firstName, birthYear) {
    this.firstName = firstName;
    this.birthYear = birthYear;
  },
};

const steven = Object.create(PersonProto);
console.log(steven);
steven.name = 'Steven';
steven.birthYear = 2002;
steven.calcAge();

console.log(steven.__proto__ === PersonProto);

const sarah = Object.create(PersonProto);
sarah.init('Sarah', 1979);
sarah.calcAge();

//////////////////////////////////////
// Inheritance Between "Classes": Constructor Functions

/* const Person = function (firstName, birthYear) {
  this.firstName = firstName;
  this.birthYear = birthYear;
};

Person.prototype.calcAge = function () {
  console.log(2037 - this.birthYear);
}; */

const Student = function (firstName, birthYear, course) {
  Person.call(this, firstName, birthYear);
  this.course = course;
};

// Linking prototypes
Student.prototype = Object.create(Person.prototype);

Student.prototype.introduce = function () {
  console.log(`My name is ${this.firstName} and I study ${this.course}`);
};

const michael = new Student('Michael', 2020, 'Computer Science');
michael.introduce();

console.log(michael.__proto__);
console.log(michael.__proto__.__proto__);

console.log(michael instanceof Student);
console.log(michael instanceof Person);
console.log(michael instanceof Object);

Student.prototype.constructor = Student;
console.dir(Student.prototype.constructor);
