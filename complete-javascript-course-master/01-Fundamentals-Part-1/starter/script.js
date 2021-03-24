/* let js = "amazing";
console.log(40 + 8 + 23 - 10);
console.log("Jonas");
console.log(23);
let firstName = "Jonas";
console.log(firstName); */

console.log("START OF SCRIPT.JS");

const firstName = "Jonas";
const job = "teacher";
const birthDay = "1991";
let year = 2037;

const jonas = "I'm " + firstName + ", a " + (year - birthDay) + " years old " + job + "!";
console.log(jonas);

//Backticks ``````````````````````````````````````````````````````````````````````````````````
//
const jonasNew = `I'm ${firstName}, a ${year - birthDay} years old ${job}!`;
console.log(jonasNew);

//Multi-line strings
console.log("String with \n multiple \n lines");
//Multi-line strings with template literals (backticks again...)
console.log(`String
with
multiple
lines`);

const age = 15;
const isOldEnough = age >= 18;
if (isOldEnough) {
  console.log("Sarah can start driving license");
} else {
  const yearsLeft = 18 - age;
  console.log(`Sara is too young. Wait another ${yearsLeft} years :)`);
}

let century;
const birthYear = 1991;
if (birthYear <= 2000) {
  century = 20;
} else {
  century = 21;
}
console.log(century);

//Type conversion (done by user)
let inputYear = "1991";
console.log(Number(inputYear), inputYear);
console.log(inputYear + 18);
inputYear = Number(inputYear);
console.log(inputYear + 18);

//Type coercion (done by compiler)
//The + sign converts numbers to strings
console.log("I am " + 23 + " years old");
//The -, /, * and < , < signs converts strings to numbers
console.log("23" - "10" - 3);
console.log("23" * 2);
console.log("23" / 2);
console.log("23" > "18");

let n = "1" + 1;
n = n - 1;
console.log(n);

//FALSY VALUES (will be false when converted to boolean):
// 0, ''(empty string), undefined, null, NaN

//TRUTHY VALUES: the rest, included objects

//false
console.log(Boolean(0));
//true
console.log(Boolean({}));

//EQUALITY

//Strict equality (value & type)
//true
console.log(18 === 18);
//false
console.log("18" === 18);

//Loose equality (only value - type coercion if they don't match)
//both true
console.log(18 == 18);
console.log("18" == 18);

console.log(`END OF SCRIPT.JS
-----------------------------`);
