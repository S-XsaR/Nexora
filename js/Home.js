// js/home.js
async function cargarServiciosHome() {
  try {
    // Cargar el JSON
    const response = await fetch('../data/servicios.json');
    if (!response.ok) throw new Error('No se pudo cargar servicios.json');

    const servicios = await response.json();

    // Contenedor donde se van a renderizar los cards
    const contenedor = document.getElementById("servicios-container");
    contenedor.innerHTML = "";

    // Pintar los servicios en el Home
    servicios.forEach(servicio => {
      const card = document.createElement("div");
      card.classList.add("servicio-card");

      card.innerHTML = `
        <div class="servicio-image ${servicio.imagen}"></div>
        <div class="servicio-content">
          <h3>${servicio.nombre}</h3>
          <div class="precio">${servicio.precio}</div>
          ${servicio.estado ? `<div class="badge disponible">${servicio.estado}</div>` : ""}
          <p>${servicio.descripcion}</p>
        </div>
      `;

      contenedor.appendChild(card);
    });

  } catch (error) {
    console.error("Error cargando servicios en Home:", error);
  }
}

document.addEventListener("DOMContentLoaded", () => {

  cargarServiciosHome(); 

  const scroller = document.getElementById("servicios-container");
  const prevBtn = document.querySelector(".carrusel-btn.prev");
  const nextBtn = document.querySelector(".carrusel-btn.next");

  if (scroller && prevBtn && nextBtn) {
    const getStep = () => {
      const card = scroller.querySelector(".servicio-card");
      const gap = parseInt(getComputedStyle(scroller).gap || 20, 10);
      return card ? Math.round(card.getBoundingClientRect().width + gap) : 340;
    };

    prevBtn.addEventListener("click", () => {
      scroller.scrollBy({ left: -getStep(), behavior: "smooth" });
    });

    nextBtn.addEventListener("click", () => {
      scroller.scrollBy({ left: getStep(), behavior: "smooth" });
    });
  }
});


