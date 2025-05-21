let destacados = [];
let activosNoD = [];
let soldOut = [];

// fetch filtrado por dest
fetch('http://localhost:9003/evento/activoAndDestacado/S')
  .then(res => res.json())
  .then(data =>{
    destacados = data;
    renderEventosD();
  });
// fetch filtrado por act
fetch('http://localhost:9003/evento/activoAndDestacado/N')
  .then(res => res.json())
  .then(data =>{
    activosNoD = data;
    renderEventosA();
  });
// fetch filtrado por sold-out
fetch('http://localhost:9003/evento/estado/TERMINADO')
.then(res => res.json())
.then(data => {
  soldOut = data;
  renderEventosSoldOut();
});

// Destacados 1
function renderEventosD() {
  const rowMain = document.getElementById('fila-eventos-destacados');
  rowMain.innerHTML = ''; // Limpiar contenedor

  const col1 = document.createElement('div');
  col1.className = "col-6 sub-columna1-eventos";
  rowMain.appendChild(col1);

  const col2 = document.createElement('div');
  col2.className = "col-6 sub-columna2-eventos";
  rowMain.appendChild(col2);

  destacados.slice(0, 2).forEach(d => {
    let card = document.createElement('div');
    card.className = 'contenedor-card';
    card.innerHTML = `
      <div class="card">
        <img src="${d.rutaImagen}" class="card-img-top" alt="FotoEvento1">
        <div class="card-body">
          <h5 class="card-title">${d.nombre || 'Sin título'}</h5>
          <p class="card-text">${d.descripcion || 'Sin descripción'}</p>
        </div>
      </div>
    `;
    col1.appendChild(card);
  });

  destacados.slice(2, 4).forEach(d => {
    let card = document.createElement('div');
    card.className = 'contenedor-card';
    card.innerHTML = `
      <div class="card">
        <img src="${d.rutaImagen}" class="card-img-top" alt="FotoEvento1">
        <div class="card-body">
          <h5 class="card-title">${d.nombre || 'Sin título'}</h5>
          <p class="card-text">${d.descripcion || 'Sin descripción'}</p>
        </div>
      </div>
    `;
    col2.appendChild(card);
  });
}


function renderEventosA() {
  const rowMain = document.getElementById('fila-eventos-activos');
  rowMain.innerHTML = ''; // Limpiar contenedor

  const col1 = document.createElement('div');
  col1.className = "col-6 sub-columna1-eventos";
  rowMain.appendChild(col1);

  const col2 = document.createElement('div');
  col2.className = "col-6 sub-columna2-eventos";
  rowMain.appendChild(col2);

  activosNoD.slice(0, 2).forEach(d => {
    let card = document.createElement('div');
    card.className = 'contenedor-card';
    card.innerHTML = `
      <div class="card">
        <img src="${d.rutaImagen}" class="card-img-top" alt="FotoEvento1">
        <div class="card-body">
          <h5 class="card-title">${d.nombre || 'Sin título'}</h5>
          <p class="card-text">${d.descripcion || 'Sin descripción'}</p>
        </div>
      </div>
    `;
    col1.appendChild(card);
  });

  activosNoD.slice(2, 4).forEach(d => {
    let card = document.createElement('div');
    card.className = 'contenedor-card';
    card.innerHTML = `
      <div class="card">
        <img src="${d.rutaImagen}" class="card-img-top" alt="FotoEvento1">
        <div class="card-body">
          <h5 class="card-title">${d.nombre || 'Sin título'}</h5>
          <p class="card-text">${d.descripcion || 'Sin descripción'}</p>
        </div>
      </div>
    `;
    col2.appendChild(card);
  });
}


// Sold-out 1
function renderEventosSoldOut() {
  const rowMain = document.getElementById('fila-eventos-sold-out');
  rowMain.innerHTML = ''; // Limpiar contenedor

  const col1 = document.createElement('div');
  col1.className = "col-6 sub-columna1-eventos";
  rowMain.appendChild(col1);

  const col2 = document.createElement('div');
  col2.className = "col-6 sub-columna2-eventos";
  rowMain.appendChild(col2);

  soldOut.slice(0, 2).forEach(d => {
    let card = document.createElement('div');
    card.className = 'contenedor-card';
    card.innerHTML = `
      <div class="card">
        <img src="${d.rutaImagen}" class="card-img-top" alt="FotoEvento1">
        <div class="card-body">
          <h5 class="card-title">${d.nombre || 'Sin título'}</h5>
          <p class="card-text">${d.descripcion || 'Sin descripción'}</p>
        </div>
      </div>
    `;
    col1.appendChild(card);
  });

  soldOut.slice(2, 4).forEach(d => {
    let card = document.createElement('div');
    card.className = 'contenedor-card';
    card.innerHTML = `
      <div class="card">
        <img src="${d.rutaImagen}" class="card-img-top" alt="FotoEvento1">
        <div class="card-body">
          <h5 class="card-title">${d.nombre || 'Sin título'}</h5>
          <p class="card-text">${d.descripcion || 'Sin descripción'}</p>
        </div>
      </div>
    `;
    col2.appendChild(card);
  });
}
