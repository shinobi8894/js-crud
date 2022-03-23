const form = document.getElementById("form");
const input = document.getElementById("input");
const button = document.getElementById("button");
const todo = document.getElementById("todo");
let todoList = [];

form.addEventListener("submit", function (e) {
  e.preventDefault();
  addTodo();
});

function addTodo() {
  // get input
  const newTodo = input.value;
  // return if nothing was entered
  if (!newTodo) return;
  // add the new task to todo list
  todoList.push({
    text: newTodo,
    completed: false,
  });
  // add the todo list to localstorage
  localStorage.setItem("todos", JSON.stringify(todoList));
  // render todo list
  render();
}

function render() {
    // clear the list
    todo.innerHTML = null;
  
    // get the todo list from localstorage
    const todos = localStorage.getItem("todos");
    todoList = JSON.parse(todos) || [];
    for (let i = 0; i < todoList.length; i++) {
  
      const item = document.createElement("li");
    
      // create checkbox to update completed state
      const checkbox = document.createElement("input");
  
      checkbox.type = "checkbox";
  
      checkbox.addEventListener("click", function (e) {
        todoList[i].completed = e.target.checked;
        localStorage.setItem("todos", JSON.stringify(todoList));
  
          // check if todo item is completed and add appropriate class
          if (todoList[i].completed) {
             item.classList.add("completed");
             item.classList.remove("uncompleted");
            checkbox.checked = todoList[i].completed;
         } else {
           item.classList.add("uncompleted");
           item.classList.remove("completed");
           checkbox.checked = todoList[i].completed;
        }
  
      });
      const text = document.createElement("p");
      text.innerText = todoList[i].text;
  
      // create delete button
      const button = document.createElement("button");
      button.innerText = "X";
      button.addEventListener("click", function () {
        todoList.splice(i, 1);
        localStorage.setItem("todos", JSON.stringify(todoList));
        render();
      });
      item.appendChild(checkbox);
      item.appendChild(text);
      item.appendChild(button);
      todo.appendChild(item);
      input.value = null;
      todo.appendChild(item);
    }
  }

