import getWeather from '../api/getWeather';
import getGiphy from '../api/getGiphy';
import gifFromUrl from './gifFromUrl';
import { cToF, fToC } from './tempConverter';

const form = document.querySelector('form');
const cityField = document.querySelector('form input');
const weatherContainer = document.querySelector('.weather-container');

const toggleUnits = (e) => {
  const tempHolder = document.querySelector('span.temp-holder');
  const currentUnit = e.target.dataset.unit;
  const currentTemp = e.target.dataset.temp;
  if (currentUnit === 'C') {
    const newTemp = cToF(+currentTemp);
    tempHolder.innerHTML = '';
    tempHolder.innerHTML += newTemp;
    e.target.dataset.unit = 'F';
    // eslint-disable-next-line prefer-destructuring
    e.target.dataset.temp = newTemp.split(' ')[0];
    e.target.innerHTML = 'Toggle units to Celsius';
  } else {
    const newTemp = fToC(+currentTemp);
    tempHolder.innerHTML = '';
    tempHolder.innerHTML += newTemp;
    e.target.dataset.unit = 'C';
    // eslint-disable-next-line prefer-destructuring
    e.target.dataset.temp = newTemp.split(' ')[0];
    e.target.innerHTML = 'Toggle units to Fahrenheit ';
  }
};

const handleFormSubmit = async (e) => {
  e.preventDefault();
  if (form.checkValidity()) {
    weatherContainer.innerHTML = '';
    const { weather, desc } = await getWeather(cityField.value);
    cityField.value = '';
    if (weather === null) {
      weatherContainer.innerHTML += '<h1>City not found </h1>';
      return;
    }
    weatherContainer.innerHTML += `<h1>Current temp: <span class="temp-holder">${weather.temp} °C</span></h1> `;

    const { data: [a] } = await getGiphy(desc.main);
    weatherContainer.innerHTML += `<h1>Weather is ${desc.main}</h1> `;
    weatherContainer.innerHTML += `<div><button data-unit="C" data-temp="${weather.temp}" class="unit-toggler">Toggle units to Fahrenheit</button></div>`;
    document.querySelector('.unit-toggler').addEventListener('click', toggleUnits);
    weatherContainer.appendChild(gifFromUrl(a.embed_url));
  } else {
    form.reportValidity();
  }
};

export default handleFormSubmit;