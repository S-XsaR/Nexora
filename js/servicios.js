// js/servicios.js
async function cargarServicios() {
    try {
        const response = await fetch('../data/servicios.json');
        if (!response.ok) throw new Error('No se pudo cargar servicios.json');

        const servicios = await response.json();
        const contenedor = document.getElementById("servicios-container");
        contenedor.innerHTML = ""; // Limpiamos antes de pintar

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
        console.error("Error cargando servicios:", error);
    }
}

// Ejecutar al cargar la página
document.addEventListener("DOMContentLoaded", cargarServicios);
