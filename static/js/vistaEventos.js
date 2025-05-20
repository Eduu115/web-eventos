let eventos = [];
// fetch cargamos los datos
fetch('http://localhost:9003/evento/todos')
  .then(res => res.json())
  .then(data => {
    eventos = data;
});
console.log(eventos);

