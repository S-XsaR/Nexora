// js/servicios.js

async function cargarServiciostabla() {
  try {
    const response = await fetch('../data/servicios.json');
    if (!response.ok) throw new Error("No se pudo cargar servicios.json");

    const servicios = await response.json();
    const tabla = document.getElementById("tabla-servicios");
    tabla.innerHTML = ""; 

    servicios.forEach(servicio => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${servicio.id}</td>
        <td>${servicio.nombre}</td>
        <td>${servicio.precio}</td>
        <td>${servicio.estado ? `<span class="badge disponible">${servicio.estado}</span>`: 'No'}</td>
        <td>${servicio.descripcion || 'Sin descripción'}</td>
        <td><button class="btn-agregar" data-id="${servicio.id}">Agregar</button></td>
      `;

      tabla.appendChild(fila);
    });

    tabla.addEventListener("click", (e) => {
      if (e.target.classList.contains("btn-agregar")) {
        const id = e.target.dataset.id;
        const servicio = servicios.find(s => s.id == id);
        agregarAlCarrito(servicio);
        mostrarNotificacion(`${servicio.nombre} agregado al carrito ✅`);
      }
    });
  } catch (error) {
    console.error("Error cargando servicios:", error);
  }
}

document.addEventListener("DOMContentLoaded", cargarServiciostabla);

