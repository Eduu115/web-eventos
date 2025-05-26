let reservas = [];
// fetch cargamos los datos
fetch("http://localhost:9003/evento/todos")
  .then((res) => res.json())
  .then((data) => {
    reservas = data;
    renderizarReservas();
  });

function eliminarReserva(idEvento) {
  fetch(`http://localhost:9003/evento/eliminar/${idEvento}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json(); // o simplemente return;
    })
    .then(() => {
      // filtremos por el id correcto
      reservas = reservas.filter((ev) => ev.idEvento !== idEvento);
      renderizarReservas();
    })
    .catch((err) => console.error("Error al eliminar:", err));
}

function actualizarReserva(idEvento) {
  fetch(`http://localhost:9003/reserva/actualizar/${idReserva}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      cantidad: nuevaCantidad,
      observaciones: nuevasObservaciones,
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then(() => {
      // filtremos por el id correcto
      reservas = reservas.filter((ev) => ev.idEvento !== idEvento);
      renderizarReservas();
    })
    .catch((err) => console.error("Error al hacer update:", err));
}

//------------------------Trabajamos con el array olvidando el JSON
// CRUD

// 3. Renderizado en DOM
function renderizarReservas() {
  const row = document
    .getElementById("seccion-reservas")
    .querySelector(".row.g-2");
  row.innerHTML = ""; // limpio

  reservas.forEach((r) => {
    const col = document.createElement("div");
    col.className = "col-12 evento-reservado";
    col.innerHTML = `
      <div class="card d-grid">
        <div class="row">
          <div class="col-2">
            <h5 class="card-title">${r.nombre}</h5>
          </div>
          <div class="contenedor-info col-3">
            <p>id : ${r.idEvento}</p>
            <p>Estado : ${r.estado}</p>
            <p>APM : ${r.aforoMaximo}</p>
          </div>
          <div class="contenedor-botones col-5 d-flex justify-content-center">
              <button class="me-4 button btn-edit" data-bs-toggle="collapse" data-bs-target="#collapse-editar-${r.idEvento
      }" aria-expanded="false" aria-controls="collapse-editar-${r.idEvento
      }">Editar</button>
              <button class="me-4 button btn-delete" data-id="${r.idEvento
      }">Eliminar</button>
              <button class="me-4 button btn-reservas" data-id="${r.idEvento
      }">Ver reservas</button>
              <button class="me-4 button btn-view" data-bs-toggle="collapse" data-bs-target="#collapse-${r.idEvento
      }" aria-expanded="false" aria-controls="collapse-${r.idEvento
      }">Ver detalles</button>
          </div>
          <div class="col-2 seccion-imagen">
            <img class="imagen-dashboard" src="${r.rutaImagen
      }" alt="imagen-evento">
          </div>
        </div>
      </div>

      <div class="collapse" id="collapse-${r.idEvento}">
      <div class="card card-body">
        <div class="evento-detalles d-flex gap-4 flex-wrap">
          <div class="detalle-columna flex-fill">
            <p><strong>Descripción:</strong>
              <span>${r.descripcion || "Sin descripción disponible"}</span>
            </p>
            <p><strong>Fecha de Inicio:</strong> <span>${r.fechaInicio || "-"
      }</span></p>
            <p><strong>Fecha de Alta:</strong> <span>${r.fechaAlta || "-"
      }</span></p>
            <p><strong>Duración:</strong> <span>${r.duracion || "-"}</span></p>
            <p><strong>Dirección:</strong> <span>${r.direccion || "-"
      }</span></p>
          </div>
          <div class="detalle-columna flex-fill">
            <p><strong>Aforo Máximo:</strong> <span>${r.aforoMaximo || "-"
      }</span></p>
            <p><strong>Precio:</strong> <span>${r.precio || "-"}</span></p>
            <p><strong>Estado:</strong> <span>${r.estado || "-"}</span></p>
            <p><strong>Destacado:</strong> <span>${r.destacado ? "Sí" : "No"
      }</span></p>
          </div>
        </div>
      </div>
    </div>

<div class="collapse mt-2" id="collapse-editar-${r.idEvento}">
  <div class="card card-body">
    <div class="evento-detalles d-flex gap-4 flex-wrap">
      <div class="detalle-columna flex-fill">
       <p><strong>Nombre:</strong>
          <input type="text" class="form-control" value="${r.nombre}">
        </p>
        <p><strong>Descripción:</strong>
          <input type="text" class="form-control" value="${r.descripcion}">
        </p>
        <p><strong>Fecha de Inicio:</strong>
          <input type="date" class="form-control" value="${r.fechaInicio}">
        </p>
        <p><strong>Duración:</strong>
          <input type="text" class="form-control" value="${r.duracion}">
        </p>
        <p><strong>Dirección:</strong>
          <input type="text" class="form-control" value="${r.direccion}">
        </p>
      </div>
      <div class="detalle-columna flex-fill">
        <p><strong>Aforo Máximo:</strong>
          <input type="number" class="form-control" value="${r.aforoMaximo}">
        </p>
        <p><strong>Precio:</strong>
          <input type="number" class="form-control" value="${r.precio}">
        </p>
        <p><strong>Estado:</strong>
          <input type="text" class="form-control" value="${r.estado}">
        </p>
        <p><strong>Destacado:</strong>
          <select class="form-control">
            <option value="true" ${r.destacado ? "selected" : ""}>Sí</option>
            <option value="false" ${!r.destacado ? "selected" : ""}>No</option>
          </select>
        </p>
        <div class="d-flex justify-content-center guardarEditar">
                  <button class="btn btn-primary">Guardar cambios</button>

</div>

      </div>
    </div>
    
  </div>
</div>

    
    `;

    const deleteButton = col.querySelector(".btn-delete");
    deleteButton.addEventListener("click", () => eliminarReserva(r.idEvento));

    let verReservasButton = col.querySelector(".btn-reservas");
    verReservasButton.addEventListener("click", () => {
      let idEvento = r.idEvento;
      window.location.href = `verReservas.html?idEvento=${idEvento}`;
    });

    row.appendChild(col);
  });
}

// inicializar render
renderizarReservas();
