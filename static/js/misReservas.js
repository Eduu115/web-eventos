// iniciamos el array
let reservasUsuario = [];
// cargamos datos del usuario
const usuario = JSON.parse(localStorage.getItem('user') || '{}');
// declaro constantes
const deleteButton = col.querySelector(".btn-delete");
row.appendChild(col);
// ========================= Eventos ==============================
document.addEventListener("DOMContentLoaded", ()=>{
  deleteButton.addEventListener("click", () => eliminarReserva(r.idReserva));
});

// ========================== FETCH ===============================
// fetch cargamos los datos de las reservas
fetch(``, {})
//trabajamos respuesta
.then(res => res = res.json())
// procesamos los datos
.then(
  data => {
    reservasUsuario = data;
  }
)
// trabajamos los datos
.then(

  //identifico constantes
  reservasUsuario.forEach(r =>{
    
  })
  
)
.catch();

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