'use strict';

function calcAge(birthYear) {
  const age = 2037 - birthYear;

  function printAge() {
    let output = `${firstName}, you are ${age}, born in ${birthYear}`;
    console.log(output);
    if (birthYear >= 1981 && birthYear <= 1996) {
      var millenial = true;
      const str = `Oh, and you're a millenial, ${firstName}`;
      console.log(str);
      function add(a, b) {
        return a + b;
      }
    }
    console.log(millenial);
    /* console.log(add(2, 3)); ERROR, NOT DEFINED (ONLY IN STRICT MODE)*/
  }

  printAge();
  return age;
}

const firstName = 'Jonas';
calcAge(1991);

//Variable & constant hoisting
console.log(me); /* UNDEFINED BUT ACCESSIBLE BECAUSE OF HOISTING*/
/* console.log(job); CANNOT ACCESS BEFORE DECLARATION*/
/* console.log(year); CANNOT ACCESS BEFORE DECLARATION*/

var me = 'Jonas';
let job = 'teacher';
const year = 1991;

//Function hoisting
console.log(
  addDecl(2, 3)
); /*IT WORKS BECAUSE OF FUNCTION DECLARATION HOISTING, WE GET 5*/
/* console.log(addExpr(2, 3)); CANNOT ACCESS BEFORE DECLARATION*/
/* console.log(addArrow(2, 3)); CANNOT ACCESS BEFORE DECLARATION*/

//Function declaration
function addDecl(a, b) {
  return a + b;
}
//Function expression, works like a variable declaration
const addExpr = function (a, b) {
  return a + b;
};
//Arrow function
const addArrow = (a, b) => a + b;

//Example
if (!numProducts) deleteShoppingCart();
var numProducts = 10;

function deleteShoppingCart() {
  console.log('All products deleted!');
}

// The this Keyword in Practice
console.log(this);

const calcAge2 = function (birthYear) {
  console.log('calcAge2');
  console.log(2037 - birthYear);
  console.log(this);
};
calcAge2(
  1991
); /*this is undefined, but we can add a this context using function () {some code here}.bind(this)*/

const calcAgeArrow = birthYear => {
  console.log('calcArrow');
  console.log(2037 - birthYear);
  console.log(this);
};
calcAgeArrow(
  1980
); /*this is window object here, because arrow functions uses this from the code that contains the function*/

const jonas = {
  year: 1991,
  calcAge: function () {
    console.log(this);
    console.log(2037 - this.year);
  },
};
jonas.calcAge(); /*this is jonas object, not because the function is inside the jonas object, but because is the object calling the funcion*/

const matilda = {
  year: 2017,
};

matilda.calcAge = jonas.calcAge;
matilda.calcAge(); /*this is matilda object (the caller), even when the method calcAge was borrowed of jonas object*/

const f = jonas.calcAge;
f(); /*this is undefined, it's a regular function call, and we get an error because the jonas.calcAge needs the year parameter and it's missing in f() context*/
