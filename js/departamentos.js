const URL_DEPARTAMENTOS = "https://api-colombia.com/api/v1/Department";

const mensaje = document.querySelector("#mensaje");
const contenedor = document.querySelector("#contenedor");

async function cargarDepartamentos() {
  mensaje.textContent = "Cargando departamentos...";

  const response = await fetch(URL_DEPARTAMENTOS);
  const departamentos = await response.json();

  console.log(departamentos);
  mensaje.textContent = "";
}

cargarDepartamentos().catch((error) => {
  mensaje.textContent = "No se pudieron cargar los departamentos. Intenta de nuevo más tarde.";
  mensaje.classList.add("error");
  console.log("ERROR:", error);
});
