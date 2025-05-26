// ============================= VARIABLES GLOBALES =========================
// obtener el usuario
const usuario = JSON.parse(localStorage.getItem('user') || '{}');
// obtener Boton editar
let btn_edit = document.getElementById("boton-modificar");

// ============================= VARIABLES USUARIO ==========================
// declaramos variables para luego ser mas faciles de usar
const nombre = usuario.nombre;
const email = usuario.email;
const apellidos = usuario.apellidos;

const apellido1 = apellidos.split(" ")[0];
const apellido2 = apellidos.split(" ")[1];

console.log(apellido1);
console.log(apellido2);

// const apellido_1 = JSON.stringify(apellidos)[0; MIRAR SPLIT
const nombrePerfil = usuario.perfil.nombre;
const fechaRegistro = usuario.fechaRegistro;

// ============================= VARIABELS FORMULARIO (INPUTS) ====================== 
// obtener el contenedor de formulario
let form_cont = document.getElementById("form_cont");
// obtengo inputs pre-editar
const formEmail = document.getElementById("email");
const formNombre = document.getElementById("nombre");
const formApellido_1 = document.getElementById("apellido1");
const formApellido_2 = document.getElementById("apellido2");


// =========================== FORMULARIO ANTES ===============================

renderizarFormulario();

function renderizarFormulario (){
    // relleno el formulario (antes de que se haga click)
    form_cont.innerHTML=" "; // limpio
    form_cont.innerHTML= `
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
        form_cont.innerHTML= " "; // limpio
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

        formUpdate.addEventListener("submit", (event)=>{
            // fetch update
        });

        
        btn_cancelar.addEventListener("click", ()=>{
            renderizarFormulario();
        });

    });
} 
