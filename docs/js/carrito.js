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
