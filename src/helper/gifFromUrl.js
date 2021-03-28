const gifFromUrl = (url) => {
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
export default gifFromUrl;