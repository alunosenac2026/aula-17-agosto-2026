const getElement = id => document.getElementById(id);
const hotelsList = getElement('hotels-list');
const spotsList = getElement('spots-list');
const itineraryList = getElement('itinerary-list');
const reservationsList = getElement('reservations-list');
const hotelSearch = getElement('hotel-search');
const hotelSort = getElement('hotel-sort');
const hotelResultCount = getElement('hotel-result-count');
const destinationForm = getElement('destination-form');
const destinationSearch = getElement('destination-search');
const routeCount = getElement('route-count');
const emptyRoute = getElement('empty-route');
const savedCount = getElement('saved-count');
const guidesList = getElement('guides-list');
const guideSearch = getElement('guide-search');
const guideRating = getElement('guide-rating');
const guideResultCount = getElement('guide-result-count');

let hotels = [];
let guides = [];
const readStorage = key => {
  try { return JSON.parse(localStorage.getItem(key) || '[]'); }
  catch { return []; }
};
const saveStorage = (key, value) => localStorage.setItem(key, JSON.stringify(value));

let itinerary = readStorage('itinerary');
let reservations = readStorage('reservations');

function renderHotels(list){
  hotelsList.innerHTML = '';
  hotelResultCount.textContent = `${list.length} ${list.length === 1 ? 'opção encontrada' : 'opções encontradas'}`;
  if (!list.length) { hotelsList.innerHTML = '<p class="empty-route">Nenhuma estadia encontrada. Tente outra cidade.</p>'; return; }
  list.forEach(h=>{
    const card = document.createElement('div');card.className='hotel-card';
    card.innerHTML = `<img src="${h.image}" alt="${h.name}, ${h.city}"><div class="body"><h4>${h.name}</h4><p>${h.city} · <span class="price">R$ ${h.price}</span> / noite · ★ ${h.rating}</p><button data-id="${h.id}" class="reserve-btn">Reservar estadia</button></div>`;
    hotelsList.appendChild(card);
  });
}

function loadJson(path, onSuccess, onError){
  fetch(path)
    .then(response => {
      if(!response.ok) throw new Error(`Falha ao carregar ${path}`);
      return response.json();
    })
    .then(onSuccess)
    .catch(onError);
}

function loadHotels(){
  loadJson('data/hotels.json', data=>{hotels=data;renderHotels(data)}, ()=>{hotels=[];renderHotels([])});
}

function loadGuides(){
  loadJson('data/guides.json', data=>{guides=data;renderGuides(data)}, ()=>{guides=[];renderGuides([])});
}

function filteredHotels(){
  const query = hotelSearch.value.trim().toLowerCase();
  const filtered = hotels.filter(h=>h.name.toLowerCase().includes(query)||h.city.toLowerCase().includes(query));
  const sort = hotelSort.value;
  if(sort==='price-asc') filtered.sort((a,b)=>a.price-b.price);
  if(sort==='price-desc') filtered.sort((a,b)=>b.price-a.price);
  return filtered;
}

hotelSearch.addEventListener('input',()=>{
  renderHotels(filteredHotels());
});
hotelSort.addEventListener('change',()=>{
  renderHotels(filteredHotels());
});

