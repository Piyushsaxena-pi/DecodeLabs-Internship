let todoList = [];
displayItems();
let oldList;
let buttonElement = document.querySelector(".js-btn-todo");
buttonElement.addEventListener("click", addTodo);
function addTodo() {
  emptyTodoCannotBeAdded();
  let inputElement = document.querySelector(".js-todo-input");
  let dateElement = document.querySelector(".js-todo-date");
  let todoItem = inputElement.value;
  let todoDate = dateElement.value;
  todoList.push({ item: todoItem, dueDate: todoDate });
  saveTodoList();
  inputElement.value = "";
  dateElement.value = "";
  displayItems();
}
function saveTodoList() {
  localStorage.setItem("todoList", JSON.stringify(todoList));
}
function getTodoList() {
  return JSON.parse(localStorage.getItem("todoList"));
}
function displayItems() {
  emptyTodoCannotBeAdded();
  todoList = getTodoList() || [];
  let containerElement = document.querySelector(".js-todo-container");
  let newHtml = "";
  for (let i = 0; i < todoList.length; i++) {
    let { item, dueDate } = todoList[i];
    newHtml += `
      <span >${item}</span>
      <span>${dueDate}</span>
      <button class='deleteTodo' onclick="deleteTodo(${i}); displayItems();"> Delete </button>
    `;
  }
  containerElement.innerHTML = newHtml;
}
function emptyTodoCannotBeAdded() {
  let inputElement = document.querySelector(".js-todo-input");
  let dateElement = document.querySelector(".js-todo-date");

  dateElement.addEventListener("input", () => {
    if (dateElement.value.length > 0) {
      buttonElement.disabled = false;
    } else {
      buttonElement.disabled = true;
    }
  });
  inputElement.addEventListener("input", () => {
    if (inputElement.value.length > 0) {
      buttonElement.disabled = false;
    } else {
      buttonElement.disabled = true;
    }
  });
}
function deleteTodo(index) {
  todoList.splice(index, 1);
  saveTodoList();
  displayItems();
}
