let destacados = [];
let activosNoD = [];
let soldOut = [];

// Fetch y render para destacados
fetch('http://localhost:9003/evento/activoAndDestacado/S')
  .then(res => res.json())
  .then(data => {
    destacados = data.slice(0, 9); // limitar a 9
    renderEventos(destacados, 'destacados');
  });

// Fetch y render para activos
fetch('http://localhost:9003/evento/activoAndDestacado/N')
  .then(res => res.json())
  .then(data => {
    activosNoD = data.slice(0, 9); // limitar a 9
    renderEventos(activosNoD, 'activos');
  });

// Fetch y render para sold out
fetch('http://localhost:9003/evento/estado/TERMINADO')
  .then(res => res.json())
  .then(data => {
    soldOut = data.slice(0, 9); // limitar a 9
    renderEventos(soldOut, 'sold-out');
  });

// Función central principal que depende de la seccion de renderizado
function renderEventos(lista, seccionId) {
  const contenedor = document.getElementById(seccionId);
  contenedor.innerHTML = ''; // limpiar sección

  lista.forEach(evento => {
    let card = document.createElement('div');
    card.className = 'contenedor-card';
    card.innerHTML = `
      <div class="card">
        <img src="${evento.rutaImagen}" class="card-img" alt="Imagen del evento">
        <div class="card-body">
          <h5 class="card-title">${evento.nombre || 'Sin título'}</h5>
          <p class="card-text">${evento.descripcion || 'Sin descripción'}</p>
        </div>
      </div>
    `;
    contenedor.appendChild(card);
  });
}
