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
    const modalId = `infoModal-${d.idEvento}`; // id único para cada modal
    let card = document.createElement('div');
    card.className = 'contenedor-card';
    card.innerHTML = `

    <div class="card" style="cursor:pointer;" data-bs-toggle="modal" data-bs-target="#${modalId}">
      <img src="${d.rutaImagen}" class="card-img-top" alt="FotoEvento1">
      <div class="card-body">
        <h5 class="card-title">${d.nombre || 'Sin título'}</h5>
        <p class="card-text">${d.descripcion || 'Sin descripción'}</p>
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
                    <h5 id="${modalId}-label" class="mb-3 titulos h2">Título: </h5>
                    <img src="${d.rutaImagen}" alt="FotoEvento" id="modalImage-${d.idEvento}"
                      class="img-fluid rounded" style="max-height: 300px; object-fit: cover;">
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <p><strong>Descripción: ${d.descripcion} </strong></p>
                    <p><strong>Duración: ${d.duracion + d.unidadDuracion}</strong></p>
                    <p><strong>Dirección: ${d.direccion}</strong></p>
                    <p><strong>Fecha inicio: ${d.fechaInicio}</strong></p>
                    <p><strong>Precio: ${d.precio}€</strong></p>
                  </div>

                  <div class="col-md-6 d-flex flex-column justify-content-between">
                    <div class="mb-3">
                      <label for="observaciones-${d.idEvento}" class="form-label">Observaciones</label>
                      <textarea class="form-control custom-input" id="observaciones-${d.idEvento}"
                        name="observaciones" rows="4"
                        placeholder="Anota tus observaciones aquí"></textarea>
                    </div>

                    <div class="row">
                      <div class="col-6">
                        <label for="cantidad-${d.idEvento}" class="form-label">Cantidad</label>
                        <select class="form-select custom-input" id="cantidad-${d.idEvento}"
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
    col1.appendChild(card);
  });

  destacados.slice(2, 4).forEach(d => {
    const modalId = `infoModal-${d.idEvento}`; // id único para cada modal
    let card = document.createElement('div');
    card.className = 'contenedor-card';
    card.innerHTML = `

    <div class="card" style="cursor:pointer;" data-bs-toggle="modal" data-bs-target="#${modalId}">
      <img src="${d.rutaImagen}" class="card-img-top" alt="FotoEvento1">
      <div class="card-body">
        <h5 class="card-title">${d.nombre || 'Sin título'}</h5>
        <p class="card-text">${d.descripcion || 'Sin descripción'}</p>
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
                    <h5 id="${modalId}-label" class="mb-3 titulos h2">Título: </h5>
                    <img src="${d.rutaImagen}" alt="FotoEvento" id="modalImage-${d.idEvento}"
                      class="img-fluid rounded" style="max-height: 300px; object-fit: cover;">
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <p><strong>Descripción: ${d.descripcion} </strong></p>
                    <p><strong>Duración: ${d.duracion + d.unidadDuracion}</strong></p>
                    <p><strong>Dirección: ${d.direccion}</strong></p>
                    <p><strong>Fecha inicio: ${d.fechaInicio}</strong></p>
                    <p><strong>Precio: ${d.precio}€</strong></p>
                  </div>

                  <div class="col-md-6 d-flex flex-column justify-content-between">
                    <div class="mb-3">
                      <label for="observaciones-${d.idEvento}" class="form-label">Observaciones</label>
                      <textarea class="form-control custom-input" id="observaciones-${d.idEvento}"
                        name="observaciones" rows="4"
                        placeholder="Anota tus observaciones aquí"></textarea>
                    </div>

                    <div class="row">
                      <div class="col-6">
                        <label for="cantidad-${d.idEvento}" class="form-label">Cantidad</label>
                        <select class="form-select custom-input" id="cantidad-${d.idEvento}"
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
    const modalId = `infoModal-${d.idEvento}`; // id único para cada modal
    let card = document.createElement('div');
    card.className = 'contenedor-card';
    card.innerHTML = `

    <div class="card" style="cursor:pointer;" data-bs-toggle="modal" data-bs-target="#${modalId}">
      <img src="${d.rutaImagen}" class="card-img-top" alt="FotoEvento1">
      <div class="card-body">
        <h5 class="card-title">${d.nombre || 'Sin título'}</h5>
        <p class="card-text">${d.descripcion || 'Sin descripción'}</p>
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
                    <h5 id="${modalId}-label" class="mb-3 titulos h2">Título: </h5>
                    <img src="${d.rutaImagen}" alt="FotoEvento" id="modalImage-${d.idEvento}"
                      class="img-fluid rounded" style="max-height: 300px; object-fit: cover;">
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <p><strong>Descripción: ${d.descripcion} </strong></p>
                    <p><strong>Duración: ${d.duracion + d.unidadDuracion}</strong></p>
                    <p><strong>Dirección: ${d.direccion}</strong></p>
                    <p><strong>Fecha inicio: ${d.fechaInicio}</strong></p>
                    <p><strong>Precio: ${d.precio}€</strong></p>
                  </div>

                  <div class="col-md-6 d-flex flex-column justify-content-between">
                    <div class="mb-3">
                      <label for="observaciones-${d.idEvento}" class="form-label">Observaciones</label>
                      <textarea class="form-control custom-input" id="observaciones-${d.idEvento}"
                        name="observaciones" rows="4"
                        placeholder="Anota tus observaciones aquí"></textarea>
                    </div>

                    <div class="row">
                      <div class="col-6">
                        <label for="cantidad-${d.idEvento}" class="form-label">Cantidad</label>
                        <select class="form-select custom-input" id="cantidad-${d.idEvento}"
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
    col1.appendChild(card);
  });

  activosNoD.slice(2, 4).forEach(d => {
    const modalId = `infoModal-${d.idEvento}`; // id único para cada modal
    let card = document.createElement('div');
    card.className = 'contenedor-card';
    card.innerHTML = `

    <div class="card" style="cursor:pointer;" data-bs-toggle="modal" data-bs-target="#${modalId}">
      <img src="${d.rutaImagen}" class="card-img-top" alt="FotoEvento1">
      <div class="card-body">
        <h5 class="card-title">${d.nombre || 'Sin título'}</h5>
        <p class="card-text">${d.descripcion || 'Sin descripción'}</p>
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
                    <h5 id="${modalId}-label" class="mb-3 titulos h2">Título: </h5>
                    <img src="${d.rutaImagen}" alt="FotoEvento" id="modalImage-${d.idEvento}"
                      class="img-fluid rounded" style="max-height: 300px; object-fit: cover;">
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <p><strong>Descripción: ${d.descripcion} </strong></p>
                    <p><strong>Duración: ${d.duracion + d.unidadDuracion}</strong></p>
                    <p><strong>Dirección: ${d.direccion}</strong></p>
                    <p><strong>Fecha inicio: ${d.fechaInicio}</strong></p>
                    <p><strong>Precio: ${d.precio}€</strong></p>
                  </div>

                  <div class="col-md-6 d-flex flex-column justify-content-between">
                    <div class="mb-3">
                      <label for="observaciones-${d.idEvento}" class="form-label">Observaciones</label>
                      <textarea class="form-control custom-input" id="observaciones-${d.idEvento}"
                        name="observaciones" rows="4"
                        placeholder="Anota tus observaciones aquí"></textarea>
                    </div>

                    <div class="row">
                      <div class="col-6">
                        <label for="cantidad-${d.idEvento}" class="form-label">Cantidad</label>
                        <select class="form-select custom-input" id="cantidad-${d.idEvento}"
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
    const modalId = `infoModal-${d.idEvento}`; // id único para cada modal
    let card = document.createElement('div');
    card.className = 'contenedor-card';
    card.innerHTML = `

    <div class="card" style="cursor:pointer;" data-bs-toggle="modal" data-bs-target="#${modalId}">
      <img src="${d.rutaImagen}" class="card-img-top" alt="FotoEvento1">
      <div class="card-body">
        <h5 class="card-title">${d.nombre || 'Sin título'}</h5>
        <p class="card-text">${d.descripcion || 'Sin descripción'}</p>
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
                    <h5 id="${modalId}-label" class="mb-3 titulos h2">Título: </h5>
                    <img src="${d.rutaImagen}" alt="FotoEvento" id="modalImage-${d.idEvento}"
                      class="img-fluid rounded" style="max-height: 300px; object-fit: cover;">
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <p><strong>Descripción: ${d.descripcion} </strong></p>
                    <p><strong>Duración: ${d.duracion + d.unidadDuracion}</strong></p>
                    <p><strong>Dirección: ${d.direccion}</strong></p>
                    <p><strong>Fecha inicio: ${d.fechaInicio}</strong></p>
                    <p><strong>Precio: ${d.precio}€</strong></p>
                  </div>

                  <div class="col-md-6 d-flex flex-column justify-content-between">
                    <div class="mb-3">
                      <label for="observaciones-${d.idEvento}" class="form-label">Observaciones</label>
                      <textarea class="form-control custom-input" id="observaciones-${d.idEvento}"
                        name="observaciones" rows="4"
                        placeholder="Anota tus observaciones aquí"></textarea>
                    </div>

                    <div class="row">
                      <div class="col-6">
                        <label for="cantidad-${d.idEvento}" class="form-label">Cantidad</label>
                        <select class="form-select custom-input" id="cantidad-${d.idEvento}"
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
    col1.appendChild(card);
  });

  soldOut.slice(2, 4).forEach(d => {
    const modalId = `infoModal-${d.idEvento}`; // id único para cada modal
    let card = document.createElement('div');
    card.className = 'contenedor-card';
    card.innerHTML = `

    <div class="card" style="cursor:pointer;" data-bs-toggle="modal" data-bs-target="#${modalId}">
      <img src="${d.rutaImagen}" class="card-img-top" alt="FotoEvento1">
      <div class="card-body">
        <h5 class="card-title">${d.nombre || 'Sin título'}</h5>
        <p class="card-text">${d.descripcion || 'Sin descripción'}</p>
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
                    <h5 id="${modalId}-label" class="mb-3 titulos h2">Título: </h5>
                    <img src="${d.rutaImagen}" alt="FotoEvento" id="modalImage-${d.idEvento}"
                      class="img-fluid rounded" style="max-height: 300px; object-fit: cover;">
                  </div>
                </div>

                <div class="row">
                  <div class="col-md-6">
                    <p><strong>Descripción: ${d.descripcion} </strong></p>
                    <p><strong>Duración: ${d.duracion + d.unidadDuracion}</strong></p>
                    <p><strong>Dirección: ${d.direccion}</strong></p>
                    <p><strong>Fecha inicio: ${d.fechaInicio}</strong></p>
                    <p><strong>Precio: ${d.precio}€</strong></p>
                  </div>

                  <div class="col-md-6 d-flex flex-column justify-content-between">
                    <div class="mb-3">
                      <label for="observaciones-${d.idEvento}" class="form-label">Observaciones</label>
                      <textarea class="form-control custom-input" id="observaciones-${d.idEvento}"
                        name="observaciones" rows="4"
                        placeholder="Anota tus observaciones aquí"></textarea>
                    </div>

                    <div class="row">
                      <div class="col-6">
                        <label for="cantidad-${d.idEvento}" class="form-label">Cantidad</label>
                        <select class="form-select custom-input" id="cantidad-${d.idEvento}"
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
    col2.appendChild(card);
  });
}
