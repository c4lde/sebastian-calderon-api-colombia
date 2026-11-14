const URL_DEPARTAMENTOS = "https://api-colombia.com/api/v1/Department";
const URL_REGIONES = "https://api-colombia.com/api/v1/Region";

const mensaje = document.querySelector("#mensaje");
const resumen = document.querySelector("#resumen");
const contenedor = document.querySelector("#contenedor");

function obtenerNombreRegion(regiones, idRegion) {
  for (const region of regiones) {
    if (region.id === idRegion) {
      return region.name;
    }
  }
  return "Sin región";
}

function crearTarjeta(departamento, regiones) {
  const tarjeta = document.createElement("article");
  tarjeta.classList.add("tarjeta");

  const nombre = document.createElement("h3");
  nombre.textContent = departamento.name;

  const region = document.createElement("p");
  region.textContent = `Región: ${obtenerNombreRegion(regiones, departamento.regionId)}`;

  const poblacion = document.createElement("p");
  poblacion.textContent = `Población: ${departamento.population} habitantes`;

  const superficie = document.createElement("p");
  superficie.textContent = `Superficie: ${departamento.surface} km²`;

  const descripcion = document.createElement("p");
  descripcion.classList.add("descripcion");
  descripcion.textContent = departamento.description;

  tarjeta.append(nombre, region, poblacion, superficie, descripcion);

  return tarjeta;
}

function mostrarDepartamentos(departamentos, regiones) {
  for (const departamento of departamentos) {
    const tarjeta = crearTarjeta(departamento, regiones);
    contenedor.append(tarjeta);
  }
}

function mostrarConteoPorRegion(departamentos, regiones) {
  const titulo = document.createElement("h3");
  titulo.textContent = `Departamentos por región (total: ${departamentos.length})`;

  const lista = document.createElement("ul");

  for (const region of regiones) {
    let cantidad = 0;

    for (const departamento of departamentos) {
      if (departamento.regionId === region.id) {
        cantidad++;
      }
    }

    const item = document.createElement("li");
    item.textContent = `${region.name}: ${cantidad}`;
    lista.append(item);
  }

  resumen.append(titulo, lista);
}

async function cargarDepartamentos() {
  mensaje.textContent = "Cargando departamentos...";

  const responseDepartamentos = await fetch(URL_DEPARTAMENTOS);
  const departamentos = await responseDepartamentos.json();

  const responseRegiones = await fetch(URL_REGIONES);
  const regiones = await responseRegiones.json();

  mostrarConteoPorRegion(departamentos, regiones);
  mostrarDepartamentos(departamentos, regiones);
  mensaje.textContent = "";
}

cargarDepartamentos().catch((error) => {
  mensaje.textContent = "No se pudieron cargar los departamentos. Intenta de nuevo más tarde.";
  mensaje.classList.add("error");
  console.log("ERROR:", error);
});
