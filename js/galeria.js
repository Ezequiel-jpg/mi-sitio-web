function cambiarImagen(ruta) {
    document.getElementById("imagen-principal").src = ruta;
}
// Base de datos de imágenes por categoría
const imagenes = [
  // HARDWARE
  { categoria: "hardware", src: "../assets/images/hardware-1.jpg" },
  { categoria: "hardware", src: "../assets/images/hardware-2.jpg" },
  { categoria: "hardware", src: "../assets/images/hardware-3.jpg" },

  // SOFTWARE
  { categoria: "software", src: "../assets/images/software-1.webp" },
  { categoria: "software", src: "../assets/images/software-2.jpg" },
  { categoria: "software", src: "../assets/images/software-3.webp" },

  // IA
  { categoria: "ia", src: "../assets/images/ia-1.avif" },
  { categoria: "ia", src: "../assets/images/ia-2.avif" },
  { categoria: "ia", src: "../assets/images/ia-3.avif" },

  // ROBÓTICA
  { categoria: "robotica", src: "../assets/images/robotica-1.avif" },
  { categoria: "robotica", src: "../assets/images/robotica-2.avif" },
  { categoria: "robotica", src: "../assets/images/robotica-3.avif" }
];

const galeria = document.getElementById("galeria");
const filtros = document.querySelectorAll(".filtro");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

// Mostrar imágenes según categoría
function mostrarImagenes(categoria) {
  galeria.innerHTML = "";

  const filtradas = categoria === "todos"
    ? imagenes
    : imagenes.filter(img => img.categoria === categoria);

  filtradas.forEach(img => {
    const elemento = document.createElement("img");
    elemento.src = img.src;
    elemento.classList.add("miniatura");
    elemento.onclick = () => {
      lightboxImg.src = img.src;
      lightbox.style.display = "flex";
    };
    galeria.appendChild(elemento);
  });
}

// Activar filtros
filtros.forEach(boton => {
  boton.addEventListener("click", () => {
    document.querySelector(".filtro.activo").classList.remove("activo");
    boton.classList.add("activo");
    mostrarImagenes(boton.dataset.categoria);
    

  });
});
lightbox.onclick = () => lightbox.style.display = "none";

mostrarImagenes("todos");