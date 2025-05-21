let eventos = [];
let destacados = [];
let activosNoD = [];
let soldOut = [];
// fetch GENERAL
fetch('http://localhost:9003/evento/todos')
  .then(res => res.json())
  .then(data => {
    eventos = data;
});

// fetch filtrado por dest
fetch('http://localhost:9003/evento/activoAndDestacado/S')
  .then(res => res.json())
  .then(data =>{
    destacados = data;
  });
// fetch filtrado por act
fetch('http://localhost:9003/evento/activoAndDestacado/N')
  .then(res => res.json())
  .then(data =>{
    activosNoD = data;
  });
// fetch filtrado por sold-out
fetch('http://localhost:9003/evento/estado/TERMINADO')
.then(res => res.json())
.then(data => {
  soldOut = data;
});

// Destacados 1
function renderEventosD1(){

}
// Destacados 2
function renderEventosD2(){

}
// Activos 1
function renderEventosA1(){

}
// Activos 2
function renderEventosA2(){

}
// Sold-out 1
function renderEventosE1(){

}
// Sold-out 2
function renderEventosE2(){

}

console.log(reservas);

