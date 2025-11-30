'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');
const lat = document.querySelector('.lat');
const lng = document.querySelector('.lng');
const myForm = document.querySelector('.myForm');

///////////////////////////////////////

const renderCountry = function (data, className = '') {
  let html = `<article class="country ${className}">
          <img class="country__img" src="${data.flags.svg}" />
          <div class="country__data">
            <h3 class="country__name">${data.name.common}</h3>
            <h4 class="country__region">${data.region}</h4>
            <p class="country__row"><span>👫</span>${(
              +data.population / 1000000
            ).toFixed(2)} people</p>
            <p class="country__row"><span>🗣️</span>${
              Object.values(data.languages)[0]
            }</p>
            <p class="country__row"><span>💰</span>${
              Object.values(data.currencies)[0].symbol
            } ${Object.values(data.currencies)[0].name}</p>
          </div>
        </article>`;
  countriesContainer.insertAdjacentHTML('beforeend', html);
};

const renderError = function (msg) {
  countriesContainer.insertAdjacentText('beforeend', `***${msg}***`);
};

const getJSON = function (url, errorMsg = 'Somethig went wrong') {
  return fetch(url).then(response => {
    if (!response.ok) throw new Error(`${errorMsg} ${response.status}`);

    return response.json();
  });
};

let country2;
const whereAmI = function (lat, lng) {
  fetch(
    `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}&localityLanguage=en`
  )
    .then(response => response.json())
    .then(data => {
      if (data.city === '') throw new Error('No data.city found');
      else {
        country2 = data;
        console.log(country2.countryCode);
      }
      return getJSON(
        `https://restcountries.com/v3.1/alpha/${country2.countryCode}`,
        'Country not found'
      );
    })
    .then(data => {
      renderCountry(data[0]);
    })
    .catch(err => console.log(`Something went wrong ${err}`))
    .finally(() => {
      // This code will be fullfilled no mater what
      countriesContainer.style.opacity = 1;
    });
};

myForm.addEventListener('submit', function (event) {
  // Prevent the default form submission behavior (page reload)
  event.preventDefault();

  // Your custom logic to handle the form submission
  whereAmI(lat.value, lng.value);

  // Example: collect form data, send an AJAX request, display a message, etc.
});
