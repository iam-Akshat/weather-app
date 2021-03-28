import './styles.css';

const apiURL = 'http://api.openweathermap.org/data/2.5/weather?appid=50724fd12d9b476a0fb49df189e71909&units=metric&q=';
const giphyKey = '10TxGXPpcNb5tmB1TmsigZ53hpO9v42i';
const giphyBaseURL = `http://api.giphy.com/v1/gifs/search?api_key=${giphyKey}&limit=1&q=`;
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
  if (res.status === 404) return { weather: null, desc: null };
  const data = await res.json();
  return { weather: data.main, desc: data.weather[0] };
};
const getGiphy = async (q) => {
  const endpoint = `${giphyBaseURL}${q}`;
  const raw = await fetch(endpoint);
  return raw.json();
};
const imageWithUrl = (url) => {
  const img = document.createElement('div');
  img.classList.add('gif-container');
  const markup = `
  <iframe src="${url}"
   width="100%"
    height="100%"
     style="position:absolute"
      frameBorder="0"
       class="giphy-embed"
        allowFullScreen>
  </iframe>`;

  img.innerHTML += markup;
  return img;
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
    weatherContainer.innerHTML += `<h1>Current temp: ${weather.temp}  °C</h1> `;
    const { data: [a] } = await getGiphy(desc.main);
    weatherContainer.appendChild(imageWithUrl(a.embed_url));
  } else {
    form.reportValidity();
  }
};

submitBtn.addEventListener('click', handleFormSubmit);
