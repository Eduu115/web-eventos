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
.catch((err) => console.error("Error al cargar reservas:", err));


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

function editarReserva(){
  // fetch edit
}


// =============================================== RENDER ==================================================
function renderizarReservas(){
  //identifico constantes
  reservasUsuario.forEach(r =>{
    // declaro constantes
    let row = document.getElementById("row-reservas");
    console.log("boton pillao")
      row.innerHTML= " "; // limpio
      row.innerHTML = `
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

      const deleteButton = row.querySelector(".btn-delete");
      deleteButton.addEventListener("click", () => eliminarReserva(r.idReserva));

      const editButton = row.querySelector("btn-edit");
      editButton.addEventListener("click",()=>{editarReserva(idReserva)})
    })
    
};