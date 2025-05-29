document.addEventListener("DOMContentLoaded", function () {
    const btn_enviar = document.getElementById("enviar");
    const formulario = document.getElementById('form');
    let tipos = [];

    // Cargamos los tipos de evento
    fetch("http://localhost:9003/tipo/todos")
      .then(res => res.json())
      .then(data => {
          tipos = data;
      });

    formulario.addEventListener('submit', (event) => {
        event.preventDefault();

        let seleccionado = (document.getElementById("tipo").value === "CONCIERTO") ? 0 : 1;
        let seleccionadoTipo = tipos[seleccionado];

        const datos = {
            nombre: document.getElementById("nombre").value,
            descripcion: document.getElementById("descripcion").value,
            fechaInicio: document.getElementById("fechaInicio").value,
            duracion: document.getElementById("duracion").value,
            direccion: document.getElementById("direccion").value,
            aforo: document.getElementById("aforo").value,
            precio: document.getElementById("precio").value,
            estado: document.getElementById("estado").value,
            fechaAlta: document.getElementById("fechaAlta").value,
            tipo: seleccionadoTipo
        };
        console.log(datos);
        fetch("http://localhost:9003/evento/crearEvento", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(datos)
        })
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error ${response.status}`);
            return response.json();
        })
        .then(data => {
            console.log("Evento creado:", data);
        })
        .catch(error => {
            console.error("Error al crear el evento:", error);
        });
    });
});
