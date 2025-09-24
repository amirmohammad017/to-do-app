// Select elements
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");

// Add Task Event
addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();

  if (taskText !== "") {
    // Create <li>
    const li = document.createElement("li");

    // Task text
    const input = document.createElement("input");
    input.setAttribute("disabled", "true");
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
      i.classList.add("btn-disable");
      deleteBtn.classList.add("btn-disable");
      edit_done_btn.classList.remove("btn-disable");
      input.removeAttribute("disabled");
    });
    edit_done_btn.addEventListener("click", () => {
      i.classList.remove("btn-disable");
      deleteBtn.classList.remove("btn-disable");
      edit_done_btn.classList.add("btn-disable");
      input.setAttribute("disabled", "true");
    });
    // Delete action (basic)
    deleteBtn.addEventListener("click", () => {
      li.remove();
    });
  }
});

// Add clear list
const clearList = document.getElementById("clear-list");
clearList.addEventListener("click", () => {
  taskList.innerHTML = ``;
});
