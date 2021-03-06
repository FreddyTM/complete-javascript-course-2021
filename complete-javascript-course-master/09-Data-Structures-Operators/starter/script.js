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
console.log(letters); //??["J", "o", "n", "a", "s", "", "S."]

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
console.log(aa, bb, others); //1 2 (3)??[3, 4, 5]. others = [3, 4, 5], a new array

//REST also works in objects
const { sat, ...weekdays } = restaurant.openingHours;
console.log(sat, weekdays); //{open: 0, close: 24} {thu: {???}, fri: {???}}

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

restaurant.orderPizza('mushrooms', 'onion', 'olives', 'spinach'); //mushrooms (3)??["onion", "olives", "spinach"] (1 variable + 1 array)
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
//(2)??[0, "Focaccia"]
//(2)??[1, "Bruschetta"]
//(2)??[2, "Garlic Bread"]
//(2)??[3, "Caprese Salad"]
//(2)??[4, "Pizza"]
//(2)??[5, "Pasta"]
//(2)??[6, "Risotto"]

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

//OPTIONAL CHAINING ///////////////////////////////////////////////////
//We don't know if a restaurant has an openingHours property, and if so, if it has a mon property, so we check
if (restaurant.openingHours && restaurant.openingHours.mon)
  console.log(restaurant.openingHours.mon.open);

//If we don't check, and restaurant.openingHours.mon doesn't exsists (so its undefined), we'll get an error trying to read the 'open' property
//console.log(restaurant.openingHours.mon.open); //Uncaught TypeError: Cannot read property 'open' of undefined

// WITH optional chaining, if some property of the chain doesn't exist, we'll get undefined, but not an error
console.log(restaurant.openingHours.mon?.open);
console.log(restaurant.openingHours?.mon?.open);

//Example with for-of Loop
for (const day of days) {
  const open = restaurant.openingHours[day]?.open ?? 'closed';
  console.log(`On ${day}, we open at ${open}`);
}

//Example with expression as a function argument
console.log(restaurant.order?.(0, 1) ?? 'Method does not exist');
console.log(restaurant.orderRisotto?.(0, 1) ?? 'Method does not exist');

//Example with arrays
const users = [{ name: 'Jonas', email: 'hello@jonas.io' }];
// const users = [];

console.log(users[0]?.name ?? 'User array empty');

if (users.length > 50) console.log(users[0].name);
else console.log('user array empty');

//LOOPING OBJECTS ///////////////////////////////////////////////////
// Property NAMES
const properties = Object.keys(openingHours);
console.log(properties);

let openStr = `We are open on ${properties.length} days: `;
for (const day of properties) {
  openStr += `${day}, `;
}
console.log(openStr);

// Property VALUES
const values = Object.values(openingHours);
console.log(values);

// Entire object
const entries = Object.entries(openingHours);
// console.log(entries);
console.log(entries);

// [key, value]
for (const [day, { open, close }] of entries) {
  console.log(`On ${day} we open at ${open} and close at ${close}`);
}

//SETS ///////////////////////////////////////////////////
//Sets are collections of unique values (NO DUPLICATES)
//We build a set out of an iterable, as an array
const ordersSet = new Set([
  'Pasta',
  'Pizza',
  'Pizza',
  'Risotto',
  'Pasta',
  'Pizza',
]);
//No duplicates, and no particular order of elements (NO INDEXES)
console.log(ordersSet); //Set(3)??{"Pasta", "Pizza", "Risotto"}
//A set build of a string will hold each character as an element
console.log(new Set('Jonas')); //Set(5)??{"J", "o", "n", "a", "s"}
console.log(ordersSet.size); //3
console.log(ordersSet.has('Pizza')); //true
console.log(ordersSet.has('Bread')); //false
ordersSet.add('Garlic Bread');
console.log(ordersSet); //Set(4)??{"Pasta", "Pizza", "Risotto", "Garlic Bread"}
ordersSet.delete('Risotto');
console.log(ordersSet); //Set(3)??{"Pasta", "Pizza", "Garlic Bread"}
/* ordersSet.clear(); */
console.log(ordersSet); //Set(0)??{}
ordersSet.add('chili bread');
console.log(ordersSet);
//Looping a set
for (const order of ordersSet) console.log(order);

// Example
const staff = ['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter'];
//Using a set and sread operator to create a new array with only the unique elements of staff
const staffUnique = [...new Set(staff)];
console.log(staffUnique);
//Find how many unique elements in an array. Transform to a set, and then .size
console.log(
  new Set(['Waiter', 'Chef', 'Waiter', 'Manager', 'Chef', 'Waiter']).size
);

console.log(new Set('jonasschmedtmann').size);

//WORKING WITH STRINGS ///////////////////////////////////////////////////
// Working With Strings - Part 1
const airline = 'TAP Air Portugal';
const plane = 'A320';

console.log(plane[0]); //A
console.log(plane[1]); //3
console.log(plane[2]); //2
console.log('B737'[0]); //B

console.log(airline.length); //16
console.log('B737'.length); //4

console.log(airline.indexOf('r')); //6
console.log(airline.lastIndexOf('r')); //10
console.log(airline.indexOf('portugal')); //Case sensitive, so -1 because is not found. 'Portugal' would be 8

console.log(airline.slice(4)); //Slice from 4th position, so 'Air Portugal'
console.log(airline.slice(4, 7)); //Slice from 4th position to 7th position, so 'Air'

console.log(airline.slice(0, airline.indexOf(' '))); //TAP
console.log(airline.slice(airline.lastIndexOf(' ') + 1)); //Portugal (+1 added to extract the space from the beginning)

//With negative indexes, we start counting from the end of the string
console.log(airline.slice(-2)); //al
console.log(airline.slice(1, -1)); //AP Air Portuga

