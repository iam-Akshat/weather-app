const loader = document.querySelector('.loader');

const prepURL = (units, cityName) => `http://api.openweathermap.org/data/2.5/weather?appid=50724fd12d9b476a0fb49df189e71909&units=${units}&q=${cityName}`;
const getWeather = async (cityName, units = 'metric') => {
  loader.classList.toggle('d-none');
  const url = prepURL(units, cityName);
  const res = await fetch(url);
  loader.classList.toggle('d-none');
  if (res.status === 404) return { weather: null, desc: null };
  const data = await res.json();
  return { weather: data.main, desc: data.weather[0] };
};
export default getWeather;