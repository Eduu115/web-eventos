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
  const getValue = (field) =>
    document.getElementById(`${field}-${idEvento}`).value;

  fetch(`http://localhost:9003/evento/actualizar/${idEvento}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nombre: getValue("nombreAct"),
      descripcion: getValue("descripcionAct"),
      fechaInicio: getValue("fechaInicioAct"),
      duracion: getValue("duracionAct"),
      direccion: getValue("direccionAct"),
      aforoMaximo: getValue("aforoMaximoAct"),
      precio: getValue("precioAct"),
      estado: getValue("estadoAct"),
      destacado: getValue("destacadoAct"),
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json();
    })
    .then((data) => {
      console.log("Evento actualizado:", data);
      // Opcional: actualiza localmente
      const index = reservas.findIndex((r) => r.idEvento === idEvento);
      if (index !== -1) {
        reservas[index] = { ...reservas[index], ...data };
        renderizarReservas(); // re-render
      }
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
            <input id="nombreAct-${r.idEvento}" type="text" class="form-control" value="${r.nombre}">
          </p>
          <p><strong>Descripción:</strong>
            <input id="descripcionAct-${r.idEvento}" type="text" class="form-control" value="${r.descripcion}">
          </p>
          <p><strong>Fecha de Inicio:</strong>
            <input id="fechaInicioAct-${r.idEvento}" type="date" class="form-control" value="${r.fechaInicio}">
          </p>
          <p><strong>Duración:</strong>
            <input id="duracionAct-${r.idEvento}" type="text" class="form-control" value="${r.duracion}">
          </p>
          <p><strong>Dirección:</strong>
            <input id="direccionAct-${r.idEvento}" type="text" class="form-control" value="${r.direccion}">
          </p>
        </div>
        <div class="detalle-columna flex-fill">
          <p><strong>Aforo Máximo:</strong>
            <input id="aforoMaximoAct-${r.idEvento}" type="number" class="form-control" value="${r.aforoMaximo}">
          </p>
          <p><strong>Precio:</strong>
            <input id="precioAct-${r.idEvento}" type="number" class="form-control" value="${r.precio}">
          </p>
          <p><strong>Estado:</strong>
            <select id="estadoAct-${r.idEvento}" class="form-control">
              <option value="ACTIVO" ${r.estado === 'ACTIVO' ? 'selected' : ''}>ACTIVO</option>
              <option value="CANCELADO" ${r.estado === 'CANCELADO' ? 'selected' : ''}>CANCELADO</option>
              <option value="FINALIZADO" ${r.estado === 'FINALIZADO' ? 'selected' : ''}>FINALIZADO</option>
            </select>
          </p>
          <p><strong>Destacado:</strong>
            <select id="destacadoAct-${r.idEvento}" class="form-control">
              <option value="S" ${r.destacado === 'S' ? 'selected' : ''}>Sí</option>
              <option value="N" ${r.destacado === 'N' ? 'selected' : ''}>No</option>
            </select>
          </p>
        </div>
      </div>
      <div class="d-flex justify-content-center guardarEditar mt-3">
        <button id="btn-update" data-id="${r.idEvento}" class="btn btn-primary">Guardar cambios</button>
      </div>
    </div>
  </div>
  

    
    `;

    const deleteButton = col.querySelector(".btn-delete");
    deleteButton.addEventListener("click", () => eliminarReserva(r.idEvento));

    const updateButton = col.querySelector("#btn-update");
    updateButton.addEventListener("click", function(){actualizarReserva(r.idEvento); renderizarReservas();} );

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