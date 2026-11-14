const URL_DEPARTAMENTOS = "https://api-colombia.com/api/v1/Department";

const mensaje = document.querySelector("#mensaje");
const contenedor = document.querySelector("#contenedor");

function crearTarjeta(departamento) {
  const tarjeta = document.createElement("article");
  tarjeta.classList.add("tarjeta");

  const nombre = document.createElement("h3");
  nombre.textContent = departamento.name;

  const poblacion = document.createElement("p");
  poblacion.textContent = `Población: ${departamento.population} habitantes`;

  const superficie = document.createElement("p");
  superficie.textContent = `Superficie: ${departamento.surface} km²`;

  const descripcion = document.createElement("p");
  descripcion.classList.add("descripcion");
  descripcion.textContent = departamento.description;

  tarjeta.append(nombre, poblacion, superficie, descripcion);

  return tarjeta;
}

function mostrarDepartamentos(departamentos) {
  for (const departamento of departamentos) {
    const tarjeta = crearTarjeta(departamento);
    contenedor.append(tarjeta);
  }
}

async function cargarDepartamentos() {
  mensaje.textContent = "Cargando departamentos...";

  const response = await fetch(URL_DEPARTAMENTOS);
  const departamentos = await response.json();

  mostrarDepartamentos(departamentos);
  mensaje.textContent = "";
}

cargarDepartamentos().catch((error) => {
  mensaje.textContent = "No se pudieron cargar los departamentos. Intenta de nuevo más tarde.";
  mensaje.classList.add("error");
  console.log("ERROR:", error);
});
