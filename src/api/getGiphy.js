const giphyKey = '10TxGXPpcNb5tmB1TmsigZ53hpO9v42i';
const giphyBaseURL = `http://api.giphy.com/v1/gifs/search?api_key=${giphyKey}&limit=1&q=`;

const getGiphy = async (q) => {
  const endpoint = `${giphyBaseURL}${q}`;
  const raw = await fetch(endpoint);
  return raw.json();
};

export default getGiphy;