// Select elements
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
let data = [];

// Functions
const editAction_block = () => {
  const lists = document.querySelectorAll("li");

  lists.forEach((item) => {
    item.classList.add("btn-block");
  });
};
const editAction_unBlock = () => {
  const lists = document.querySelectorAll("li");

  lists.forEach((item) => {
    item.classList.remove("btn-block");
  });
};

const loadFromLocalStorage = () => {
  if (localStorage.getItem("**myToDoListApp**")) {
    data = JSON.parse(localStorage.getItem("**myToDoListApp**"));
  } else {
    data = ['First task','Second task'];
  }
  data.forEach((item) => {
    addTask(item);
  });
};
const saveToLocalStorage = () => {
  const list = taskList.querySelectorAll("li");
  data = [];
  list.forEach((element) => {
    const item = element.querySelector("input");
    data.push(item.value);
  });
  localStorage.setItem("**myToDoListApp**", JSON.stringify(data));
};

const addTask = (taskText) => {
  if (taskText !== "") {
    // Create <li>
    const li = document.createElement("li");

    // Task text
    const input = document.createElement("input");
    input.setAttribute("disabled", "true");
    input.setAttribute("placeholder", "You should type a task name...");
    input.value = taskText;

    // Group button
    const div = document.createElement("div");
    const edit_done_btn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    const i = document.createElement("i");
    edit_done_btn.classList.add("edit-done-btn", "btn-disable");
    deleteBtn.classList.add("delete-btn");
    i.classList.add("fa-regular", "fa-pen-to-square");
    edit_done_btn.textContent = "Done";
    deleteBtn.textContent = "Delete";

    // Append
    div.appendChild(i);
    div.appendChild(deleteBtn);
    div.appendChild(edit_done_btn);
    li.appendChild(input);
    li.appendChild(div);
    taskList.appendChild(li);

    // Clear input
    taskInput.value = "";

    // Edit action
    i.addEventListener("click", () => {
      editAction_block();
      li.classList.remove("btn-block");
      i.classList.add("btn-disable");
      deleteBtn.classList.add("btn-disable");
      edit_done_btn.classList.remove("btn-disable");
      input.removeAttribute("disabled");
      input.focus();
      input.select();
      addTaskBtn.classList.add("btn-block");
      clearList.classList.add("btn-block");
      taskInput.classList.add("btn-block");
      taskInput.value = "";
    });
    edit_done_btn.addEventListener("click", () => {
      if (input.value !== "") {
        i.classList.remove("btn-disable");
        deleteBtn.classList.remove("btn-disable");
        edit_done_btn.classList.add("btn-disable");
        input.setAttribute("disabled", "true");
        taskInput.classList.remove("btn-block");
        addTaskBtn.classList.remove("btn-block");
        clearList.classList.remove("btn-block");
        editAction_unBlock();
        saveToLocalStorage();
      }
    });
    // Delete action
    deleteBtn.addEventListener("click", () => {
      li.remove();
      saveToLocalStorage();
    });
  }
  saveToLocalStorage();
};
// Add Task Event
addTaskBtn.addEventListener("click", () => {
  addTask(taskInput.value.trim());
});

// Add clear list
const clearList = document.getElementById("clear-list");
clearList.addEventListener("click", () => {
  taskList.innerHTML = ``;
  saveToLocalStorage();
});

// Start up functions
// =================
loadFromLocalStorage();
