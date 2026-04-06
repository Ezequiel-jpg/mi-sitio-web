document.addEventListener("DOMContentLoaded", () => {

  // --- NOTICIAS ---
  const contenedorNoticias = document.getElementById("lista-noticias");

  if (contenedorNoticias) {
    fetch("./data/noticias.json")
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
              <p>${noticia.descripcion}</p>
            </article>
          `;
        });
        contenedorNoticias.innerHTML = html;
      })
      .catch(err => console.error("Error al cargar noticias:", err));
  }

  // --- PRESUPUESTO ---
  const producto = document.getElementById("producto");
  const plazo = document.getElementById("plazo");
  const extras = document.querySelectorAll(".extra");
  const totalDisplay = document.getElementById("precio-total");

  if (producto && plazo && totalDisplay) {

    function calcularPresupuesto() {
      let total = parseFloat(producto.value) || 0;

      extras.forEach(check => {
        if (check.checked) total += parseFloat(check.value);
      });

      const meses = parseInt(plazo.value) || 1;
      if (meses > 6) total *= 0.90;

      totalDisplay.innerText = total.toFixed(2) + "€";
    }

    producto.addEventListener("change", calcularPresupuesto);
    plazo.addEventListener("input", calcularPresupuesto);
    extras.forEach(check => check.addEventListener("change", calcularPresupuesto));

    calcularPresupuesto();
  }

});