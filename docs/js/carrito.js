let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Referencias
const btnCarrito = document.getElementById("btn-carrito");
const modalCarrito = document.getElementById("modal-carrito");
const cerrarModal = document.getElementById("cerrar-modal");
const listaCarrito = document.getElementById("lista-carrito");
const totalCarrito = document.getElementById("total-carrito");
const contadorCarrito = document.getElementById("contador-carrito");

function actualizarCarrito() {
  listaCarrito.innerHTML = "";
  let total = 0;

  carrito.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      ${item.nombre} - ${item.precio}
      <button class="btn-eliminar" data-index="${index}">❌</button>
    `;
    listaCarrito.appendChild(li);

    total += parseFloat(item.precio.replace(/[$.]/g, "")) || 0;
  });

  totalCarrito.textContent = `$${total.toLocaleString()}`;
  contadorCarrito.textContent = carrito.length;

  // Agregar botón de checkout si hay elementos
  const botonExistente = document.getElementById("btn-checkout");
  if (botonExistente) botonExistente.remove(); // evitar duplicados

  if (carrito.length > 0) {
    const btnCheckout = document.createElement("button");
    btnCheckout.id = "btn-checkout";
    btnCheckout.className = "btn-checkout";
    btnCheckout.textContent = "Finalizar compra";

    // Evento para simular pago
    btnCheckout.addEventListener("click", () => {
      const resumen = carrito.map(item => `- ${item.nombre} (${item.precio})`).join('\n');
      alert(`🧾 Resumen de compra:\n\n${resumen}\n\nTotal: ${totalCarrito.textContent}\n\n✅ ¡Gracias por tu compra (simulada)!`);
      
      carrito = [];
      actualizarCarrito();
      modalCarrito.style.display = "none";
    });

    // Insertar el botón al final del modal
    modalCarrito.querySelector(".modal-contenido").appendChild(btnCheckout);
  }

  localStorage.setItem("carrito", JSON.stringify(carrito));
}

// Agregar servicio
function agregarAlCarrito(servicio) {
  carrito.push(servicio);
  actualizarCarrito();
}

// Eliminar servicio
listaCarrito.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-eliminar")) {
    const index = e.target.dataset.index;
    carrito.splice(index, 1);
    actualizarCarrito();
  }
});

// Mostrar / Ocultar modal
btnCarrito.addEventListener("click", () => modalCarrito.style.display = "block");
cerrarModal.addEventListener("click", () => modalCarrito.style.display = "none");

// Inicializar
actualizarCarrito();


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
