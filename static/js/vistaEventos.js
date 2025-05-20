let reservas = [];
// fetch cargamos los datos
fetch('http://localhost:9003/evento/todos')
  .then(res => res.json())
  .then(data => {
    reservas = data;
});

const subCol1 = document.getElementById("fila-eventos-destacados").querySelector("col-6 sub-columna1-eventos");

console.log(reservas);