destinationForm.addEventListener('submit', e => {
  e.preventDefault();
  hotelSearch.value = destinationSearch.value;
  hotelSearch.dispatchEvent(new Event('input'));
  document.querySelector('.hotels').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// Modal and reservation handling
const modal = document.getElementById('reserve-modal');
const modalClose = document.getElementById('modal-close');
const reserveForm = document.getElementById('reserve-form');

function openReserve(id){
  modal.classList.remove('hidden');
  document.getElementById('hotel-id').value = id;
}
modalClose.addEventListener('click',()=>modal.classList.add('hidden'));
reserveForm.addEventListener('submit',e=>{
  e.preventDefault();
  const id = Number(document.getElementById('hotel-id').value);
  const hotel = hotels.find(h=>h.id===id)||{};
  const booking = {id, hotel:hotel.name||'Desconhecido', name:document.getElementById('res-name').value, email:document.getElementById('res-email').value, date:document.getElementById('res-date').value, nights:document.getElementById('res-nights').value};
  reservations.push(booking); saveStorage('reservations', reservations);
  modal.classList.add('hidden'); reserveForm.reset(); renderReservations(); alert('Reserva confirmada! (apenas simulação)');
});

function renderReservations(){
  reservationsList.innerHTML='';
  reservations.forEach(r=>{
    const li = document.createElement('li'); li.textContent = `${r.hotel} — ${r.name} (${r.date} • ${r.nights} noite(s))`;
    reservationsList.appendChild(li);
  });
}

// Tourist spots (sample)
const spots = [
  {id:1,name:'Centro Histórico',city:'Paraty',desc:'Ruas de pedra, fachadas coloridas e histórias a cada esquina.',image:'https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=700&q=85'},
  {id:2,name:'Praia do Futuro',city:'Fortaleza',desc:'Mar aberto, brisa boa e pôr do sol sem pressa.',image:'https://images.unsplash.com/photo-150752227?auto=format&fit=crop&w=700&q=85'},
  {id:3,name:'Museu e Arte',city:'São Paulo',desc:'Uma pausa cultural para olhar a cidade por outro ângulo.',image:'https://images.unsplash.com/photo-1564399579883-451a5d44ec08?auto=format&fit=crop&w=700&q=85'}
];

function renderSpots(){
  spotsList.innerHTML='';
  spots.forEach(s=>{
    const div=document.createElement('div');div.className='spot-card';
    div.style.backgroundImage = `url("${s.image}")`;
    div.innerHTML = `<p class="eyebrow">${s.city}</p><h4>${s.name}</h4><p>${s.desc}</p><button data-id="${s.id}" class="add-spot">+ Adicionar ao roteiro</button>`;
    spotsList.appendChild(div);
  });
}

function filteredGuides(){
  const query = guideSearch.value.trim().toLowerCase();
  const minimumRating = Number(guideRating.value);
  return guides.filter(g=>{
    const matchesQuery = `${g.name} ${g.city} ${g.specialty} ${g.languages}`.toLowerCase().includes(query);
    return matchesQuery && g.rating >= minimumRating;
  });
}

function renderGuides(list){
  guidesList.innerHTML = '';
  guideResultCount.textContent = `${list.length} ${list.length === 1 ? 'guia encontrado' : 'guias encontrados'}`;
  if(!list.length){
    guidesList.innerHTML = '<p class="empty-route">Nenhum guia encontrado. Tente outra cidade ou especialidade.</p>';
    return;
  }
  list.forEach(g=>{
    const card = document.createElement('article');
    card.className = 'guide-card';
    card.innerHTML = `<p class="eyebrow">${g.city}</p><h4>${g.name}</h4><p>${g.specialty}</p><p class="guide-meta">★ ${g.rating} · ${g.reviews} avaliações</p><p>A partir de R$ ${g.price} · ${g.languages}</p><button class="contact-guide" data-id="${g.id}">Consultar guia</button>`;
    guidesList.appendChild(card);
  });
}

guideSearch.addEventListener('input',()=>renderGuides(filteredGuides()));
guideRating.addEventListener('change',()=>renderGuides(filteredGuides()));

document.addEventListener('click', event => {
  const target = event.target;
  if(target.matches('.reserve-btn')) openReserve(target.dataset.id);
  if(target.matches('.contact-guide')) {
    const guide = guides.find(g=>g.id===Number(target.dataset.id));
    if(guide) alert(`Contato simulado com ${guide.name}, guia em ${guide.city}.`);
  }
  if(target.matches('.add-spot')) addSpotToItinerary(Number(target.dataset.id));
});

function addSpotToItinerary(id){
  const spot = spots.find(item=>item.id===id);
  if(spot && !itinerary.some(item=>item.id===id)){
    itinerary.push(spot);
    saveStorage('itinerary', itinerary);
    renderItinerary();
  }
}

function renderItinerary(){
  itineraryList.innerHTML='';
  routeCount.textContent = itinerary.length;
  emptyRoute.hidden = itinerary.length > 0;
  savedCount.textContent = `${itinerary.length} ${itinerary.length === 1 ? 'salvo' : 'salvos'}`;
  itinerary.forEach(i=>{ const li=document.createElement('li'); li.textContent = `${i.name} · ${i.city}`; itineraryList.appendChild(li); });
}

getElement('clear-itinerary').addEventListener('click',()=>{ itinerary=[]; localStorage.removeItem('itinerary'); renderItinerary(); });

// Init
loadHotels(); loadGuides(); renderSpots(); renderItinerary(); renderReservations();
