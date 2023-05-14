//create clase notas with properties
class Nota {
  constructor(titulo, contenido, fechaCreacion) {
    this.titulo = titulo;
    this.contenido = contenido;
    this.fechaCreacion = fechaCreacion;
  }
}
//subclase
class NotaSimple extends Nota {
  constructor(titulo, contenido, fechaCreacion) {
    super(titulo, contenido, fechaCreacion);
  }
}
//subclase
class ListaTareas extends Nota {
  constructor(titulo, contenido, fechaCreacion, tareas) {
    super(titulo, contenido, fechaCreacion);
    this.tareas = tareas;
  }
}
//subclase
class recordatorio extends Nota {
  constructor(titulo, contenido, fechaCreacion, fechaRecordatorio) {
    super(titulo, contenido, fechaCreacion);
    this.fechaRecordatorio = fechaRecordatorio;
  }
}
//Lógica GENERAL
/*SELECTING THE FORM & DISPLAY CONTAINERS*/
const elementForm = document.querySelector("#notes_form");
const notesDIvElement = document.querySelector("#notes_section");
const notesArray = [];

/*INPUT FORM + CLICK*/
elementForm.addEventListener("submit", (e) => {
  e.preventDefault();
  crearNota();
});

//Lógica FUNCIONES
function crearNota() {
  //Obtener los valores del formulario
  const title = document.querySelector("#titleElement");
  const content = document.querySelector("#contentElement");
  const dateObj = new Date();
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const shortDate = dateObj.toLocaleDateString("en-US", options);

  //Verificar que todos los comapos de la nota estén llenos
  if (!title?.value || !content?.value) {
    return;
  }
  //crear una nueva nota
  const newNote = new NotaSimple(title.value, content.value, shortDate);
  //Agregar la nota a un array de notas
  notesArray.push(newNote);
  //Resetear contenido
  cleanView();
  //Actualizar la interfaz de usuario para mostrar la nueva nota
  renderViewNotes(notesArray);
}
//Importante: identificar la nota que se modificará con un ID
function modificarNota(notaId) {
  //Obtener la nota con el ID que proporciona
  // **const notas = cargarNotas();
  // **const notaActual = notesArray.find((nota) => nota.id === notaId);
  //Actualizar la inerfaz de usuario para mostrar los valoes actuales de la nota
  // **document.getElementById(".noteStyle");
  //traer el elemento por titulo y contenido y fecha
  //Permitir al usuario editar los valores y guradar los cambios
  //Actualizar la interfaz de usuario para reflejar los cambios
}

function guardarNotas(notas) {
  //Guardar la nota en la memoria del navegador
  localStorage.setItem("notas", JSON.stringify(notas));
  //
  //
}

const EliminarNota = (e) => {
  //Obterner la nota con el ID proporcionado
  const index = e.target.getAttribute("index");
  const position = parseInt(index);
  //Eliminar la nota del array dee notas
  notesArray.splice(position, 1);
  cleanView();
  //Actualizar la interfaz del usuario para reflejar los cambio
  renderViewNotes(notesArray);
};

//JSON:  Estructura de datos construida por objectos
// localStorage.getItem();
// localStorage.removeItem();

function cargarNotas() {
  const notasJSON = localStorage.getItem("notas");
  if (notasJSON) {
    let result = JSON.parse(notasJSON); //cambia el formato de JSON para que se pueda leer. Retorna un arreglo de objetos
    return result;
  } else {
    let result = [];
    return result;
  }
}

function cleanView() {
  notesDIvElement.innerHTML = "";
}

function renderViewNotes(notesArray) {
  notesArray.forEach((note, index) => {
    //crear componenentes de la nota
    const noteDivElement = document.createElement("div");
    const h3TitleElement = document.createElement("h3");
    const h4dateElement = document.createElement("h4");
    const contentDivElement = document.createElement("div");
    const saveBtnElement = document.createElement("button");
    const editBtnElement = document.createElement("button");
    const deleteBtnElement = document.createElement("button");
    //agregar estilos
    noteDivElement.classList.add("noteStyle");
    h3TitleElement.classList.add("titleStyle");
    h4dateElement.classList.add("dateStyle");
    contentDivElement.classList.add("contentStyle");
    saveBtnElement.classList.add("savebtn");
    editBtnElement.classList.add("editbtn");
    deleteBtnElement.classList.add("deletebtn");
    //agregar atributos indices a los botones
    saveBtnElement.setAttribute("index", index);
    editBtnElement.setAttribute("index", index);
    deleteBtnElement.setAttribute("index", index);
    console.log(saveBtnElement);
    //agregar eventos a los botones
    editBtnElement.addEventListener("click", modificarNota);
    saveBtnElement.addEventListener("click", guardarNotas);
    deleteBtnElement.addEventListener("click", EliminarNota);
    //agregar contenido a la nota
    h3TitleElement.innerHTML = note.titulo;
    contentDivElement.innerHTML = note.contenido;
    h4dateElement.innerHTML = note.fechaCreacion;
    //agregar contenido a los botones
    saveBtnElement.textContent = "Save";
    editBtnElement.textContent = "Edit";
    deleteBtnElement.textContent = "Delete";
    //agrear elementos al DOM
    notesDIvElement.appendChild(noteDivElement);
    noteDivElement.appendChild(h3TitleElement);
    noteDivElement.appendChild(h4dateElement);
    noteDivElement.appendChild(contentDivElement);
    noteDivElement.appendChild(saveBtnElement);
    noteDivElement.appendChild(editBtnElement);
    noteDivElement.appendChild(deleteBtnElement);
  });
}
