let reservas = [];
// fetch cargamos los datos
fetch("http://localhost:9003/reserva/todos")
    .then((res) => res.json())
    .then((data) => {
        reservas = data;
        renderizarReservas();
    });

function eliminarReserva(idReserva) {
    fetch(`http://localhost:9003/reserva/eliminar/${idReserva}`, {
        method: "DELETE",
    })
        .then((res) => {
            if (!res.ok) throw new Error(`HTTP ${res.status}`);
            return res.json();
        })
        .then(() => {
            reservas = reservas.filter((ev) => ev.idReserva !== idReserva);
            renderizarReservas();
        })
        .catch((err) => console.error("Error al eliminar:", err));
}

function actualizarReserva(idEvento, nuevaCantidad, nuevasObservaciones) {
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

function renderizarReservas() {
    const row = document
        .getElementById("seccion-reservas")
        .querySelector(".row.g-2");
    row.innerHTML = "";

    reservas.forEach((r) => {
        const col = document.createElement("div");
        col.className = "col-12 evento-reservado";
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
              <button class="me-4 button btn-edit" data-bs-toggle="collapse" data-bs-target="#collapse-editar-${r.idReserva
            }" aria-expanded="false" aria-controls="collapse-editar-${r.idReserva
            }">Editar</button>
              <button class="me-4 button btn-delete" data-id="${r.idReserva
            }">Eliminar</button>
          </div>
          <div class="col-2 seccion-imagen">
            <img class="imagen-dashboard" src="${r.evento.rutaImagen
            }" alt="imagen-evento">
          </div>
        </div>
      </div>


<div class="collapse mt-2" id="collapse-editar-${r.idReserva}">
  <div class="card card-body d-flex justify-content-center align-items-center ">
    <div class="evento-detalles d-flex flex-row align-items-center">
      <p><strong>Cantidad:</strong>
          <input type="text" class="form-control" value="${r.cantidad}">
        </p>
        <p><strong>Observaciones:</strong>
          <input type="text" class="form-control" value="${r.observaciones}">
        </p>
        <button class="btn btn-primary">Guardar cambios</button>
    </div>
    
  </div>
</div>
    `;

        const deleteButton = col.querySelector(".btn-delete");
        deleteButton.addEventListener("click", () => eliminarReserva(r.idReserva));

        row.appendChild(col);
    });
}
