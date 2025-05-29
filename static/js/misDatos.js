// ============================= VARIABLES GLOBALES =========================
// obtener el usuario
let usuario = JSON.parse(localStorage.getItem('user') || '{}');
// obtener Boton editar
let btn_edit = document.getElementById("boton-modificar");

// ============================= VARIABLES USUARIO ==========================


// ============================= VARIABELS FORMULARIO (INPUTS) ====================== 
// obtener el contenedor de formulario
let form_cont = document.getElementById("form_cont");
// obtengo inputs pre-editar
let formEmail = document.getElementById("email");
let formNombre = document.getElementById("nombre");
let formApellido_1 = document.getElementById("apellido1");
let formApellido_2 = document.getElementById("apellido2");


// =========================== FORMULARIO ANTES ===============================

renderizarFormulario();

function renderizarFormulario() {

    // declaramos variables para luego ser mas faciles de usar
    let nombre = usuario.nombre;
    let email = usuario.email;
    let apellidos = usuario.apellidos;

    let apellido1 = apellidos.split(" ")[0];
    let apellido2 = apellidos.split(" ")[1];

    console.log(apellido1);
    console.log(apellido2);

    // const apellido_1 = JSON.stringify(apellidos)[0; MIRAR SPLIT
    let nombrePerfil = usuario.perfil.nombre;
    let fechaRegistro = usuario.fechaRegistro;
    // relleno el formulario (antes de que se haga click)
    form_cont.innerHTML = " "; // limpio
    form_cont.innerHTML = `
        <form class="neomorphic-form" id="form-read">
                    <h2>Mi Informacion</h2>
                    <span class="pb-2">TIPO DE PERFIL : ${nombrePerfil}</span>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" value="${email}" placeholder="modifica el campo, no en blanco" minlength="5" readonly>
                    </div>
                    <div class="form-group">
                        <label for="nombre">Nombre</label>
                        <input type="text" id="nombre" name="nombre" value="${nombre}" readonly>
                    </div>
                    <div class="form-group">
                        <label for="apellido1">Apellido 1</label>
                        <input type="text" value="${apellido1}" name="apellido1" id="apellido1" placeholder="modifica el campo, no en blanco" minlength="2" readonly>

                        <label for="apellido1">Apellido 2</label>
                        <input type="text" value="${apellido2}" name="apellido2" id="apellido2" placeholder="modifica el campo, no en blanco" minlength="2" readonly>
                    </div>

                    <div class="form-group">
                        <label for="dob">Fecha de alta</label>
                        <input type="date" value="${fechaRegistro}" id="fechaAlta" name="fechaAlta" readonly>
                    </div>

                    <!-- <div class="form-group">
                        <label for="gender">Gender</label>
                        <select id="gender" name="gender" required>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        </select>
                    </div> -->

                    <div class="form-group">
                        <button id="boton-modificar" type="submit">MODIFICAR DATOS</button>
                    </div>
            
        </form>
        

    `;

    let form = document.getElementById("form-read");

    // ================================================== EDITAR ========================================
    // esperamos a que pulse editar
    form.addEventListener("submit", (event) => {
        // evitamos que se recargue el formulario
        event.preventDefault();
        console.log("Boton clickeado");
        // cuando pulse clic:
        form_cont.innerHTML = " "; // limpio
        // ya lo imprimimos con algunos pudiendo editarlos
        form_cont.innerHTML = `
        <form class="neomorphic-form" id="form-update">
                    <h2>Mi Informacion</h2>
                    <span class="pb-2">TIPO DE PERFIL : ${nombrePerfil}</span>
                    <div class="form-group">
                        <label for="email">Email</label>
                        <input type="email" id="email" name="email" value="${email}" placeholder="modifica el campo, no en blanco" minlength="5" required>
                    </div>
                    <div class="form-group">
                        <label for="nombre">Nombre</label>
                        <input type="text" id="nombre" name="nombre" value="${nombre}" required>
                    </div>
                    <div class="form-group">
                        <label for="apellido1">Apellido 1</label>
                        <input type="text" value="${apellido1}" name="apellido1" id="apellido1" placeholder="modifica el campo, no en blanco" minlength="2" required>

                        <label for="apellido1">Apellido 2</label>
                        <input type="text" value="${apellido2}" name="apellido2" id="apellido2" placeholder="modifica el campo, no en blanco" minlength="2" required>
                    </div>

                    <div class="form-group">
                        <label for="dob">Fecha de alta</label>
                        <input type="date" value="${fechaRegistro}" id="fechaAlta" name="fechaAlta" readonly>
                    </div>

                    <!-- <div class="form-group">
                        <label for="gender">Gender</label>
                        <select id="gender" name="gender" required>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                        </select>
                    </div> -->

                    <div class="form-group">
                        <button id="boton-modificar" type="submit">MODIFICAR DATOS</button>
                    </div>
                    <div class="form-group">
                        <button id="boton-cancelar" type="button">CANCELAR</button>
                    </div>
                    
        </form>
        `;

        let formUpdate = document.getElementById("form-update");

        let btn_cancelar = document.getElementById("boton-cancelar");

        formUpdate.addEventListener("submit", (event) => {
            // obtenemos datos del form del edit y montamos objeto
            event.preventDefault();
            const nombreActu = document.getElementById("nombre").value;
            console.log(nombreActu);

            const apellidosActu = `${document.getElementById("apellido1").value + " " + document.getElementById("apellido2").value}`;
            console.log(apellidosActu);

            const emailActu = document.getElementById("email").value;
            console.log(emailActu);

            let datosActu = {
                email: emailActu,
                nombre: nombreActu,
                apellidos: apellidosActu
            }

            console.log("objeto montado");
            console.log(datosActu);
            // fetch update
            fetch(`http://localhost:9003/usuario/actualizar/${usuario.idUsuario}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datosActu)
            }).then(response => {
                if (!response.ok) throw new Error(`HTTP error ${response.status}`);
                return response.json();
            })
                .then(data => {
                    console.log("Usuario actualizado:", data);

                    // Actualizamos el localStorage
                    localStorage.setItem('user', JSON.stringify(data));

                    // Actualizamos también la variable global usuario
                    usuario = data;

                    // Volvemos a renderizar el formulario con los nuevos datos
                    renderizarFormulario();
                })
                .catch(error => {
                    console.error("Error al actualizar el usuario:", error);
                });

        });


        btn_cancelar.addEventListener("click", () => {
            renderizarFormulario();
        });

    });
} 