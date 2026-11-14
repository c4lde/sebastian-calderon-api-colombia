const URL_PRESIDENTES = "https://api-colombia.com/api/v1/President";
const IMAGEN_RESPALDO = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

const mensaje = document.querySelector("#mensaje");
const contenedor = document.querySelector("#contenedor");

function obtenerImagen(presidente) {
  if (presidente.image === "" || presidente.image === "null" || presidente.image === null) {
    return IMAGEN_RESPALDO;
  }
  return presidente.image;
}

function obtenerPeriodo(presidente) {
  if (presidente.endPeriodDate === null) {
    return `${presidente.startPeriodDate} - Actualidad`;
  }
  return `${presidente.startPeriodDate} - ${presidente.endPeriodDate}`;
}

function crearTarjeta(presidente) {
  const tarjeta = document.createElement("article");
  tarjeta.classList.add("tarjeta");

  const foto = document.createElement("img");
  foto.src = obtenerImagen(presidente);
  foto.alt = `Foto de ${presidente.name} ${presidente.lastName}`;
  foto.addEventListener("error", () => {
    foto.src = IMAGEN_RESPALDO;
  }, { once: true });

  const nombre = document.createElement("h3");
  nombre.textContent = `${presidente.name} ${presidente.lastName}`;

  const periodo = document.createElement("p");
  periodo.textContent = `Periodo: ${obtenerPeriodo(presidente)}`;

  const partido = document.createElement("p");
  partido.textContent = `Partido político: ${presidente.politicalParty}`;

  tarjeta.append(foto, nombre, periodo, partido);

  return tarjeta;
}

function mostrarPresidentes(presidentes) {
  for (const presidente of presidentes) {
    const tarjeta = crearTarjeta(presidente);
    contenedor.append(tarjeta);
  }
}

async function cargarPresidentes() {
  mensaje.textContent = "Cargando presidentes...";

  const response = await fetch(URL_PRESIDENTES);
  const presidentes = await response.json();

  mostrarPresidentes(presidentes);
  mensaje.textContent = "";
}

cargarPresidentes().catch((error) => {
  mensaje.textContent = "No se pudieron cargar los presidentes. Intenta de nuevo más tarde.";
  mensaje.classList.add("error");
  console.log("ERROR:", error);
});
