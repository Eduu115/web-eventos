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
    const modalId = `infoModal-${evento.idEvento}`; // id único para cada modal

    let card = document.createElement('div');
    card.className = 'contenedor-card';
    card.innerHTML = `

    <div class="card" style="cursor:pointer;" data-bs-toggle="modal" data-bs-target="#${modalId}">
      <img src="${evento.rutaImagen}" class="card-img-top" alt="FotoEvento1">
      <div class="card-body">
        <h5 class="card-title">${evento.nombre || 'Sin título'}</h5>
        <p class="card-text">${evento.descripcion || 'Sin descripción'}</p>
      </div>
    </div>

    <div class="modal fade" id="${modalId}" tabindex="-1" aria-labelledby="${modalId}-label" aria-hidden="true">
      <div class="modal-dialog modal-lg modal-dialog-centered">
        <div class="modal-content custom-modal-style">
          <div class="modal-body text-white">
            <form>
              <div class="container-fluid">
                <div class="row text-center mb-4">
                  <div class="col-12">
                    <h5 id="${modalId}-label" class="mb-3 titulos h2">Título: ${evento.nombre} </h5>
                    <img src="${evento.rutaImagen}" alt="FotoEvento" id="modalImage-${evento.id}"
                      class="img-fluid rounded" style="max-height: 300px; object-fit: cover;">
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <p><strong>Descripción: ${evento.descripcion} </strong></p>
                    <p><strong>Duración: ${evento.duracion + evento.unidadDuracion}</strong></p>
                    <p><strong>Dirección: ${evento.direccion}</strong></p>
                    <p><strong>Fecha inicio: ${evento.fechaInicio}</strong></p>
                    <p><strong>Precio: ${evento.precio}€</strong></p>
                  </div>

                  <div class="col-md-6 d-flex flex-column justify-content-between">
                    <div class="mb-3">
                      <label for="observaciones-${evento.id}" class="form-label">Observaciones</label>
                      <textarea class="form-control custom-input" id="observaciones-${evento.id}"
                        name="observaciones" rows="4"
                        placeholder="Anota tus observaciones aquí"></textarea>
                    </div>

                    <div class="row">
                      <div class="col-6">
                        <label for="cantidad-${evento.id}" class="form-label">Cantidad</label>
                        <select class="form-select custom-input" id="cantidad-${evento.id}"
                          name="cantidad" required>
                          <option value="">Selecciona</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                          <option value="6">6</option>
                          <option value="7">7</option>
                          <option value="8">8</option>
                          <option value="9">9</option>
                          <option value="10">10</option>
                        </select>
                      </div>
                      <div class="col-6 d-flex align-items-end">
                        <button type="submit" class="btn btn-outline-light mt-2 w-100">Reservar</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  `;

    contenedor.appendChild(card);
  });
}