// Limpia el mensaje de error antes de validar
function limpiarErrores() {
    const error = document.getElementById("error-form");
    if (error) error.textContent = "";
}

// Muestra un mensaje de error en el formulario
function mostrarError(mensaje) {
    const error = document.getElementById("error-form");
    if (error) {
        error.textContent = mensaje;
        error.style.color = "red";
    }
}

// Validación del formulario
function validarFormulario() {
    const nombre = document.getElementById("nombre").value;
    const apellido = document.getElementById("apellido").value;
    const telefono = document.getElementById("telefono").value;
    const privacidad = document.getElementById("privacidad").checked;

    // Validaciones JavaScript (Requisitos del PDF)
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,15}$/.test(nombre)) {
        alert("Nombre: solo letras y máximo 15 caracteres");
        return false;
    }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,40}$/.test(apellido)) {
        alert("Apellido: solo letras y máximo 40 caracteres");
        return false;
    }
    if (!/^[0-9]{1,9}$/.test(telefono)) {
        alert("Teléfono: solo números y máximo 9 dígitos");
        return false;
    }
    if (!privacidad) {
        alert("Debe aceptar las condiciones de privacidad");
        return false;
    }

    alert("Formulario enviado correctamente");
    return true;
}


// Cálculo del presupuesto
function calcular() {
    const web = document.getElementById("web").checked;
    const seo = document.getElementById("seo").checked;
    const mantenimiento = document.getElementById("mantenimiento").checked;

    const precio =
        (web ? 300 : 0) +
        (seo ? 150 : 0) +
        (mantenimiento ? 100 : 0);

    const resultado = document.getElementById("precio-total");
    if (resultado) {
        resultado.textContent = `Total: ${precio}€`;
        resultado.style.color = "black";
    }
}


async function cargarNoticias() {
    try {
        const respuesta = await fetch("../data/noticia.json");
        const noticias = await respuesta.json();

        // Ordenar por fecha descendente
        noticias.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        const contenedor = document.getElementById("lista-noticias");
        contenedor.innerHTML = "";

        noticias.forEach(noticia => {
            const item = document.createElement("div");
            item.classList.add("noticia");

            item.innerHTML = `
                <h3>${noticia.titulo}</h3>
                <p>${noticia.descripcion}</p>
                <span class="fecha">${new Date(noticia.fecha).toLocaleDateString()}</span>
            `;

            contenedor.appendChild(item);
        });

    } catch (error) {
        console.error("Error cargando noticias:", error);
    }
}

document.addEventListener("DOMContentLoaded", cargarNoticias);
