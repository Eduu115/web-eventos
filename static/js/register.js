document.addEventListener("DOMContentLoaded", function () {
    const form_enviar = document.getElementById("form");

    form_enviar.addEventListener('submit', (event) => {
        event.preventDefault();
        console.log("hola");
        const apellido1 = document.getElementById("apellido1").value;
        const apellido2 = document.getElementById("apellido2").value;

        let apellidosJuntos = `${apellido1} ${apellido2}`;

        let user = {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            nombre: document.getElementById("nombre").value,
            apellidos: apellidosJuntos
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
