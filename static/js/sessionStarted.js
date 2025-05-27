// obtener el usuario
const usuario = JSON.parse(localStorage.getItem('user'));
// obtener datos boton 1
const cont_boton_entrar = document.getElementById("login-btn");
const cont_boton_entrar_dos = document.getElementById("contenedor-boton-inicio");

// si no es nulo
if (usuario != null || usuario != undefined){
    console.log("no es nulo");
    cont_boton_entrar.innerHTML = " "; // limpio btn 1
    // sustituir boton 1
    cont_boton_entrar.innerHTML= `
        <a href="vistaEventos.html" class="btn rounded-pill fw-bold px-5 py-2 login-btn titulos">ENTRAR <i
                            class="fa-solid fa-arrow-right-to-bracket"></i></a>
    `;
    
    cont_boton_entrar_dos.innerHTML = " "; // limpio btn 2
    // sustituir botn 2
    cont_boton_entrar_dos.innerHTML = `
        <p class="mb-0">Si vas a quedarte fuera, al menos no llores después.</p>
            <a href="vistaEventos.html" class="btn rounded-pill fw-bold px-5 py-2 login-btn titulos">ENTRAR <i class="fa-solid fa-arrow-right-to-bracket"></i></a>
    `;

 
}
