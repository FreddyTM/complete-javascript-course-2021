'use strict';

///////////////////////////////////////
// Coding Challenge #1

/* 
In this challenge you will build a function 'whereAmI' which renders a country ONLY based on GPS coordinates. For that, you will use a second API to geocode coordinates.

Here are your tasks:

PART 1
1. Create a function 'whereAmI' which takes as inputs a latitude value (lat) and a longitude value (lng) (these are GPS coordinates, examples are below).
2. Do 'reverse geocoding' of the provided coordinates. Reverse geocoding means to convert coordinates to a meaningful location, like a city and country name. Use this API to do reverse geocoding: https://geocode.xyz/api.
The AJAX call will be done to a URL with this format: https://geocode.xyz/52.508,13.381?geoit=json. Use the fetch API and promises to get the data. Do NOT use the getJSON function we created, that is cheating 😉
3. Once you have the data, take a look at it in the console to see all the attributes that you recieved about the provided location. Then, using this data, log a messsage like this to the console: 'You are in Berlin, Germany'
4. Chain a .catch method to the end of the promise chain and log errors to the console
5. This API allows you to make only 3 requests per second. If you reload fast, you will get this error with code 403. This is an error with the request. Remember, fetch() does NOT reject the promise in this case. So create an error to reject the promise yourself, with a meaningful error message.

PART 2
6. Now it's time to use the received data to render a country. So take the relevant attribute from the geocoding API result, and plug it into the countries API that we have been using.
7. Render the country and catch any errors, just like we have done in the last lecture (you can even copy this code, no need to type the same code)

TEST COORDINATES 1: 52.508, 13.381 (Latitude, Longitude)
TEST COORDINATES 2: 19.037, 72.873
TEST COORDINATES 2: -33.933, 18.474

GOOD LUCK 😀
*/
const btn = document.querySelector('.btn-coordinates');
const inputLat = document.querySelector('.input-lat');
const inputLng = document.querySelector('.input-lng');
const countriesContainer = document.querySelector('.countries');
const cityContainer = document.querySelector('.city');

const renderCity = function (data) {
  const html = `City name: ${data.city}`;
  cityContainer.insertAdjacentHTML('beforeend', html);
};

const renderCountry = function (data, className = '') {
  const borders = data.borders;
  let res = '';
  for (let i = 0; i < borders.length; i++) {
    res += `<li>${borders[i]}</li>`;
  }
  console.log(borders);

  const html = `
  <article class="country ${className}">
    <img class="country__img" src="${data.flag}" />
    <div class="country__data">
      <h3 class="country__name">${data.name}</h3>
      <h4 class="country__region">${data.region}</h4>
      <p class="country__row"><span>👫</span>${(
        +data.population / 1000000
      ).toFixed(1)} people</p>
      <p class="country__row"><span>🗣️</span>${data.languages[0].name}</p>
      <p class="country__row"><span>💰</span>${data.currencies[0].name}</p>
      <p class="country__row"><span>⏮⏭</span>
      <ul style="list-style: none">${res}
        </ul></p>
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  /* countriesContainer.style.opacity = 1; */
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};

{
  /* <ul style="list-style: none">
  ${data[0].borders.forEach(
    value => '<li>' + value + '</li>'
    )}</ul> */
}

const whereAmI = function (lat, lng) {
  if (!lat || !lng) return;
  console.log(typeof +lat, lat);
  console.log(typeof +lng, lng);
  /* if ( typeof !lat ('number') || typeof !lng  ('number') return; */
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
    .then(response => {
      if (!response.ok) {
        throw new Error(
          `Something went wrong with those coordinates. ${response.status}`
        );
      } else {
        console.log('So far so good');
      }
      const data = response.json();
      /* console.log(data); */
      return data;
    })
    .then(data => {
      console.log(data);
      if (data.city === undefined || data.country === undefined) {
        renderError('Sorry, location not found');
      } else {
        renderCity(data);
        console.log(`You are in ${data.city}, ${data.country}`);
      }
      return fetch(
        `https://restcountries.eu/rest/v2/name/${data.country.toLowerCase()}`
      );
    })
    .then(data => {
      const parsedData = data.json();
      /* console.log(parsedData); */
      return parsedData;
      /* renderCountry(parsedData, ''); */
    })
    .then(parsedData => {
      renderCountry(parsedData[0], '');
    })
    .catch(err => {
      /*       console.log(`${err}`); */
      console.log(`Something went wrong ${err.message}. Try again!`);
    })
    //Finally block always execute
    .finally(() => {
      countriesContainer.style.opacity = 1;
    })
    .catch(err => {
      console.log(`Something went wrong ${err.message}. Try again!`);
    });
};

/* export { renderCountry }; */

btn.addEventListener('click', function (e) {
  e.preventDefault();
  countriesContainer.innerHTML = '';
  cityContainer.innerHTML = '';
  whereAmI(inputLat.value, inputLng.value);
});
/* whereAmI(52.508, 13.381); */
/* whereAmI(50.508, 19.381); */

/*
const whereAmI = function (lat, lng) {
  fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`)
  .then(res => {
    if (!res.ok) throw new Error(`Problem with geocoding ${res.status}`);
    return res.json();
  })
  .then(data => {
    console.log(data);
    console.log(`You are in ${data.city}, ${data.country}`);
    
    return fetch(`https://restcountries.eu/rest/v2/name/${data.country}`);
  })
  .then(res => {
    if (!res.ok) throw new Error(`Country not found (${res.status})`);
    
    return res.json();
  })
  .then(data => renderCountry(data[0]))
  .catch(err => console.error(`${err.message} 💥`));
};
whereAmI(52.508, 13.381);
whereAmI(19.037, 72.873);
whereAmI(-33.933, 18.474);
*/
export { whereAmI, renderCountry };

///////////////////////////////////////
// Coding Challenge #3

/* 
PART 1
Write an async function 'loadNPause' that recreates Coding Challenge #2, this time using async/await (only the part where the promise is consumed). Compare the two versions, think about the big differences, and see which one you like more.
Don't forget to test the error handler, and to set the network speed to 'Fast 3G' in the dev tools Network tab.

*/

const whereAmIAsync = async function (lat, lng) {
  if (!lat || !lng) return;
  try {
    const rawData = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    if (!rawData.ok) {
      throw new Error(
        `Something went wrong with those coordinates. ${response.status}`
      );
    } else {
      console.log('So far so good');
    }
    const data = await rawData.json();
    console.log(data);
    if (data.city === undefined || data.country === undefined) {
      renderError('Sorry, location not found');
    } else {
      renderCity(data);
      console.log(`You are in ${data.city}, ${data.country}`);
    }
    const countryData = await fetch(
      `https://restcountries.eu/rest/v2/name/${data.country.toLowerCase()}`
    );
    const parsedData = await countryData.json();
    renderCountry(parsedData[0], '');
  } catch (err) {
    console.log(err);
  }
};

whereAmIAsync(52.508, 13.381);
