//cargamos el usuario
const usuario = JSON.parse(localStorage.getItem('user') || '[]');

//identificamos el contenedor de bienvenida
const contenedorBienvenida = document.getElementById("bienvenido-saludo");
spanSaludo = document.createElement('span');

//validamos
if (usuario != null){
    spanSaludo.innerHTML=`Bienvenido/a  ${usuario.nombre}`;
} else {
    spanSaludo.innerHTML=" "; //vacio si no ha iniciado
}
contenedorBienvenida.appendChild(spanSaludo);
