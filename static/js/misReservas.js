// iniciamos el array
let reservasUsuario = [];
// cargamos datos del usuario
const usuario = JSON.parse(localStorage.getItem('user') || '{}');
// declaro constantes
const deleteButton = col.querySelector(".btn-delete");
row.appendChild(col);
// ========================= Eventos ==============================
deleteButton.addEventListener("click", () => eliminarReserva(r.idReserva));

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


 const deleteButton = col.querySelector(".btn-delete"); 
 deleteButton.addEventListener("click", () => eliminarReserva(r.idReserva));

