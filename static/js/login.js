const btn_enviar = document.getElementById('form');
//fetch a perfiles para validar despues
let perfiles = [];
let perfilesCargados = false;

fetch('http://localhost:9003/perfil/todos')
  .then(res => res.json())
  .then(data => {
    perfiles = data;
    perfilesCargados = true;
});
btn_enviar.addEventListener('submit', (event) =>{
    
    if (!perfilesCargados) {
        alert("Los perfiles aún no se han cargado. Intenta en un momento.");
        return;
    }

    event.preventDefault();

    //Iniciamos el objeto usuario final
    let usuarioFinal = [];
    //cargamos los datos del formulario
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const usr = {
        password: password,
        email: email
    }
    console.log("usuario provisional creado previo fetch")
    //fetch para validar
    fetch('http://localhost:9003/usuario/userLogin', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(usr)
        
    }).then(response => {
        if (!response.ok) throw new Error(`HTTP error ${response.status}`);
        return response.json();
    }).then( data => {
        console.log("usuario validado, pasamos al usuario final todo");
        console.log("🚀 Datos recibidos del backend:", data);
        //obtenemos el resultado del fetch
        usuarioFinal = data
        //guardamos el resultado del fetch en LS
        saveDataToLocalStorage(usuarioFinal);
        console.log("guardamos a localStorage");

        const perfilAdmin = perfiles[0]; // esto solo funcionará si perfiles ya está definido

        if (usuarioFinal.perfil && usuarioFinal.perfil.idPerfil === perfilAdmin.idPerfil) {
            window.location.href = "/dashboard.html";
        } else {
            window.location.href = "/vistaEventos.html";
        }

    }).catch(error => {
        console.error("Error al iniciar sesion:", error);
    });
    
    function saveDataToLocalStorage(x){       
        var receivedData = JSON.stringify(x);
        alert(receivedData);
        localStorage.setItem('user', receivedData);
    }

});

