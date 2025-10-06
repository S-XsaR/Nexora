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

  const botonExistente = document.getElementById("btn-checkout");
  if (botonExistente) botonExistente.remove();

  if (carrito.length > 0) {
    const btnCheckout = document.createElement("button");
    btnCheckout.id = "btn-checkout";
    btnCheckout.className = "btn-checkout";
    btnCheckout.textContent = "Finalizar compra";

    btnCheckout.addEventListener("click", () => {
      mostrarFacturaModal();
    });

    modalCarrito.querySelector(".modal-contenido").appendChild(btnCheckout);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Función para agregar servicio al carrito
function agregarAlCarrito(servicio) {
  carrito.push(servicio);
  actualizarCarrito();
  mostrarNotificacion(`${servicio.nombre} agregado al carrito`);
}

// Eliminar servicio
listaCarrito.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-eliminar")) {
    const index = e.target.dataset.index;
    carrito.splice(index, 1);
    actualizarCarrito();
  }
});

btnCarrito.addEventListener("click", () => modalCarrito.style.display = "block");
cerrarModal.addEventListener("click", () => modalCarrito.style.display = "none");

actualizarCarrito();

function mostrarNotificacion(mensaje) {
  const notificacion = document.createElement("div");
  notificacion.className = "notificacion";
  notificacion.textContent = mensaje;

  document.body.appendChild(notificacion);


  setTimeout(() => notificacion.classList.add("visible"), 100);
  setTimeout(() => {
    notificacion.classList.remove("visible");
    setTimeout(() => notificacion.remove(), 300);
  }, 2500);
}

function mostrarFacturaModal() {
  const total = totalCarrito.textContent;
  const resumen = carrito
    .map(item => `<li>${item.nombre} - ${item.precio}</li>`)
    .join("");

  const facturaModal = document.createElement("div");
  facturaModal.classList.add("factura-modal");

  facturaModal.innerHTML = `
    <div class="factura-contenido">
      <h3>🧾 Resumen de tu compra</h3>
      <ul>${resumen}</ul>
      <p class="factura-total"><strong>Total:</strong> ${total}</p>
      <p class="factura-msg">Gracias por tu compra. Este es un simulador de pago 💳</p>
      <button id="btn-cerrar-factura" class="btn-cerrar-factura">Cerrar</button>
    </div>
  `;

  document.body.appendChild(facturaModal);

  document.getElementById("btn-cerrar-factura").addEventListener("click", () => {
    facturaModal.remove();
    carrito = [];
    actualizarCarrito();
    modalCarrito.style.display = "none";
  });
}
