'use strict';
import { whereAmI } from './challenge.js';
import { renderCountry as betterRenderCountry } from './challenge.js';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

///////////////////////////////////////
//XMLHttpRequest() IS THE OLD WAY OF AJAX CALL
const getAllcountiesData = function () {
  const request = new XMLHttpRequest();
  request.open(
    'GET',
    `https://restcountries.eu/rest/v2/all
  `
  );
  request.send();
  request.addEventListener('load', function () {
    const [...fullList] = JSON.parse(this.responseText);
    console.log(fullList);
  });
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', msg);
};
const renderCountry = function (data, className = '') {
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
    </div>
  </article>
  `;
  countriesContainer.insertAdjacentHTML('beforeend', html);
  /* countriesContainer.style.opacity = 1; */
};

//Gets only the first neighbour of the list of neighbours
const getCountryAndNeighbourData = function (country) {
  //AJAX call country
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    //Render country
    renderCountry(data);
    //Get neighbour countries
    const [neighbour] = data.borders;
    if (!neighbour) return;
    const neighbourRequest = new XMLHttpRequest();
    neighbourRequest.open(
      'GET',
      `https://restcountries.eu/rest/v2/alpha/${neighbour}`
    );
    neighbourRequest.send();
    neighbourRequest.addEventListener('load', function () {
      const neighbourData = JSON.parse(this.responseText);
      console.log(neighbourData);
      renderCountry(neighbourData, 'neighbour');
    });
  });
};

//Gets all neighbours
const getCountryAndNeighbourData2 = function (country) {
  //AJAX call country
  const request = new XMLHttpRequest();
  request.open('GET', `https://restcountries.eu/rest/v2/name/${country}`);
  request.send();

  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText);
    console.log(data);
    //Render country
    renderCountry(data);
    //Get neighbour countries
    const neighbourArr = data.borders;
    if (neighbourArr.length === 0) return;
    for (let i = 0; i < neighbourArr.length; i++) {
      const neighbourRequest = new XMLHttpRequest();
      neighbourRequest.open(
        'GET',
        `https://restcountries.eu/rest/v2/alpha/${neighbourArr[i]}`
      );
      neighbourRequest.send();
      neighbourRequest.addEventListener('load', function () {
        const neighbourData = JSON.parse(this.responseText);
        console.log(neighbourData);
        renderCountry(neighbourData, 'neighbour');
      });
    }
  });
};

/* getCountryAndNeighbourData2('switzerland'); */
/* getCountryAndNeighbourData2('vietnam'); */
/* getCountryAndNeighbourData('portugal');
getCountryAndNeighbourData('iceland'); */
/* getCountryAndNeighbourData('norway');
getCountryAndNeighbourData('sweden');
getCountryAndNeighbourData('finland'); */
/* getAllcountiesData(); */
/* countriesContainer.insertAdjacentHTML('beforeend', html); */

///////////////////////////////////////
//MODERN AJAX CALLS

// Consuming Promises
// Chaining Promises
// Handling Rejected Promises
// Throwing Errors Manually

/* const getCountryData = function (country) {
  //Fetch function returns a promise
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    //Handle the promise with then()'
    .then(function (response) {
      console.log(response);
      //Read the response with json() and return it
      return response.json();
    })
    //response.json() returns another promise, so we handle it again
    //data = response.json()
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
    });
}; */

/* const getJSON = function (url, errorMsg = 'Something went wrong') { */
const getJSON = function (url) {
  fetch(url)
    .then(response => console.log(response.json()))
    .catch(e => console.error(e));
  /*     if (!response.ok) {
      throw new Error(`${errorMsg} (${response.status})`);
    } */
};

