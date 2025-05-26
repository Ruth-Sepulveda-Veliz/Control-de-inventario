let productos = [];
let productoEditando = null;

function guardarEnLocalStorage() {
  localStorage.setItem("productos", JSON.stringify(productos));
}

function cargarDesdeLocalStorage() {
  const datos = localStorage.getItem("productos");
  if (datos) {
    productos = JSON.parse(datos);
    mostrarProductos();
  }
}

function agregarProducto() {
  const nombre = document.getElementById("nombre").value.trim();
  const cantidad = parseInt(document.getElementById("cantidad").value);
  const categoria = document.getElementById("categoria").value;
  const fechaIngreso = document.getElementById("fechaIngreso").value;
  const fechaEgreso = document.getElementById("fechaEgreso").value;
  const fechaExpiracion = document.getElementById("fechaExpiracion").value;

  if (nombre === "" || isNaN(cantidad)) {
    alert("Por favor completa todos los campos obligatorios.");
    return;
  }

  const nuevoProducto = {
    nombre,
    cantidad,
    categoria,
    fechaIngreso,
    fechaEgreso,
    fechaExpiracion
  };

  if (productoEditando !== null) {
    productos[productoEditando] = nuevoProducto;
    productoEditando = null;
    document.getElementById("btn-agregar").textContent = "Agregar";
  } else {
    productos.push(nuevoProducto);
  }

  guardarEnLocalStorage();
  mostrarProductos();
  limpiarFormulario();
}

function mostrarProductos() {
  const tabla = document.getElementById("tabla-productos");
  tabla.innerHTML = "";

  productos.forEach((prod, index) => {
    const fila = `
      <tr>
        <td>${prod.nombre}</td>
        <td>${prod.cantidad}</td>
        <td>${prod.categoria}</td>
        <td>${prod.fechaIngreso}</td>
        <td>${prod.fechaEgreso}</td>
        <td>${prod.fechaExpiracion}</td>
        <td>
          <button onclick="editarProducto(${index})">Editar</button>
          <button onclick="eliminarProducto(${index})">Eliminar</button>
        </td>
      </tr>
    `;
    tabla.innerHTML += fila;
  });
}

function editarProducto(index) {
  const prod = productos[index];
  document.getElementById("nombre").value = prod.nombre;
  document.getElementById("cantidad").value = prod.cantidad;
  document.getElementById("categoria").value = prod.categoria;
  document.getElementById("fechaIngreso").value = prod.fechaIngreso;
  document.getElementById("fechaEgreso").value = prod.fechaEgreso;
  document.getElementById("fechaExpiracion").value = prod.fechaExpiracion;

  productoEditando = index;
  document.getElementById("btn-agregar").textContent = "Guardar Cambios";
}

function eliminarProducto(index) {
  productos.splice(index, 1);
  guardarEnLocalStorage();
  mostrarProductos();
}

function buscarProducto() {
  const texto = document.getElementById("buscador").value.toLowerCase();
  const filas = document.querySelectorAll("#tabla-productos tr");

  filas.forEach(fila => {
    const nombre = fila.children[0].textContent.toLowerCase();
    fila.style.display = nombre.includes(texto) ? "" : "none";
  });
}

function limpiarFormulario() {
  document.getElementById("nombre").value = "";
  document.getElementById("cantidad").value = "";
  document.getElementById("categoria").value = "";
  document.getElementById("fechaIngreso").value = "";
  document.getElementById("fechaEgreso").value = "";
  document.getElementById("fechaExpiracion").value = "";
}

cargarDesdeLocalStorage();
