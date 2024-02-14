document.body.onload = function () {
  let linea = document.querySelector(".linea-tiempo");
  let hs = 6,
    min = "00";
  for (let i = 0; hs < 24; i++) {
    let horario = document.createElement("div");
    horario.classList.add("hora");
    horario.textContent = hs + ":" + min;
    if (i % 2 == 0) {
      min = "30";
    } else {
      min = "00";
      hs++;
    }

    linea.appendChild(horario);
  }

  const fechaActual = new Date();
  const horas = fechaActual.getHours();
  const minutos = fechaActual.getMinutes();
  document.querySelector(".marca-tiempo").style.left =
    Math.floor((horas - 6 + minutos / 60) * 300) + "px";

  // Usa la función fetch para obtener el archivo JSON
  fetch("datos.json")
    .then((response) => response.json())
    .then((data) => {
      for (let i = 0; i < 6; i++) {
        let cartelera = document.querySelectorAll(".programacion");
        data[i].forEach((element) => {
          let div = document.createElement("div");
          div.textContent = element["nombre"];
          div.style.width =
            Math.floor((element["fin"] - element["ini"]) * 300) - 5 + "px";
          div.classList.add("programa");
          if (
            element["fin"] >= horas + minutos / 60 &&
            element["ini"] <= horas + minutos / 60
          )
            div.classList.add("current");
          cartelera[i].appendChild(div);
        });
      }
    })
    .catch((error) => {
      // La solicitud falló
      console.error("Error al cargar el archivo JSON:", error);
    });
};

setInterval(() => {
  const fechaActual = new Date();
  const horas = fechaActual.getHours();
  const minutos = fechaActual.getMinutes();
  document.querySelector(".marca-tiempo").style.left =
    Math.floor((horas - 6 + minutos / 60) * 300) + "px";
}, 30000);
