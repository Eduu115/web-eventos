// iniciamos el array
let reservasUsuario = [];
// cargamos datos del usuario
const usuario = JSON.parse(localStorage.getItem('user') || '{}');
const idUsuario = usuario.idUsuario;
// ========================== FETCH ===============================
// fetch cargamos los datos de las reservas
fetch(`http://localhost:9003/reserva/usuario/${idUsuario}`)
  .then(res => res = res.json()) //trabajamos respuesta
  .then(data => { // procesamos los datos
    reservasUsuario = data;
    renderizarReservas();
  })
  .catch(err => console.error("Error al cargar reservas:", err));


// ============================================== FUNCIONES ==============================================

function eliminarReserva(idReserva) {
  fetch(`http://localhost:9003/reserva/eliminar/${idReserva}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(() => {
      reservasUsuario = reservasUsuario.filter((ev) => ev.idReserva !== idReserva);
      renderizarReservas();
    })
    .catch((err) => console.error("Error al eliminar:", err));
}

function actualizarReserva(idReserva) {
  fetch(`http://localhost:9003/reserva/actualizar/${idReserva}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cantidad: document.getElementById(`cantidadAct-${idReserva}`).value,
      observaciones: document.getElementById(`observacionesAct-${idReserva}`).value,
    })
  })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data) => {
      console.log("Reserva actualizada:", data);
      window.location.reload();
    })
    .catch((err) => console.error("Error al hacer update:", err));
}



// =============================================== RENDER ==================================================
function renderizarReservas() {
  //identifico constantes
  const row = document.getElementById("row-reservas");
  row.innerHTML = " "; // limpio
  reservasUsuario.forEach(r => {
    console.log(reservasUsuario);
    // declaro constantes
    let col = document.createElement("div");
    col.classList = "col-12 evento";

    console.log("col pillao")

    col.innerHTML = `
  <div class="card d-grid">
    <div class="row">
      <div class="contenedor-info col-5">
        <p>Nombre evento : ${r.evento.nombre}</p>
        <p>Cantidad : ${r.cantidad}</p>
        <p>Precio Venta : ${r.precioVenta}€</p>
        <p>Observaciones: ${r.observaciones}</p>
      </div>
      <div class="contenedor-botones col-5 d-flex justify-content-center">
        <button class="me-4 button btn-edit" data-bs-toggle="collapse" data-bs-target="#collapse-editar-${r.idReserva}" aria-expanded="false" aria-controls="collapse-editar-${r.idReserva}">Editar</button>
        <button class="me-4 button btn-delete" data-id="${r.idReserva}">Eliminar</button>
      </div>
      <div class="col-2 seccion-imagen">
        <img class="imagen-dashboard" src="${r.evento.rutaImagen}" alt="imagen-evento">
      </div>
    </div>
  </div>

  <div class="collapse mt-2" id="collapse-editar-${r.idReserva}">
    <div class="card card-body d-flex justify-content-center align-items-center ">
      <div class="evento-detalles d-flex flex-row align-items-center">
        <div>
          <label for="cantidadAct-${r.idReserva}"><strong>Cantidad: (actual: ${r.cantidad})</strong></label>
          <select class="form-select custom-input"  id="cantidadAct-${r.idReserva}" name="cantidad" required>
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
        <p><strong>Observaciones:</strong>
          <input id="observacionesAct-${r.idReserva}" type="text" class="form-control" value="${r.observaciones}">
        </p>
        <button class="btn btn-primary btn-update" data-id="${r.idReserva}">Guardar cambios</button>
      </div>
    </div>
  </div>
`;


    row.appendChild(col);

    let deleteButton = col.querySelector(".btn-delete");
    deleteButton.addEventListener("click", () => eliminarReserva(r.idReserva));

    let updateButton = col.querySelector(".btn-update");
    updateButton.addEventListener("click", function () { actualizarReserva(r.idReserva); });

  });


};