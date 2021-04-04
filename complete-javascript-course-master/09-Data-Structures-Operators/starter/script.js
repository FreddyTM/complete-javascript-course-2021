'use strict';

// Data needed for a later exercise
const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30';

// Data needed for first part of the section
const restaurant = {
  name: 'Classico Italiano',
  location: 'Via Angelo Tavanti 23, Firenze, Italy',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],

  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },

  //Object destructuring inside a function that gets an object as a parameter
  //We can also set default values to some or all parameters
  orderDelivery: function ({
    starterIndex = 1,
    mainIndex = 0,
    time = '20:00',
    address,
  }) {
    console.log(
      `Order received! ${this.starterMenu[starterIndex]} and ${this.mainMenu[mainIndex]} will be delivered to ${address} at ${time}`
    );
  },

  orderPasta: function (ing1, ing2, ing3) {
    console.log(
      `Here's your delicious pasta with ${ing1}, ${ing2} and ${ing3}`
    );
  },

  orderPizza(mainIngredient, ...otherIngredients) {
    console.log(mainIngredient);
    console.log(otherIngredients);
  },

  openingHours: {
    thu: {
      open: 12,
      close: 22,
    },
    fri: {
      open: 11,
      close: 23,
    },
    sat: {
      open: 0, // Open 24 hours
      close: 24,
    },
  },
};

//DESTRUCTURING ARRAYS////////////////////////////////////////////////////

//Basic destructuring
const arr = [2, 3, 4];
const [x, y, z] = arr;
console.log(x, y, z);

let [main, secondary] = restaurant.categories;
console.log(main, secondary);

//Invert values
[main, secondary] = [secondary, main];
console.log(main, secondary);

//Destructuring from a function returning an array
const [starter, mainCourse] = restaurant.order(2, 0);
console.log(starter, mainCourse);

//Nested destructuring
const nested = [2, 4, [5, 6]];
const [i, , [j, k]] = nested;
console.log(i, j, k);

//Default values
const [p = 1, q = 1, r = 1] = [8, 9]; //r = 1 because there's no value for it in the array
console.log(p, q, r);

//DESTRUCTURING OBJECTS////////////////////////////////////////////////////

//Getting object properties by their names
const { name, openingHours, categories } = restaurant;
console.log(name, openingHours, categories);

//Renaming the properties
const {
  name: restaurantName,
  openingHours: hours,
  categories: tags,
} = restaurant;
console.log(restaurantName, hours, tags);

//Default values if a property doesn't exist
const { menu = [], starterMenu: starters = [] } = restaurant;
console.log(menu, starters);

//Mutating values
let a = 111;
let b = 999;
const obj = { a: 23, b: 7, c: 14 };
//Cannot use let or const to mutate a & b values, cannot use curly braces directly either
//We need to wrap the expression in parenthesis
({ a, b } = obj);
console.log(a, b);

//Nested objects
const {
  fri: { open, close },
} = openingHours;
console.log(open, close);
//Nested objects + renaming variables
const {
  fri: { open: o, close: c },
} = openingHours;
console.log(o, c);

//Object as a parameter of a function
restaurant.orderDelivery({
  time: '22:30',
  address: 'Via del Sole, 21',
  mainIndex: 2,
  starterIndex: 2,
});
//Missing properties will get the default values set in the function
restaurant.orderDelivery({
  address: 'Via del Sole, 21',
  starterIndex: 1,
});

//THE SPREAD OPERATOR////////////////////////////////////////////////////
//Expand array bad method
const oneArr = [7, 8, 9];
const badNewArr = [1, 2, oneArr[0], oneArr[1], oneArr[2]];
console.log(badNewArr);
//Expanding an array with spread operator
const newArr = [1, 2, ...oneArr];
console.log(newArr); //Same result as badNewArr

//Getting the array values instead of the array as a hole with spread operator
console.log(...newArr); //1 2 7 8 9 instead of [1, 2, 7, 8, 9]

//Adding new elements to an array with spread operator
const newMenu = [...restaurant.mainMenu, 'Gnocci'];
console.log(newMenu);

//Copy array
//const mainMenuCopy = [restaurant.mainMenu] would assign a reference of restaurant.mainMenu, it won't be a copy
const mainMenuCopy = [...restaurant.mainMenu]; //now is an independent copy

//Join 2 arrays
const brandNewMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];
console.log(brandNewMenu);

//SPREAD OPERATOR WORKS IN ALL ITERABLES, NOT ONLY IN ARRAYS
//Arrays, strings, maps, sets
const str = 'Jonas';
const letters = [...str, '', 'S.'];
//Each character of the string will be an element of the array, plus the other elements at the end
console.log(letters); // ["J", "o", "n", "a", "s", "", "S."]

//Using spread operator with an array to parse function parameters
/* const ingredients = [
  prompt("Let's make pasta! Ingredient 1"),
  prompt('Ingredient 2'),
  prompt('Ingredient3'),
];
console.log(ingredients);
restaurant.orderPasta(...ingredients); */

//SPREAD OPERATOR ALSO WORKS IN OBJECTS
//We can add all of the properties and methods of an object to another object
const newRestaurant = { foundedIn: 1998, ...restaurant, founder: 'Giuseppe' };
console.log(newRestaurant);
//Shallow copy of an object. Inner objects will remain references of the same objects
const restaurantCopy = { ...restaurant };
restaurantCopy.name = 'Ristorante Roma';
console.log(restaurant.name);
console.log(restaurantCopy.name);
restaurantCopy.starterMenu = [];
console.log(restaurant.starterMenu);
console.log(restaurantCopy.starterMenu);

