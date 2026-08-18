const hotelsList = document.getElementById('hotels-list');
const spotsList = document.getElementById('spots-list');
const itineraryList = document.getElementById('itinerary-list');
const reservationsList = document.getElementById('reservations-list');
const hotelSearch = document.getElementById('hotel-search');
const hotelSort = document.getElementById('hotel-sort');

let hotels = [];
let itinerary = JSON.parse(localStorage.getItem('itinerary')||'[]');
let reservations = JSON.parse(localStorage.getItem('reservations')||'[]');

function renderHotels(list){
  hotelsList.innerHTML = '';
  list.forEach(h=>{
    const card = document.createElement('div');card.className='hotel-card';
    card.innerHTML = `<img src="${h.image}" alt="${h.name}"><div class="body"><h4>${h.name}</h4><p>${h.city} • R$ ${h.price} • ⭐ ${h.rating}</p><div style="margin-top:8px"><button data-id="${h.id}" class="reserve-btn">Reservar</button></div></div>`;
    hotelsList.appendChild(card);
  });
}

function loadHotels(){
  fetch('hotels.json').then(r=>r.json()).then(data=>{hotels=data;renderHotels(data)}).catch(()=>{hotels=[]});
}

hotelSearch.addEventListener('input',()=>{
  const q = hotelSearch.value.toLowerCase();
  renderHotels(hotels.filter(h=>h.name.toLowerCase().includes(q)||h.city.toLowerCase().includes(q)));
});
hotelSort.addEventListener('change',()=>{
  const v = hotelSort.value; let sorted=[...hotels];
  if(v==='price-asc') sorted.sort((a,b)=>a.price-b.price);
  if(v==='price-desc') sorted.sort((a,b)=>b.price-a.price);
  renderHotels(sorted);
});

document.addEventListener('click',e=>{
  if(e.target.matches('.reserve-btn')) openReserve(e.target.dataset.id);
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
  reservations.push(booking); localStorage.setItem('reservations',JSON.stringify(reservations));
  modal.classList.add('hidden'); renderReservations(); alert('Reserva confirmada! (apenas simulação)');
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
  {id:1,name:'Centro Histórico',city:'Cidade',desc:'Passeio guiado pelo centro histórico.'},
  {id:2,name:'Praia Azul',city:'Litoral',desc:'Ótima para banho e pôr do sol.'},
  {id:3,name:'Museu Local',city:'Cidade',desc:'Exposições permanentes e temporárias.'}
];

function renderSpots(){
  spotsList.innerHTML='';
  spots.forEach(s=>{
    const div=document.createElement('div');div.className='spot-card';
    div.innerHTML = `<h4>${s.name}</h4><p>${s.city} • ${s.desc}</p><div style="margin-top:8px"><button data-id="${s.id}" class="add-spot">Adicionar</button></div>`;
    spotsList.appendChild(div);
  });
}

document.addEventListener('click',e=>{
  if(e.target.matches('.add-spot')){
    const id = Number(e.target.dataset.id); const spot = spots.find(s=>s.id===id);
    if(spot && !itinerary.find(i=>i.id===id)){ itinerary.push(spot); localStorage.setItem('itinerary',JSON.stringify(itinerary)); renderItinerary(); }
  }
});

function renderItinerary(){
  itineraryList.innerHTML='';
  itinerary.forEach(i=>{ const li=document.createElement('li'); li.textContent = `${i.name} — ${i.city}`; itineraryList.appendChild(li); });
}

document.getElementById('clear-itinerary').addEventListener('click',()=>{ itinerary=[]; localStorage.removeItem('itinerary'); renderItinerary(); });

// Init
loadHotels(); renderSpots(); renderItinerary(); renderReservations();
