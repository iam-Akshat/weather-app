import getWeather from '../api/getWeather';
import getGiphy from '../api/getGiphy';
import gifFromUrl from './gifFromUrl';

const form = document.querySelector('form');
const cityField = document.querySelector('form input');
const weatherContainer = document.querySelector('.weather-container');

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
    weatherContainer.innerHTML += `<h1>Current temp: ${weather.temp}  °C</h1> `;
    const { data: [a] } = await getGiphy(desc.main);
    weatherContainer.appendChild(gifFromUrl(a.embed_url));
  } else {
    form.reportValidity();
  }
};

export default handleFormSubmit;