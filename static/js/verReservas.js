let reservasPorEvento = [];
const params = new URLSearchParams(window.location.search);
const idEvento = params.get('idEvento');

fetch(`http://localhost:9003/reserva/evento/${idEvento}`)
  .then(res => res.json())
  .then(data => {
    reservasPorEvento = data;
    renderizarReservas();
});


// 3. Renderizado en DOM
function renderizarReservas() {
  const row = document
    .getElementById('seccion-reservas')
    .querySelector('.row.g-2');
  row.innerHTML = ''; // limpio


 
    const col = document.createElement('div');
    col.className = 'col-12 evento-reservado';
    col.innerHTML = ` <div class="card p-3 mb-4">
    <div class="row g-3">
      <div class="col-md-1">
        <h5 class="card-title">ID</h5>
      </div>
      <div class="col-md-3">
        <h5 class="card-title">NOMBRE</h5>
      </div>
      <div class="col-md-3">
        <h5 class="card-title">EMAIL</h5>
      </div>
      <div class="col-md-2">
        <h5 class="card-title">PERFIL</h5>
      </div>
      <div class="col-md-1">
        <h5 class="card-title">CANT</h5>
      </div>
      <div class="col-md-2 border-0">
        <h5 class="card-title">INGRESOS</h5>
      </div>
    </div>
  </div>
    `;
    row.appendChild(col);


  if (reservasPorEvento.length === 0) {
    col.className = 'col-12 evento-reservado';
    col.innerHTML= '';
    col.innerHTML = `
    <div class="card p-3">
      <h5>No hay reservas para este evento</h5>
    </div>
    `;
    row.appendChild(col);
    return
  }

  reservasPorEvento.forEach(r => {
    const col = document.createElement('div');
    col.className = 'col-12 evento-reservado';
    col.innerHTML = `
    
    <div class="card p-3 mb-4">
      <div class="row">
        <div class="col-md-1">
          <h5 class="card-title">${r.idReserva}</h5>
        </div>
        <div class="col-md-3">
          <p><strong>Reserva de:</strong> ${r.usuario.nombre} ${r.usuario.apellidos}</p>
        </div>
        <div class="col-md-3 ">
          <p><strong>Email:</strong> ${r.usuario.email}</p>
        </div>
        <div class="col-md-2">
          <p><strong>Perfil:</strong> ${r.usuario.perfil.nombre}</p>
        </div>
        <div class="col-md-1">
          <p><strong>Cantidad:</strong> ${r.cantidad}</p>
        </div>
        <div class="col-md-2 border-0">
          <p><strong>Ingresos:</strong> ${r.cantidad * r.evento.precio} </p>
        </div>
      </div>
    </div>


    `;
    row.appendChild(col);

  });
}