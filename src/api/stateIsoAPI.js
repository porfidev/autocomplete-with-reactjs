const isoStatesCodes = [
  {
    code: "MX-AGU",
    name: "Aguascalientes"
  },
  {
    code: "MX-BCN",
    name: "Baja California"
  },
  {
    code: "MX-BCS",
    name: "Baja California Sur"
  },
  {
    code: "MX-CAM",
    name: "Campeche"
  },
  {
    code: "MX-CHP",
    name: "Chiapas"
  },
  {
    code: "MX-CHH",
    name: "Chihuahua"
  },
  {
    code: "MX-CMX",
    name: "Ciudad de México"
  },
  {
    code: "MX-COA",
    name: "Coahuila de Zaragoza",
    variant: "Coahuila"
  },
  {
    code: "MX-COL",
    name: "Colima"
  },
  {
    code: "MX-DUR",
    name: "Durango"
  },
  {
    code: "MX-GUA",
    name: "Guanajuato"
  },
  {
    code: "MX-GRO",
    name: "Guerrero"
  },
  {
    code: "MX-HID",
    name: "Hidalgo"
  },
  {
    code: "MX-JAL",
    name: "Jalisco"
  },
  {
    code: "MX-MEX",
    name: "México"
  },
  {
    code: "MX-MIC",
    name: "Michoacán de Ocampo",
    variant: "Michoacán"
  },
  {
    code: "MX-MOR",
    name: "Morelos"
  },
  {
    code: "MX-NAY",
    name: "Nayarit"
  },
  {
    code: "MX-NLE",
    name: "Nuevo León"
  },
  {
    code: "MX-OAX",
    name: "Oaxaca"
  },
  {
    code: "MX-PUE",
    name: "Puebla"
  },
  {
    code: "MX-QUE",
    name: "Querétaro"
  },
  {
    code: "MX-ROO",
    name: "Quintana Roo"
  },
  {
    code: "MX-SLP",
    name: "San Luis Potosí"
  },
  {
    code: "MX-SIN",
    name: "Sinaloa"
  },
  {
    code: "MX-SON",
    name: "Sonora"
  },
  {
    code: "MX-TAB",
    name: "Tabasco"
  },
  {
    code: "MX-TAM",
    name: "Tamaulipas"
  },
  {
    code: "MX-TLA",
    name: "Tlaxcala"
  },
  {
    code: "MX-VER",
    name: "Veracruz de Ignacio de la Llave",
    variant: "Veracruz"
  },
  {
    code: "MX-YUC",
    name: "Yucatán"
  },
  {
    code: "MX-ZAC",
    name: "Zacatecas"
  }
];

function getRandomResolveTime() {
  const MS = 1000;
  const min = 1.2 * MS;
  const max = 6 * MS;
  return Math.floor(Math.random() * (+max - +min)) + +min;
}

export default function getAll() {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        resolve(isoStatesCodes);
      }, getRandomResolveTime());
    } catch (e) {
      console.error("UNEXPECTED ERROR: " + e);
      reject(e);
    }
  });
}
