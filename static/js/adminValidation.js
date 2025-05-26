// iniciamos perfil admin
fetch('http://localhost:9003/perfil/uno/1')
  .then(res => res.json())
  .then(data => {
    const perfilAdmin = data;
    console.log("Perfil admin:", perfilAdmin);

    // cargamos el usuario de localStorage
    const usuario = JSON.parse(localStorage.getItem('user') || '{}');
    console.log("Usuario LS:", usuario);

    const link = document.getElementById("admin-link");

    // validamos si el perfil coincide
    if (usuario.perfil && usuario.perfil.idPerfil === perfilAdmin.idPerfil) {
      link.innerHTML = `Admin dashboard <i class="fa-solid fa-up-right-from-square"></i>`;
    } else {
      link.innerHTML = "";
    }
  })
  .catch(error => {
    console.error("Error al cargar perfiles:", error);
  });

