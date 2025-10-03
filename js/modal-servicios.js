// Modificar el archivo home.js - reemplazar completamente
async function cargarServiciosHome() {
  try {
    const response = await fetch('../data/servicios.json');
    if (!response.ok) throw new Error('No se pudo cargar servicios.json');

    const servicios = await response.json();
    const contenedor = document.getElementById("servicios-container");
    contenedor.innerHTML = "";

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

      // Agregar evento click para abrir modal
      card.addEventListener('click', () => {
        abrirModalServicio(servicio);
      });

      contenedor.appendChild(card);
    });

  } catch (error) {
    console.error("Error cargando servicios en Home:", error);
  }
}

// Función para abrir el modal
function abrirModalServicio(servicio) {
  const modal = document.getElementById('modal-servicio');
  
  // Actualizar contenido
  document.getElementById('modal-titulo').textContent = servicio.nombre;
  document.getElementById('modal-precio').textContent = servicio.precio;
  document.getElementById('modal-descripcion').textContent = servicio.descripcion;
  document.getElementById('modal-detalles').textContent = servicio.detalles;
  
  
  // Imagen
  const imagen = document.getElementById('modal-imagen');
  imagen.className = `modal-servicio-imagen ${servicio.imagen}`;
  
  // Estado
  const estadoElement = document.getElementById('modal-estado');
  if (servicio.estado) {
    estadoElement.textContent = servicio.estado;
    estadoElement.style.display = 'inline-block';
  } else {
    estadoElement.style.display = 'none';
  }
  
  // Mostrar modal
  modal.classList.add('show');
  document.body.style.overflow = 'hidden';
  
  // Guardar servicio actual para el botón de agregar
  modal.dataset.servicioActual = JSON.stringify(servicio);
}

// Función para cerrar el modal
function cerrarModalServicio() {
  const modal = document.getElementById('modal-servicio');
  modal.classList.remove('show');
  document.body.style.overflow = '';
}

document.addEventListener("DOMContentLoaded", () => {
  // Cargar servicios
  cargarServiciosHome();

  // Event listeners para el modal
  const modal = document.getElementById('modal-servicio');
  const btnCerrar = document.getElementById('cerrar-modal');
  const btnCerrarModal = document.getElementById('btn-cerrar-modal');
  const btnAgregar = document.getElementById('btn-agregar');

  // Cerrar modal
  btnCerrar?.addEventListener('click', cerrarModalServicio);
  btnCerrarModal?.addEventListener('click', cerrarModalServicio);

  // Cerrar al hacer clic fuera
  modal?.addEventListener('click', (e) => {
    if (e.target === modal) {
      cerrarModalServicio();
    }
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal?.classList.contains('show')) {
      cerrarModalServicio();
    }
  });

  // Agregar al carrito
  btnAgregar?.addEventListener('click', () => {
    const servicioData = modal.dataset.servicioActual;
    if (servicioData && window.agregarAlCarrito) {
      const servicio = JSON.parse(servicioData);
      window.agregarAlCarrito(servicio);
      cerrarModalServicio();
    }
  });

  // Carrusel (mantener funcionalidad existente)
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