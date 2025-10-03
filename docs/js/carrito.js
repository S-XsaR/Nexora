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
