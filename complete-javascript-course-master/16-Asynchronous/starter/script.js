'use strict';

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

const getJSON = function (url, errorMsg = 'Something went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) {
      throw new Error(`${errorMsg} (${response.status})`);
    }
  });
};

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
Promise.reject(new Error('Problem!')).catch(x => console.error(x));