//THE REST PATTERN////////////////////////////////////////////////////
//Used to packing elements into an array

//Whereas SPREAD operator adds elements to an existing array or object (because on the right side of =)
const arr3 = [1, 2, ...[3, 4]];
console.log(arr3); //[1, 2, 3, 4]

//REST works on the left side of = to create a new array. It must be the last element to collect all the remaining elements
const [aa, bb, ...others] = [1, 2, 3, 4, 5];
console.log(aa, bb, others); //1 2 (3) [3, 4, 5]. others = [3, 4, 5], a new array

//REST also works in objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat, weekdays); //{open: 0, close: 24} {thu: {…}, fri: {…}}

// 2) Functions
const add = function (...numbers) {
  //REST: All parameters will be packed into an array
  let sum = 0;
  for (let i = 0; i < numbers.length; i++) sum += numbers[i];
  console.log(sum);
};

add(2, 3);
add(5, 3, 7, 2);
add(8, 2, 5, 3, 2, 1, 4);

const xx = [23, 5, 7];
add(...xx); //SPREAD: array values will be extracted from the array and passed to the function as individual values
console.log(...xx); //23 5 7

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach'); //mushrooms (3) ["onion", "olives", "spinach"] (1 variable + 1 array)
restaurant.orderPizza('mushrooms'); //mushrooms [] (1 variable + 1 empty array)

//SHORT-CIRCUITING WITH && ||
//Evaluation of expressions that are not boolean, considering truthy and falsy values into the expressions

//OR operator
console.log(3 || 'Jonas'); // 3, because is trutty (the second value is not evaluated)
console.log('' || 'Jonas'); // Jonas, because '' is a falsy value
console.log(true || 0); // true
console.log(undefined || null); // null, if all values are falsy, then the last value is returned
console.log(undefined || 0 || '' || 'Hello' || 23 || null); // Hello, the first truthy value

/* restaurant.numGuests = 23; */
const guests1 = restaurant.numGuests ? restaurant.numGuests : 10;
console.log(guests1); //10, because restaurant.numGuests doesn't exists

//An alternative to the ternary operator
//CAUTION. If restaurant.numGuests = 0 (a falsy value), then restaurant.numGuests will be evaluated as FALSE
const guests2 = restaurant.numGuests || 10;
console.log(guests2); //The same result

//AND operator
console.log(0 && 'Jonas'); //0, if a value is a falsy value, it returns it without evaluating the rest
console.log(7 && 'Jonas'); //Jonas, if the expression is true, it returns the last value
console.log('Hello' && 23 && null && 'jonas'); //null, the first falsy value

// Practical example
if (restaurant.orderPizza) {
  restaurant.orderPizza('mushrooms', 'spinach');
}
//An alternative to the if statement
restaurant.orderPizza && restaurant.orderPizza('mushrooms', 'spinach');

//NULLISH COALESCING OPERATOR ?? (works with nullish values: null & undefined)
//Short-circuiting with || give us a wrong result, because 0 is the actual value of restaurant.numGuests, but also a falsy value
restaurant.numGuests = 0;
const guests = restaurant.numGuests || 10;
console.log(guests); // 10, incorrect

//Problem solved with nullish coalescing operator
const guestCorrect = restaurant.numGuests ?? 10;
console.log(guestCorrect); // 0, correct

//LOOPING ARRAYS ///////////////////////////////////////////////////
const myMenu = [...restaurant.starterMenu, ...restaurant.mainMenu];

// The for-of Loop
for (const item of myMenu) console.log(item); //List of all items
// The for-of Loop with index
for (const item of myMenu.entries()) console.log(item);
//List of arrays with index & items
//(2) [0, "Focaccia"]
//(2) [1, "Bruschetta"]
//(2) [2, "Garlic Bread"]
//(2) [3, "Caprese Salad"]
//(2) [4, "Pizza"]
//(2) [5, "Pasta"]
//(2) [6, "Risotto"]

//Example using item array values
for (const item of myMenu.entries()) {
  console.log(`${item[0] + 1}: ${item[1]}`);
}
//Example destructuring item array
for (const [i, el] of myMenu.entries()) {
  console.log(`${i + 1}: ${el}`);
}
//1: Focaccia
//2: Bruschetta
//3: Garlic Bread
//4: Caprese Salad
//5: Pizza
//6: Pasta
//7: Risotto

//ENHANCED OBJECT LITERALS ///////////////////////////////////////////////////
const days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
const drinks = {
  softDrinks: ['Coca-cola', 'water', 'orange juice'],
  alcohol: ['beer', 'wine', 'vermout', 'whisky', 'rum'],
};

const bigRestaurant = {
  name: 'My big restaurant',
  location: 'My hometown',
  categories: ['Italian', 'Pizzeria', 'Vegetarian', 'Organic'],
  starterMenu: ['Focaccia', 'Bruschetta', 'Garlic Bread', 'Caprese Salad'],
  mainMenu: ['Pizza', 'Pasta', 'Risotto'],
  //Before ES6, to put an external object into an object we needed a refeence and a value of the same type
  //drinks: drinks,
  //With ES6 enhanced object literals, we only need the object name
  drinks,

  //Before ES6, functions inside objects must be declared with function keyword
  order: function (starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
  //With ES6 enhanced object literals, we can get rid of function keyword
  newOrder(starterIndex, mainIndex) {
    return [this.starterMenu[starterIndex], this.mainMenu[mainIndex]];
  },
};

console.log(bigRestaurant);
