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
  countriesContainer.style.opacity = 1;
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

const getCountryData = function (country) {
  fetch(`https://restcountries.eu/rest/v2/name/${country}`)
    .then(function (response) {
      console.log(response);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      renderCountry(data[0]);
    });
};

getCountryData('sweden');
