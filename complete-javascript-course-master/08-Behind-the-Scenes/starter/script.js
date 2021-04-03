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
