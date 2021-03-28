const apiURL = 'http://api.openweathermap.org/data/2.5/weather?appid=50724fd12d9b476a0fb49df189e71909&units=metric&q=';
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
export default getWeather;