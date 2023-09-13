const API_URL = 'https://images-api.nasa.gov/search?q=';

const input = document.getElementById('inputBuscar');
const searchBtn = document.getElementById('btnBuscar');
const container = document.getElementById('contenedor');

let data = {};

const getJSONData = async () => {
  const response = await fetch(API_URL + input.value);
  const responseData = await response.json();
  const items = responseData.collection.items;
  return items;
};

const showCards = (items) => {
  items.forEach((item) => {
    if (item.data[0].media_type === 'image') {
      const { title, description, date_created } = item.data[0];
      let image = item.links[0].href;

      const card = document.createElement('div');
      card.classList = 'card';
      container.appendChild(card);
      card.innerHTML = `
        <img class="card-img-top" src="${image}" alt="Card image cap">
        <div class="card-body">
          <h5 class="card-title">${title}</h5>
          <p class="card-text">${description}</p>
          <p class="card-date">Fecha: ${date_created}</p>
        </div>
      `;
    }
  });
};

const clearCards = () => {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card) => card.remove());
};

searchBtn.addEventListener('click', async (e) => {
  e.stopPropagation();
  clearCards();
  data = await getJSONData();
  showCards(data);
});
