//SECTION 2. JAVASCRIPT FUNDAMENTALS PART 1

console.log("START OF CHALLENGES.JS");

//Coding Challenge 1

let markMass = 78;
let markHeight = 1.69;
let johnMass = 92;
let johnHeight = 1.95;

let markBMI = markMass / markHeight ** 2;
let johnBMI = johnMass / johnHeight ** 2;
let markHigherBMI = markBMI > johnBMI;

console.log(markBMI);
console.log(johnBMI);
console.log(markHigherBMI);

//Coding challenge 2
if (markHigherBMI) {
  console.log(`Mark's BMI ${markBMI} is higher than John's BMI ${johnBMI}`);
} else {
  console.log(`John's BMI ${johnBMI} is higher than Mark's BMI ${markBMI}`);
}

console.log(`END OF CHALLENGES.JS
-----------------------------`);
