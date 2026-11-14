const URL_PRESIDENTES = "https://api-colombia.com/api/v1/President";
const IMAGEN_RESPALDO = "https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg";

const IMAGENES_REEMPLAZO = {
  4: "https://upload.wikimedia.org/wikipedia/commons/7/70/Carlos_Holgu%C3%ADn_Mallarino_oleo.jpg",
  9:"https://upload.wikimedia.org/wikipedia/commons/e/ee/Museo_Nacional_-_Guillermo_Quintero_Calderon.JPG",
  17: "https://upload.wikimedia.org/wikipedia/commons/6/68/Jose_Vicente_Concha_LCCN20146960911.jpg",
  21: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Miguel_Abad%C3%ADa_M%C3%A9ndez.jpg",
  22: "https://upload.wikimedia.org/wikipedia/commons/f/f2/Enrique_Olaya_Herrera_1.jpg",
  23: "https://upload.wikimedia.org/wikipedia/commons/0/04/Alfonso_Lopez_Pumarejo.jpg",
  24: "https://upload.wikimedia.org/wikipedia/commons/f/f7/Eduardo-santos-montejo.jpg",
  25: "https://upload.wikimedia.org/wikipedia/commons/0/04/Alfonso_Lopez_Pumarejo.jpg",
  26: "https://upload.wikimedia.org/wikipedia/commons/7/72/Carlos_Lozano_y_Lozano_%28cropped%29.JPG",
  27: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Dar%C3%ADo_Echand%C3%ADa_Olaya.webp",
  28: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/Alberto_Lleras_Camargo%2C_Presidente_da_Col%C3%B4mbia.tif/lossy-page1-500px-Alberto_Lleras_Camargo%2C_Presidente_da_Col%C3%B4mbia.tif.jpg",
  29: "https://upload.wikimedia.org/wikipedia/commons/6/65/Mariano_Ospina_P%C3%A9rez.jpg",
  30: "https://upload.wikimedia.org/wikipedia/commons/b/bc/Laureano_G%C3%B3mez_%28c._1925-1926%29.jpg",
  31: "https://upload.wikimedia.org/wikipedia/commons/e/ed/Roberto_Urdaneta_Arbelaez.jpg",
  32: "https://upload.wikimedia.org/wikipedia/commons/2/27/Portrait_of_Gustavo_Rojas_Pinilla_%28cropped%29.png",
  33: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Gabriel_Par%C3%ADs%2C_1957_%28cropped%29.jpg",
  34: "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/db/Alberto_Lleras_Camargo%2C_Presidente_da_Col%C3%B4mbia.tif/lossy-page1-500px-Alberto_Lleras_Camargo%2C_Presidente_da_Col%C3%B4mbia.tif.jpg",
  37: "https://upload.wikimedia.org/wikipedia/commons/f/fe/Carlos_Lleras_Restrepo_1.jpg",
  38: "https://upload.wikimedia.org/wikipedia/commons/e/e6/Misael_Pastrana.JPG",
  40: "https://upload.wikimedia.org/wikipedia/commons/a/ae/Alfonso_L%C3%B3pez_Michelsen.png",
  42: "https://upload.wikimedia.org/wikipedia/commons/d/d4/Julio_C%C3%A9sar_Turbay_Ayala.jpg",
  44: "https://upload.wikimedia.org/wikipedia/commons/5/55/Belisario_Betancur_1985.jpg",
  45: "https://upload.wikimedia.org/wikipedia/commons/d/d5/President_Virgilio_Barco.png",
  46: "https://upload.wikimedia.org/wikipedia/commons/d/d1/C%C3%A9sar_Gaviria.jpg",
  47: "https://upload.wikimedia.org/wikipedia/commons/7/74/Ernesto_Samper.jpg",
  48: "https://upload.wikimedia.org/wikipedia/commons/7/78/Andres_Pastrana_Arango_%282001%29.jpg",
  49: "https://upload.wikimedia.org/wikipedia/commons/0/0a/Presidente_%C3%81lvaro_Uribe_V%C3%A9lez.jpg",
  50: "https://upload.wikimedia.org/wikipedia/commons/3/37/Juan_Manuel_Santos_and_Lula_%28cropped%29.jpg",
  51: "https://upload.wikimedia.org/wikipedia/commons/8/88/Iv%C3%A1n_Duque_M%C3%A1rquez_%2849610487797%29_%28cropped%29.jpg",
  52: "https://upload.wikimedia.org/wikipedia/commons/e/ef/Presidente_Gustavo_Petro_Urrego.jpg",
  53: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Colombian_Presidential_Candidate_Abelardo_de_la_Espriella_%28cropped%29.jpg"
};

const mensaje = document.querySelector("#mensaje");
const contenedor = document.querySelector("#contenedor");

function obtenerImagen(presidente) {
  if (IMAGENES_REEMPLAZO[presidente.id]) {
    return IMAGENES_REEMPLAZO[presidente.id];
  }
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

function ordenarPorAnio(presidentes) {
  presidentes.sort((a, b) => new Date(a.startPeriodDate) - new Date(b.startPeriodDate));
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

  ordenarPorAnio(presidentes);
  mostrarPresidentes(presidentes);
  mensaje.textContent = "";
}

cargarPresidentes().catch((error) => {
  mensaje.textContent = "No se pudieron cargar los presidentes. Intenta de nuevo más tarde.";
  mensaje.classList.add("error");
  console.log("ERROR:", error);
});
