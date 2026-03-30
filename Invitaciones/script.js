const URL_SCRIPT = "https://script.google.com/macros/s/AKfycbxQUEH9LS88YqNRlBTMYL64MEFhaaszLpMTIyaM5jNC1rZg3EGo2C3C7Vz9EELVJPKdvg/exec";
const modal = document.getElementById("miModal");
const btnAbrir = document.getElementById("btnAbrir");
const btnCerrar = document.getElementById("btnCerrar");
const formulario = document.getElementById("miFormulario");

// 1. ABRIR / CERRAR MODAL
btnAbrir.onclick = () => modal.style.display = "block";
btnCerrar.onclick = () => modal.style.display = "none";

window.onclick = (e) => {
    if (e.target == modal) modal.style.display = "none";
}

// 2. ENVÍO A GOOGLE SHEETS
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const btnEnviar = document.getElementById("btnEnviar");
    const msgExito = document.getElementById("mensajeExito");
    
    btnEnviar.innerText = "ENVIANDO...";
    btnEnviar.disabled = true;

    // Capturamos el H2 de la familia
    const nombreFamilia = document.getElementById("Familia").innerText;
    
    // Preparamos datos
    const datos = new FormData(formulario);
    datos.append("familia", nombreFamilia);

    fetch(URL_SCRIPT, {
        method: 'POST',
        body: datos
    })
    .then(() => {
        btnEnviar.style.display = "none";
        msgExito.style.display = "block";
        formulario.reset();
        
        setTimeout(() => {
            modal.style.display = "none";
            btnEnviar.style.display = "block";
            btnEnviar.innerText = "ENVIAR CONFIRMACIÓN";
            btnEnviar.disabled = false;
            msgExito.style.display = "none";
        }, 3000);
    })
    .catch(error => {
        alert("Algo salió mal, por favor intenta de nuevo.");
        btnEnviar.disabled = false;
    });
});

// Lógica de la Cuenta Regresiva
const fechaBoda = new Date("Oct 24, 2026 17:00:00").getTime();

const cuentaRegresiva = setInterval(function() {
    const ahora = new Date().getTime();
    const distancia = fechaBoda - ahora;

    // Cálculos de tiempo
    const d = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const h = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distancia % (1000 * 60)) / 1000);

    // Inyectar en el HTML
    document.getElementById("dias").innerText = d;
    document.getElementById("horas").innerText = h;
    document.getElementById("minutos").innerText = m;
    document.getElementById("segundos").innerText = s;

    // Si la fecha ya pasó
    if (distancia < 0) {
        clearInterval(cuentaRegresiva);
        document.getElementById("reloj").innerHTML = "<h2>¡Hoy es el gran día!</h2>";
    }
}, 1000);