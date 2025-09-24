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
    const span = document.createElement("span");
    span.classList.add("task-text");
    span.textContent = taskText;

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "Delete";

    // Append
    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    // Clear input
    taskInput.value = "";

    // Delete action (basic)
    deleteBtn.addEventListener("click", () => {
      li.remove();
    });
  }
});

// Add clear list
const clearList = document.getElementById('clear-list');
clearList.addEventListener('click', ()=>{
  taskList.innerHTML = ``;
})