let eventos = [];
// fetch cargamos los datos
fetch('/db/datos.json')
  .then(res => res.json())
  .then(data => {
    eventos = data;
});
let eventosDestacados = eventos.filter(evento => evento.destacado == "S");
console.log(eventosDestacados);
//------------------------Trabajamos con el array olvidando el JSON
