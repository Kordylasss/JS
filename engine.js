let toDoInput;
let errorInfo;
let addBtn;
let ulList;
let newTodo;

let popup;
let popupInfo;
let editTodo;
let popupInput;
let popupApply;
let popupCancel;
const az = /^[A-Za-z]+$/;
const num = /[0-9]/;

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	// pobieramy elementy ze strony
	toDoInput = document.querySelector(".todo-input");
	errorInfo = document.querySelector(".error-info");
	addBtn = document.querySelector(".add-btn");
	ulList = document.querySelector(".toDoList ul");

	popup = document.querySelector(".popup");
	popupInfo = document.querySelector(".popu-info");
	popupInput = document.querySelector(".edit-input");
	popupApply = document.querySelector(".apply");
	popupCancel = document.querySelector(".cancel");
};

const prepareDOMEvents = () => {
	// nadajemy listenery
	document.addEventListener("input", infoClear);
	addBtn.addEventListener("click", addNewTask);
	ulList.addEventListener("click", checkClick);
	popupCancel.addEventListener("click", closePopup);
	popupApply.addEventListener("click", newTodoAdd);
};

const addNewTask = () => {
	if (toDoInput.value !== "" || toDoInput.value.match(az)) {
		newTodo = document.createElement("li");
		newTodo.textContent = toDoInput.value;
		ulList.append(newTodo);
		createToolsArea();

		toDoInput.value = "";
	} else {
		errorInfo.textContent = "Wprowadz treść zadania.";
	}
};

const infoClear = () => {
	if (toDoInput.value !== "") errorInfo.textContent = "";
	if (popupInput.value !== "") popupInfo.textContent = "";
};

const createToolsArea = () => {
	const newElement = document.createElement("div");
	newElement.classList.add("tools");
	newTodo.append(newElement);

	const complete = document.createElement("button");
	complete.classList.add("complete");
	complete.innerHTML = '<i class="fas fa-check"></i>';

	const edit = document.createElement("button");
	edit.classList.add("edit");
	edit.innerHTML = '<i class="fas fa-edit"></i>';

	const delet = document.createElement("button");
	delet.classList.add("delete");
	delet.innerHTML = '<i class="fas fa-minus">';

	newElement.append(complete, edit, delet);
};

const checkClick = e => {
	if (e.target.matches(".complete") || e.target.matches(".fa-check")) {
		e.target.closest("li").classList.toggle("completed");
	} else if (
		e.target.classList.contains("edit") ||
		e.target.matches(".fa-edit")
	) {
		editTodoF(e);
	} else if (
		e.target.classList.contains("delete") ||
		e.target.matches(".fa-minus")
	) {
		if (window.confirm("Na pewno chcesz usunąc ten element?")) {
			deleteTodo(e);
		}
	}
};

const editTodoF = e => {
	popup.style.display = "block";

	editTodo = e.target.closest("li");
	popupInput.value = editTodo.firstChild.textContent;
};

const closePopup = () => {
	popup.style.display = "none";
};

const newTodoAdd = () => {
	if (popupInput.value !== "") {
		editTodo.firstChild.textContent = popupInput.value;
		closePopup();
	} else {
		popupInfo.textContent = "Wprowadz treść zadania.";
	}
};

const deleteTodo = e => {
	e.target.closest("li").remove();
	emptyList();
};

const emptyList = () => {
	if (ulList.style.height == 0) {
		errorInfo.textContent = "Brak zadań na liscie.";
	}
};

document.addEventListener("DOMContentLoaded", main);
document.addEventListener("DOMContentLoaded", emptyList);
