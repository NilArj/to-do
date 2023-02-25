const fecha = document.getElementById("fecha");
const lista = document.getElementById("lista");
const input = document.getElementById("input");
const btnEnter = document.getElementById("enter");
const check = "checkmark-circle";
const uncheck = "uncheckmark-circle";
const lineThrough = "line-through";
let id;
let listaTarea;

// creacion de fecha
const fechaSistema = new Date();
fecha.innerText = fechaSistema.toLocaleDateString("es-MX", {
  weekday: "long",
  month: "short",
  day: "numeric",
  year: "numeric",
});

/// Obtener tareas
// con click
btnEnter.addEventListener("click", () => {
  const tarea = input.value;
  if (tarea) {
    agregarTarea(tarea, id, false, false);
    listaTarea.push({
      nombre: tarea,
      id: id,
      realizado: false,
      eliminado: false,
    });
  }
  localStorage.setItem("TODO", JSON.stringify(listaTarea));
  input.value = "";
  id++;
});

// con enter
document.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    const tarea = input.value;
    if (tarea) {
      agregarTarea(tarea, id, false, false);
      listaTarea.push({
        nombre: tarea,
        id: id,
        realizado: false,
        eliminado: false,
      });
    }
    localStorage.setItem("TODO", JSON.stringify(listaTarea));
    input.value = "";
    id++;
  }
});

/// Agregar  tarea
function agregarTarea(tarea, id, realizado, eliminado) {
  if (eliminado) {
    return;
  }

  const tareaRealizada = realizado ? check : uncheck;
  const lineaTarea = realizado ? lineThrough : "";

  const elemento = `
<li id="elemento">
    <ion-icon class="circulo ${tareaRealizada}" id=${id} data="realizado" name="ellipse-outline" ></ion-icon>
    <p class="text ${lineaTarea}"> ${tarea} </p>
    <ion-icon class="delete" data="eliminado" id=${id} name="trash-outline"></ion-icon>
</li>
    `;
  lista.insertAdjacentHTML("beforeend", elemento);
}

/// Control tareas
lista.addEventListener("click", function (event) {
  const element = event.target;
  const elementData = element.attributes.data.value;

  if (elementData === "realizado") {
    tareaHecha(element);
  } else if (elementData === "eliminado") {
    tareaEliminada(element);
  }

  localStorage.setItem("TODO", JSON.stringify(listaTarea));
});

function tareaHecha(element) {
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(lineThrough);
  listaTarea[element.id].realizado = listaTarea[element.id].realizado
    ? false
    : true;
}

function tareaEliminada(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  listaTarea[element.id].eliminado = true;
}

// Obtener data del storage

let data = localStorage.getItem("TODO");
if (data) {
  listaTarea = JSON.parse(data);
  id = lista.length;
  cargarLista(listaTarea);
} else {
  listaTarea = [];
  id = 0;
}

function cargarLista(data) {
  data.forEach((i) => {
    agregarTarea(i.nombre, i.id, i.realizado, i.eliminado);
  });
}
