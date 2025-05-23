document.addEventListener("DOMContentLoaded", function () {
    const btn_enviar = document.getElementById("submit-btn");
    let perfilUser = [];

    // Siempre que se registre un usuario va a ser como perfil, no tiene sentido que sea admin
    fetch("http://localhost:9003/perfil/uno/2")
      .then(res => res.json())
      .then(data => {
          perfilUser = data;
          
      });
    btn_enviar.addEventListener('submit', (event) => {
        event.preventDefault();

        const apellido1 = document.getElementById("apellido1");
        const apellido2 = document.getElementById("apellido2");

        const apellidosJuntos = `${apellido1}` + " " + `${apellido2}`;

        let user = {
            nombre: document.getElementById("nombre").value,
            email: documen.getElementById("email").value,
            apellidos: apellidosJuntos,
            password: document.getElementById("password").value,
        };

        fetch("http://localhost:9003/usuario/alta", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(user)
        })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log("Usuario creado:", data);
        })
        .catch(error => {
            console.error("Error al crear el usuario:", error);
        });
    });
});
