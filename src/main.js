import './styles.css';

const apiURL = 'http://api.openweathermap.org/data/2.5/weather?appid=50724fd12d9b476a0fb49df189e71909&units=metric&q=';
const submitBtn = document.querySelector('.form-container form button');
const form = document.querySelector('form');
const cityField = document.querySelector('form input');
const weatherContainer = document.querySelector('.weather-container');
const loader = document.querySelector('.loader');
const getWeather = async (cityName) => {
  loader.classList.toggle('d-none');
  const url = apiURL + cityName;
  const res = await fetch(url);
  loader.classList.toggle('d-none');
  if (res.status === 404) return null;
  const data = await res.json();


  return data.main;
};
const handleFormSubmit = async (e) => {
  e.preventDefault();
  if (form.checkValidity()) {
    weatherContainer.innerHTML = '';
    const weather = await getWeather(cityField.value);
    cityField.value = '';
    if (weather === null) {
      weatherContainer.innerHTML += '<h1>City not found </h1>';
      return;
    }
    weatherContainer.innerHTML += `<h1>${weather.temp}  °C</h1> `;
  } else {
    form.reportValidity();
  }
};

submitBtn.addEventListener('click', handleFormSubmit);
