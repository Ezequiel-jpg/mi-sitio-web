// --- SECCIÓN DE NOTICIAS (Solo se ejecuta si existe el contenedor) ---
const contenedorNoticias = document.getElementById("contenedor-noticias");

if (contenedorNoticias) {
    fetch("/noticia.json")
      .then(res => {
          if (!res.ok) throw new Error("No se encontró el JSON");
          return res.json();
      })
      .then(data => {
        let html = "";
        data.forEach(noticia => {
          html += `
            <article class="noticia">
              <h3>${noticia.titulo}</h3>
              <p>${noticia.contenido || noticia.descripcion}</p>
            </article>
          `;
        });
        contenedorNoticias.innerHTML = html;
      })
      .catch(err => console.error("Error al cargar noticias:", err));
}

// --- SECCIÓN DE PRESUPUESTO (Solo se ejecuta si existen los elementos) ---
document.addEventListener("DOMContentLoaded", () => {
    const producto = document.getElementById("producto");
    const plazo = document.getElementById("plazo");
    const extras = document.querySelectorAll(".extra");
    const totalDisplay = document.getElementById("precio-total");

    // Verificamos que estamos en la página de presupuesto antes de añadir listeners
    if (producto && plazo && totalDisplay) {
        
        function calcularPresupuesto() {
            let total = parseFloat(producto.value) || 0;
            
            // Sumar extras
            extras.forEach(check => {
                if (check.checked) total += parseFloat(check.value);
            });

            // Aplicar descuento por plazo (> 6 meses = 10% dto)
            const meses = parseInt(plazo.value) || 1;
            if (meses > 6) {
                total *= 0.90; 
            }

            totalDisplay.innerText = total.toFixed(2) + "€";
        }

        // Eventos para actualización automática
        producto.addEventListener("change", calcularPresupuesto);
        plazo.addEventListener("input", calcularPresupuesto);
        extras.forEach(check => {
            check.addEventListener("change", calcularPresupuesto);
        });
        
        // Cálculo inicial por si hay valores por defecto
        calcularPresupuesto();
    }
});
