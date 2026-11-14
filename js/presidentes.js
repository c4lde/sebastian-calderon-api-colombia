const URL_PRESIDENTES = "https://api-colombia.com/api/v1/President";

const mensaje = document.querySelector("#mensaje");
const contenedor = document.querySelector("#contenedor");

async function cargarPresidentes() {
  mensaje.textContent = "Cargando presidentes...";

  const response = await fetch(URL_PRESIDENTES);
  const presidentes = await response.json();

  console.log(presidentes);
  mensaje.textContent = "";
}

cargarPresidentes().catch((error) => {
  mensaje.textContent = "No se pudieron cargar los presidentes. Intenta de nuevo más tarde.";
  mensaje.classList.add("error");
  console.log("ERROR:", error);
});
