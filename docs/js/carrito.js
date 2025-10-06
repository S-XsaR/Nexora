let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Variables globales para referencias
let btnCarrito, modalCarrito, cerrarModal, listaCarrito, totalCarrito, contadorCarrito;

// Función para inicializar el carrito (llamada desde components.js)
function inicializarCarrito() {
  console.log('Inicializando carrito...');
  
  // Obtener referencias a los elementos del DOM
  btnCarrito = document.getElementById("btn-carrito");
  modalCarrito = document.getElementById("modal-carrito");
  cerrarModal = document.getElementById("cerrar-modal");
  listaCarrito = document.getElementById("lista-carrito");
  totalCarrito = document.getElementById("total-carrito");
  contadorCarrito = document.getElementById("contador-carrito");

  // Verificar que todos los elementos existen
  if (!btnCarrito || !modalCarrito || !cerrarModal || !listaCarrito || !totalCarrito || !contadorCarrito) {
    console.error('Error: No se encontraron todos los elementos del carrito');
    console.log('btnCarrito:', btnCarrito);
    console.log('modalCarrito:', modalCarrito);
    console.log('cerrarModal:', cerrarModal);
    return;
  }

  // Agregar event listeners
  btnCarrito.addEventListener("click", () => {
    modalCarrito.style.display = "block";
  });

  cerrarModal.addEventListener("click", () => {
    modalCarrito.style.display = "none";
  });

  // Cerrar modal al hacer clic fuera
  modalCarrito.addEventListener("click", (e) => {
    if (e.target === modalCarrito) {
      modalCarrito.style.display = "none";
    }
  });

  // Event listener para eliminar items
  listaCarrito.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
      const index = e.target.dataset.index;
      carrito.splice(index, 1);
      actualizarCarrito();
    }
  });

  // Actualizar UI inicial
  actualizarCarrito();
  
  console.log('✅ Carrito inicializado correctamente');
}

// Función para actualizar el carrito
function actualizarCarrito() {
  if (!listaCarrito || !totalCarrito || !contadorCarrito) {
    console.error('No se pueden actualizar elementos que no existen');
    return;
  }

  listaCarrito.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    listaCarrito.innerHTML = '<li style="text-align: center; color: #999;">El carrito está vacío</li>';
  } else {
    carrito.forEach((item, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        ${item.nombre} - ${item.precio}
        <button class="btn-eliminar" data-index="${index}">✖</button>
      `;
      listaCarrito.appendChild(li);

      total += parseFloat(item.precio.replace(/[$.]/g, "")) || 0;
    });
  }

  totalCarrito.textContent = `$${total.toLocaleString()}`;
  contadorCarrito.textContent = carrito.length;
  contadorCarrito.style.display = carrito.length > 0 ? 'inline-block' : 'none';

  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para agregar servicio al carrito
function agregarAlCarrito(servicio) {
  carrito.push(servicio);
  actualizarCarrito();
  mostrarNotificacion(`${servicio.nombre} agregado al carrito`);
}

// Notificación flotante
function mostrarNotificacion(mensaje) {
  const notificacion = document.createElement("div");
  notificacion.className = "notificacion";
  notificacion.textContent = mensaje;

  document.body.appendChild(notificacion);

  // Animación de entrada
  setTimeout(() => notificacion.classList.add("visible"), 100);

  // Animación de salida y eliminación
  setTimeout(() => {
    notificacion.classList.remove("visible");
    setTimeout(() => notificacion.remove(), 300);
  }, 2500);
}

// Exportar función para que components.js pueda llamarla
window.inicializarCarrito = inicializarCarrito;
window.agregarAlCarrito = agregarAlCarrito;