const newGetJSON = async function (url) {
  try {
    const data = await fetch(url);
    const dataJSON = await data.json();
    return dataJSON;
  } catch (e) {
    console.log(e.message);
  }
};
/////////////////////////////////////////////////////////////////////
const getCountryDataSimplified = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    //Country from the first fetch
    .then(response => {
      console.log(response);
      //Throw error if the response is not what we expected
      if (!response.ok) {
        throw new Error(`Country not found (${response.status})`);
      }
      return response.json();
    })
    //Now from the country, get the first neighbour
    .then(data => {
      renderCountry(data[0]);
      const neighbour = data[0].borders[0];
      if (!neighbour) return;
      return fetch(`https://restcountries.eu/rest/v2/alpha/${neighbour}`);
    })
    //Neighbour from a fetch of the first fetch
    .then(response => response.json())
    .then(data => renderCountry(data, 'neighbour'))
    //Catching a rejected promise at the end of the promise chain
    .catch(err => {
      console.log(`${err}`);
      renderError(`Something went wrong ${err.message}. Try again!`);
    })
    //Finally block always execute
    .finally(() => {
      countriesContainer.style.opacity = 1;
    });
};
//ALWAYS CHAIN ONE PROMISE AFTER ANOTHER, NOT INTO ANOTHER. SO:
//fetch().then().then()
//NOT fetch().then(fetch().then())

btn.addEventListener('click', function (e) {
  e.preventDefault();
  getCountryDataSimplified('sweden');
});

/* getCountryData('sweden'); */

///////////////////////////////////////
// Building a Simple Promise
const lotteryPromise = new Promise(function (resolve, reject) {
  console.log('Lotter draw is happening 🔮');
  setTimeout(function () {
    if (Math.random() >= 0.5) {
      resolve('You WIN 💰');
    } else {
      reject(new Error('You lost your money 💩'));
    }
  }, 2000);
});

lotteryPromise.then(res => console.log(res)).catch(err => console.error(err));

// Promisifying setTimeout
const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

