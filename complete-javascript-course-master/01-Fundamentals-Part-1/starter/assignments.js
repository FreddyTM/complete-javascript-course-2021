console.log("START OF ASSIGNMENTS.JS");

//SECTION 1

//Lecture 11
let country = "Catalonia";
const continent = "Europe";
let population = 7.5;
console.log("Country: " + country);
console.log("Continent: " + continent);
console.log("Population: " + population + " people");

//Lecture 12
let isIsland = false;
let language;
console.log(typeof isIsland);
console.log(typeof population);
console.log(typeof country);
console.log(typeof language);

//Lecture 13
language = "catalan";
console.log(language);

//Lecture 14
console.log(population / 2);
console.log(population + 1);
finlandPopulation = 6;
console.log("Població de Catalunya > població de Finlàndia? " + (population > finlandPopulation));
let countryAveragePopulation = 33;
console.log("Població de Catalunya < població promitg? " + (population < countryAveragePopulation));
let description = "Portugal is in Europe, and its 11 million people speak portuguese";
console.log(description);

//Lecture 17
country = "Portugal";
language = "portuguese";
population = 11;
description = `${country} is in ${continent}, and its ${population} million people speak ${language}`;
console.log(description);

//Lecture 18
if (population > countryAveragePopulation) {
  console.log(`${country} population is above average`);
} else {
  console.log(`${country}'s population is ${countryAveragePopulation - population} million people below average`);
}

console.log(`END OF ASSIGNMENTS.JS
-----------------------------`);
