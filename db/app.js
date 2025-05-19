let reservas = [];
// fetch cargamos los datos
fetch('http://localhost:9003/evento/todos')
  .then(res => res.json())
  .then(data => {
    reservas = data;
    renderizarReservas();
});

//------------------------Trabajamos con el array olvidando el JSON
// CRUD
function agregarReserva(datos) {
  const id = reservas.length ? reservas[reservas.length - 1].id + 1 : 1;
  reservas.push({ id, ...datos, usuarioReserva: usuarioActual });
}
function editarReserva(id, nuevosDatos) {
  const idx = reservas.findIndex(r => r.id === id);
  if (idx !== -1) reservas[idx] = { ...reservas[idx], ...nuevosDatos };
}
function eliminarReserva(id) {
  reservas = reservas.filter(r => r.id !== id);
}

// 3. Renderizado en DOM
function renderizarReservas() {
  const row = document
    .getElementById('seccion-reservas')
    .querySelector('.row.g-2');
  row.innerHTML = ''; // limpio

  reservas.forEach(r => {
    const col = document.createElement('div');
    col.className = 'col-12 evento-reservado';
    col.innerHTML = `
      <div class="card d-grid">
        <div class="row">
          <div class="col-1">
            <h5 class="card-title">${r.nombre}</h5>
          </div>
          <div class="contenedor-info col-4">
            <p>id : ${r.idEvento}</p>
            <p>Estado : ${r.estado}</p>
            <p>APM : ${r.aforoMaximo}</p>
          </div>
          <div class="contenedor-botones col-5 d-flex justify-content-center">
            <button class="me-4 button btn-edit" data-id="${r.idEvento}">Editar</button>
            <button class="me-4 button btn-delete" data-id="${r.idEvento}">Eliminar</button>
            <button class="me-4 button btn-view" data-id="${r.idEvento}">Ver detalles</button>
          </div>
          <div class="col-2 seccion-imagen">
            <img src="${r.imagen}" alt="imagen-evento">
          </div>
        </div>
      </div>
    `;
    row.appendChild(col);
  });
}
// inicializar render
renderizarReservas();