wait(1)
  .then(() => {
    console.log('1 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('2 second passed');
    return wait(1);
  })
  .then(() => {
    console.log('3 second passed');
    return wait(1);
  })
  .then(() => console.log('4 second passed'));

// setTimeout(() => {
//   console.log('1 second passed');
//   setTimeout(() => {
//     console.log('2 seconds passed');
//     setTimeout(() => {
//       console.log('3 second passed');
//       setTimeout(() => {
//         console.log('4 second passed');
//       }, 1000);
//     }, 1000);
//   }, 1000);
// }, 1000);

Promise.resolve('abc').then(x => console.log(x));
// Promise.reject(new Error('Problem!')).catch(x => console.error(x));

///////////////////////////////////////
// Promisifying the Geolocation API
const getPosition = function () {
  return new Promise(function (resolve, reject) {
    // navigator.geolocation.getCurrentPosition(
    //   position => resolve(position),
    //   err => reject(err)
    // );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};
getPosition()
  .then(pos => {
    console.log(pos);
    return pos;
  })
  .then(pos => {
    whereAmI(pos.coords.latitude, pos.coords.longitude);
    console.log();
  })
  .catch(console.log('Something went wrong'));

///////////////////////////////////////
// Consuming Promises with Async/Await
// Error Handling With try...catch

//An async function returns a promise
/* const whereAmI2 = async function (country) { */
const whereAmI2 = async function () {
  try {
    // Geolocation
    const pos = await getPosition();
    const { latitude: lat, longitude: lng } = pos.coords;
    // Reverse geocoding
    const resGeo = await fetch(`https://geocode.xyz/${lat},${lng}?geoit=json`);
    const dataGeo = await resGeo.json();
    //Country data

    //await forces the function to wait for the fetch method (for the promise to settle)
    const res = await fetch(
      `https://restcountries.eu/rest/v2/name/${dataGeo.country}`
    );
    //It's equivalent to
    //fetch(`https://restcountries.eu/rest/v2/name/${country}`).then(res => console.log(res));
    const data = await res.json();
    console.log(data);
    betterRenderCountry(data[0]);
    return data;
  } catch (err) {
    console.log(`Bad luck, we did something wrong 💩💩💩 ${err.message}`);
    renderError(`Bad luck, we did something wrong 💩💩💩 ${err.message}`);
  }
};
/* whereAmI2('sweden'); */
///////////////////////////////RUN THIS/////////////////////////////////////////
/* whereAmI2(); */

/* try {
  let y = 1;
  const x = 2;
  x = 3;
} catch (err) {
  console.log(err.message);
  let obj = {};
  obj = err;
  let arr = [err];
  console.log(obj);
  console.log(arr);
} */

///////////////////////////////////////
// Returning Values from Async Functions

// whereAmI()
//   .then(city => console.log(`2: ${city}`))
//   .catch(err => console.error(`2: ${err.message} 💥`))
//   .finally(() => console.log('3: Finished getting location'));

/* (async function () {
  try {
    const country = await whereAmI2();
    console.log(`2: ${country[0].name}`);
  } catch (err) {
    console.error(`2: ${err.message} 💥`);
  }
  console.log('3: Finished getting location');
})(); */

///////////////////////////////////////
// Running Promises in Parallel
//Promise combinators

/* const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMsg} (${response.status})`);
    }
  });
}; */

const get3Countries = async function (c1, c2, c3) {
  try {
    //Each call to newGetJSON run each promise one after another
    const [data1] = await newGetJSON(
      `https://restcountries.eu/rest/v2/name/${c1}`
    );
    const [data2] = await newGetJSON(
      `https://restcountries.eu/rest/v2/name/${c2}`
    );
    const [data3] = await newGetJSON(
      `https://restcountries.eu/rest/v2/name/${c3}`
    );
    console.log(data1.capital, data2.capital, data3.capital);

    //Promise.all() run all the promises at the same time
    //If one promise is rejected, all of them are rejected
    //Use Promise.all() whenever you need to do multiple async operations (that don't depend on one other) at the same time
    const data = await Promise.all([
      newGetJSON(`https://restcountries.eu/rest/v2/name/${c1}`),
      newGetJSON(`https://restcountries.eu/rest/v2/name/${c2}`),
      newGetJSON(`https://restcountries.eu/rest/v2/name/${c3}`),
    ]);
    console.log(data.map(d => d[0].capital));
  } catch (err) {
    console.error(err);
  }
};
get3Countries('portugal', 'canada', 'tanzania');

///////////////////////////////////////
// Other Promise Combinators: race, allSettled and any
// Promise.race -> The first promise to settle is the promise returned
(async function () {
  const res = await Promise.race([
    newGetJSON(`https://restcountries.eu/rest/v2/name/mexico`),
    newGetJSON(`https://restcountries.eu/rest/v2/name/italy`),
    newGetJSON(`https://restcountries.eu/rest/v2/name/egypt`),
  ]);
  console.log(res[0]);
})();

const timeout = function (sec) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error('Request took too long!'));
    }, sec * 1000);
  });
};

/* timeout(3); */
Promise.race([
  newGetJSON(`https://restcountries.eu/rest/v2/name/tanzania`),
  timeout(0.05),
])
  .then(res => console.log(res[0]))
  .catch(err => console.error(err));

// Promise.allSettled
//It gets all promises, wherter they are rejected or resolved
//Similar to Promise.all(), but Promise.all() shortcircuits as soon as one promise is rejected
Promise.allSettled([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
]).then(res => console.log(res));

Promise.all([
  Promise.resolve('Success'),
  Promise.reject('ERROR'), //Here we have an error, no promise gets returned
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

// Promise.any [ES2021]
//Returns the first fulfilled promise, ignoring the rest (unles all of them are rejected)
Promise.any([
  Promise.resolve('Success'),
  Promise.reject('ERROR'),
  Promise.resolve('Another success'),
])
  .then(res => console.log(res))
  .catch(err => console.error(err));

//Just a comment
