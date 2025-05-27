
// declaro el boton
const btn_logout = document.getElementById("btn-logout");
btn_logout.addEventListener("click", ()=>{
    // localStorage.clear();
    // usuario = undefined;
    localStorage.setItem('user', undefined)
    window.location.href = "index.html";
});