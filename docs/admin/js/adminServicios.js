let servicios = [];
let editandoId = null;

document.addEventListener("DOMContentLoaded", async () => {
  const tbody = document.querySelector("tbody");
  const form = document.getElementById("formServicio");

  // Cargar servicios desde JSON
  try {
    const response = await fetch("../data/servicios.json");
    if (!response.ok) throw new Error("No se pudo cargar servicios.json");
    servicios = await response.json();
    renderTabla();
  } catch (error) {
    tbody.innerHTML = `<tr><td colspan="6">Error cargando servicios</td></tr>`;
    console.error(error);
  }

  // Renderizar tabla
  function renderTabla() {
    tbody.innerHTML = "";
    servicios.forEach((servicio) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${servicio.id}</td>
        <td>${servicio.nombre}</td>
        <td>${servicio.precio}</td>
        <td>${servicio.cantidad || "-"}</td>
        <td>${servicio.estado ? '<span class="oferta">Sí</span>' : "No"}</td>
        <td>
          <button class="btn-table edit" data-id="${
            servicio.id
          }">Editar</button>
          <button class="btn-table delete" data-id="${
            servicio.id
          }">Eliminar</button>
        </td>
      `;
      tbody.appendChild(tr);
    });
  }

  // Eliminar servicio
  tbody.addEventListener("click", (e) => {
    if (e.target.classList.contains("delete")) {
      const id = Number(e.target.dataset.id);
      servicios = servicios.filter((s) => s.id !== id);
      renderTabla();
    }

    // Editar servicio
    if (e.target.classList.contains("edit")) {
      const id = Number(e.target.dataset.id);
      const servicio = servicios.find((s) => s.id === id);
      if (servicio) {
        form.nombre.value = servicio.nombre;
        form.precio.value = servicio.precio.replace(/\D/g, "");
        form.cantidad.value = servicio.cantidad || "";
        form.descripcion.value = servicio.descripcion || "";
        form.promocion.checked = !!servicio.estado;
        editandoId = id;
      }
    }
  });

  // Guardar servicio (nuevo o editado)
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const nuevoServicio = {
      id:
        editandoId ||
        (servicios.length ? Math.max(...servicios.map((s) => s.id)) + 1 : 1),
      nombre: data.get("nombre"),
      precio: `$${data.get("precio")}`,
      cantidad: data.get("cantidad"),
      descripcion: data.get("descripcion"),
      estado: data.get("promocion") ? "En Oferta" : "",
    };

    if (editandoId) {
      // Editar existente
      servicios = servicios.map((s) =>
        s.id === editandoId ? nuevoServicio : s
      );
      editandoId = null;
    } else {
      // Agregar nuevo
      servicios.push(nuevoServicio);
    }
    form.reset();
    renderTabla();
  });

  // Limpiar formulario y cancelar edición
  form.addEventListener("reset", () => {
    editandoId = null;
  });

  const searchBar = document.querySelector(".search-bar");

  searchBar.addEventListener("input", function () {
    const texto = this.value.toLowerCase();
    const serviciosFiltrados = servicios.filter(
      (s) =>
        s.nombre.toLowerCase().includes(texto) ||
        (s.descripcion && s.descripcion.toLowerCase().includes(texto))
    );
    renderTabla(serviciosFiltrados);
  });

  // Modifica renderTabla para aceptar un parámetro opcional
  function renderTabla(lista = servicios) {
    tbody.innerHTML = "";
    lista.forEach((servicio) => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${servicio.id}</td>
        <td>${servicio.nombre}</td>
        <td>${servicio.precio}</td>
        <td>${servicio.cantidad || "-"}</td>
        <td>${servicio.estado ? '<span class="oferta">Sí</span>' : "No"}</td>
        <td>
            <button class="btn-table edit" data-id="${
              servicio.id
            }">Editar</button>
            <button class="btn-table delete" data-id="${
              servicio.id
            }">Eliminar</button>
        </td>
        `;
      tbody.appendChild(tr);
    });
  }
});