const checkMiddleSeat = function (seat) {
  // B and E are middle seats
  const s = seat.slice(-1);
  if (s === 'B' || s === 'E') console.log('You got the middle seat ????');
  else console.log('You got lucky ????');
};

checkMiddleSeat('11B');
checkMiddleSeat('23C');
checkMiddleSeat('3E');

console.log(new String('jonas')); //When applying methods to strings (primitives), JavaScript converts the strings to String objects
console.log(typeof new String('jonas')); //type of object
console.log(typeof new String('jonas').slice(1)); //The result of the methods gets converted back to a string

// Working With Strings - Part 2

console.log(airline.toLowerCase());
console.log(airline.toUpperCase());

// Fix capitalization in name
const passenger = 'jOnAS';
const passengerLower = passenger.toLowerCase();
const passengerCorrect =
  passengerLower[0].toUpperCase() + passengerLower.slice(1);
console.log(passengerCorrect); // Jonas

// Comparing emails
const email = 'hello@jonas.io';
const loginEmail = '  Hello@Jonas.Io \n';

// const lowerEmail = loginEmail.toLowerCase();
// const trimmedEmail = lowerEmail.trim();

//trim() Removes the leading and trailing white space and line terminator characters from a string.
const normalizedEmail = loginEmail.toLowerCase().trim();
console.log(normalizedEmail);
console.log(email === normalizedEmail);

// replacing
const priceGB = '288,97??';
const priceUS = priceGB.replace('??', '$').replace(',', '.');
console.log(priceUS);

const announcement =
  'All passengers come to boarding door 23. Boarding door 23!';

//replace() only replaces the first occurrence
console.log(announcement.replace('door', 'gate'));
//replaceAll() replaces all occurences
console.log(announcement.replaceAll('door', 'gate'));
//Alternatively, we can use regular expressions
/* console.log(announcement.replace(/door/g, 'gate')); */

// Booleans
const secondPlane = 'Airbus A320neo';
console.log(secondPlane.includes('A320')); //true
console.log(secondPlane.includes('Boeing')); //false
console.log(secondPlane.startsWith('Airb')); //true

if (secondPlane.startsWith('Airbus') && secondPlane.endsWith('neo')) {
  console.log('Part of the NEW ARirbus family');
}

// Practice exercise
const checkBaggage = function (items) {
  const baggage = items.toLowerCase(); //toLowerCase() to avoid 'Knife' or 'GUN' not being checked

  if (baggage.includes('knife') || baggage.includes('gun')) {
    console.log('You are NOT allowed on board');
  } else {
    console.log('Welcome aboard!');
  }
};
checkBaggage('I have a laptop, some Food and a pocket Knife');
checkBaggage('Socks and camera');
checkBaggage('Got some snacks and a gun for protection');

// Working With Strings - Part 3

// Split and join
//split() takes a string into substrings using the specified separator and return them as an array.
//elements will be splitted by the character passed as argument
console.log('a+very+nice+string'.split('+')); //new array ["a", "very", "nice", "string"]
console.log('Jonas Schmedtmann'.split(' ')); //new array ??["Jonas", "Schmedtmann"]

const [firstName, lastName] = 'Jonas Schmedtmann'.split(' '); //Destructuring an array created by splitting a string

//join() takes an array of strings and join together all the elements into a new string
//elements will be separated in the string by the character passed as argument
const newName = ['Mr.', firstName, lastName.toUpperCase()].join(' ');
console.log(newName);

const capitalizeName = function (name) {
  const names = name.split(' ');
  const namesUpper = [];

  for (const n of names) {
    // namesUpper.push(n[0].toUpperCase() + n.slice(1));
    namesUpper.push(n.replace(n[0], n[0].toUpperCase()));
  }
  console.log(namesUpper.join(' '));
};

capitalizeName('jessica ann smith davis');
capitalizeName('jonas schmedtmann');

// Padding (addinig characters to a string until it has the desired length)
//padStart() from the beginning, padEnd() from the end
const message = 'Go to gate 23!';
console.log(message.padStart(20, '+').padEnd(30, '+'));
console.log('Jonas'.padStart(20, '+').padEnd(30, '+'));

const maskCreditCard = function (number) {
  //converting number to a string
  //const str = String(number);
  const str = number + ''; //alternative converting number to a string
  const last = str.slice(-4);
  return last.padStart(str.length, '*');
};

console.log(maskCreditCard(64637836));
console.log(maskCreditCard(43378463864647384));
console.log(maskCreditCard('334859493847755774747'));

// Repeat
const message2 = 'Bad waether... All Departues Delayed... ';
console.log(message2.repeat(5));

const planesInLine = function (n) {
  console.log(`There are ${n} planes in line ${'????'.repeat(n)}`);
};
planesInLine(5);
planesInLine(3);
planesInLine(12);

// String Methods Practice

/* const flights =
  '_Delayed_Departure;fao93766109;txl2133758440;11:25+_Arrival;bru0943384722;fao93766109;11:45+_Delayed_Arrival;hel7439299980;fao93766109;12:05+_Departure;fao93766109;lis2323639855;12:30'; */

// ???? Delayed Departure from FAO to TXL (11h25)
//              Arrival from BRU to FAO (11h45)
//   ???? Delayed Arrival from HEL to FAO (12h05)
//            Departure from FAO to LIS (12h30)

const getCode = str => str.slice(0, 3).toUpperCase();

for (const flight of flights.split('+')) {
  const [type, from, to, time] = flight.split(';');
  const output = `${type.startsWith('_Delayed') ? '????' : ''}${type.replaceAll(
    '_',
    ' '
  )} ${getCode(from)} ${getCode(to)} (${time.replace(':', 'h')})`.padStart(36);
  console.log(output);
}
