//create clase notas with properties
class Nota {
  constructor(id, titulo, contenido, fechaCreacion) {
    this.id = id;
    this.titulo = titulo;
    this.contenido = contenido;
    this.fechaCreacion = fechaCreacion;
  }
}
//subclase
class NotaSimple extends Nota {
  constructor(id, titulo, contenido, fechaCreacion) {
    super(id, titulo, contenido, fechaCreacion);
  }
}
//Lógica GENERAL
/*SELECTING THE FORM & DISPLAY CONTAINERS*/
const elementForm = document.querySelector("#notes_form");
const notesDIvElement = document.querySelector("#notes_section");
// const notesArray = [];

/*INPUT FORM + CLICK*/
elementForm.addEventListener("submit", (e) => {
  e.preventDefault();
  crearNota();
});

//Lógica FUNCIONES
function crearNota() {
  //Crear un objeto JSON en el localStorage y llamarlo para usarlo (agregar, eliminar, editar, elementos a él)
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    notesArray = [];
  } else {
    notesArray = JSON.parse(notes);
  }
  //Obtener los valores del formulario
  const id = notesArray.length;
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
  const newNote = new NotaSimple(id, title.value, content.value, shortDate);
  //Agregar la nota a un array de notas
  notesArray.push(newNote);
  //Guardar nota en Local Storage
  localStorage.setItem("notes", JSON.stringify(notesArray));
  //limpiar el formulario
  title.value = "";
  content.value = "";
  //Resetear contenido
  cleanView();
  //Actualizar la interfaz de usuario para mostrar la nueva nota
  renderViewNotes();
  console.log(notesArray);
}

const EliminarNota = (e) => {
  //Llamar al arreglo de notas almacenado en localStorage
  let notes = localStorage.getItem("notes");
  if (notes === null) {
    notesArray = [];
  } else {
    notesArray = JSON.parse(notes);
  }
  //Obterner la nota con el ID proporcionado
  const index = e.target.getAttribute("index");
  const position = parseInt(index);
  //Eliminar la nota del array dee notas
  notesArray.splice(position, 1);
  cleanView();
  //Guardar notas en memoria
  localStorage.setItem("notes", JSON.stringify(notesArray));
  //Actualizar la interfaz del usuario para reflejar los cambio
  renderViewNotes();
};

function modificarNota(e) {
  //Obterner la nota con el ID proporcionado
  let button = e.target;
  let textArea = button.previousElementSibling;
  let title =
    button.previousElementSibling.previousElementSibling.previousElementSibling;
  //Llamar al arreglo de notas almacenado en localStorage
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesArray = [];
  } else {
    notesArray = JSON.parse(notes);
  }
  console.log(notesArray);
  //MODIFICANDO EL CONTENIDO DE LA NOTA
  if (button.innerText.toLocaleLowerCase() === "edit") {
    title.contentEditable = true;
    title.style.color = "#8a5cf6e0";
    textArea.removeAttribute("readonly");
    textArea.focus();
    textArea.style.color = "#8a5cf6e0";
    button.innerHTML = "Save";
  } else {
    title.contentEditable = false;
    title.style.color = "black";
    textArea.setAttribute("readonly", "readonly");
    textArea.style.color = "black";
    button.innerHTML = "Edit";
  }
  //SELECCIONANDO LA NOTA QUE SERÁ EDITADA
  const currentNote = notesArray.find((el) => {
    return el.id === Number(button.getAttribute("index"));
  });
  //GUARDANDO EL CONTENIDO MODIFICADO EN LA NOTA DEL OBJETO NOTESARRAY
  currentNote.titulo = title.innerHTML;
  currentNote.contenido = textArea.value;
  localStorage.setItem("notes", JSON.stringify(notesArray));
}

function cleanView() {
  notesDIvElement.innerHTML = "";
}

function renderViewNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesArray = [];
  } else {
    notesArray = JSON.parse(notes);
  }
  notesArray.forEach((note, index) => {
    //crear componenentes de la nota
    const noteDivElement = document.createElement("div");
    const h3TitleElement = document.createElement("h3");
    const h4dateElement = document.createElement("h4");
    const contentDivElement = document.createElement("textarea");
    const editBtnElement = document.createElement("button");
    const deleteBtnElement = document.createElement("button");
    //agregar estilos
    noteDivElement.classList.add("noteStyle");
    h3TitleElement.classList.add("titleStyle");
    h4dateElement.classList.add("dateStyle");
    contentDivElement.classList.add("contentStyle");
    editBtnElement.classList.add("editbtn");
    deleteBtnElement.classList.add("deletebtn");
    //agregar atributos indices a los botones
    editBtnElement.setAttribute("index", index);
    deleteBtnElement.setAttribute("index", index);
    contentDivElement.setAttribute("readonly", "readonly");
    //agregar eventos a los botones
    editBtnElement.addEventListener("click", modificarNota);
    deleteBtnElement.addEventListener("click", EliminarNota);
    //agregar contenido a la nota
    h3TitleElement.innerHTML = note.titulo;
    contentDivElement.value = note.contenido;
    h4dateElement.innerHTML = note.fechaCreacion;
    //agregar contenido a los botones
    editBtnElement.textContent = "Edit";
    deleteBtnElement.textContent = "Delete";
    //agrear elementos al DOM
    notesDIvElement.appendChild(noteDivElement);
    noteDivElement.appendChild(h3TitleElement);
    noteDivElement.appendChild(h4dateElement);
    noteDivElement.appendChild(contentDivElement);
    noteDivElement.appendChild(editBtnElement);
    noteDivElement.appendChild(deleteBtnElement);
  });
}
renderViewNotes();

//****************TO DO LIST
window.addEventListener("load", () => {
  //Selectin the form, task input & container for the tasks
  const form = document.querySelector("#new-task-form");
  const input = document.querySelector("#new-task-input");
  const list_el = document.querySelector("#tasks");
  //Giving functionality to the submit input "Add task"
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    //Storing the task input value into "task"
    const task = input.value;
    if (!task) {
      alert("Please fill out the task");
      return;
    }
    //creating a container for "each" task and giving it styles
    const task_el = document.createElement("div");
    task_el.classList.add("task");
    //creating a container for the actual input task "value"
    const task_content_el = document.createElement("div");

    //Creating an input to store the value of the task typed
    const task_input_el = document.createElement("input");
    //Adding the the style text to the input that is to store the value
    task_input_el.classList.add("text");
    //Storing the value of the input "task" into the input type text.
    task_input_el.value = task;
    //Setting the type of value to "text"
    task_input_el.type = "text";
    //setting an attribute "readonly" to the input
    task_input_el.setAttribute("readonly", "readonly");
    //storing the input that holds the value into a div container previously styled.
    task_content_el.appendChild(task_input_el);
    //inserting the container with the value into another container with the class "task"
    task_el.appendChild(task_content_el);
    //Inserting the containers with the calue into a "MAIN TASKS CONTAINER"
    list_el.appendChild(task_el);

    //*******ACTIONS SECTIONS *******/
    const task_actions_el = document.createElement("div");
    task_actions_el.classList.add("actions");

    const task_edit_el = document.createElement("button");
    task_edit_el.classList.add("todo-edit");
    task_edit_el.innerHTML = "Edit";

    const task_delete_el = document.createElement("button");
    task_delete_el.classList.add("todo-delete");
    task_delete_el.innerHTML = "Delete";

    task_actions_el.appendChild(task_edit_el);
    task_actions_el.appendChild(task_delete_el);
    task_el.appendChild(task_actions_el);

    //RESETING THE INPUT VALUE FOR NEW TASKS
    input.value = "";

    //GIVING FUNCTIONALITY TO EDIT BUTTON
    task_edit_el.addEventListener("click", () => {
      if (task_edit_el.innerText.toLocaleLowerCase() === "edit") {
        task_input_el.removeAttribute("readonly");
        task_input_el.focus();
        task_edit_el.innerText = "Save";
      } else {
        task_input_el.setAttribute("readonly", "readonly");
        task_edit_el.innerText = "Edit";
      }
    });
    //GIVING FUNCTIONALITY TO DELETE BUTTON
    task_delete_el.addEventListener("click", () => {
      list_el.removeChild(task_el);
    });
  });
});
