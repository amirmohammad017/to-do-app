// Select elements
const taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task-btn");
const taskList = document.getElementById("task-list");
let data = [];

const filterAllBtn = document.getElementById("filter-all");
const filterCompleteBtn = document.getElementById("filter-complete");
const filterPendingBtn = document.getElementById("filter-pending");

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
    data = [
      {
        taskSubject: "First task",
        taskCheck: true,
      },
      {
        taskSubject: "Second task",
        taskCheck: false,
      },
      {
        taskSubject: "Third task",
        taskCheck: false,
      },
    ];
  }
  data.forEach((item) => {
    if (item.taskCheck == true) {
      addTask(item.taskSubject, true);
    } else {
      addTask(item.taskSubject, false);
    }
  });
};
const saveToLocalStorage = () => {
  const list = taskList.querySelectorAll("li");
  data = [];
  list.forEach((element) => {
    const item = element.querySelector("input");
    const info = {
      taskSubject: `${item.value}`,
      taskCheck: element.classList.contains("active"),
    };
    data.push(info);
  });
  localStorage.setItem("**myToDoListApp**", JSON.stringify(data));
};

const addTask = (taskText, taskCheck) => {
  if (taskText !== "") {
    // Create <li>
    const li = document.createElement("li");
    if (taskCheck) {
      li.classList.add("active");
    }

    // Task text
    const input = document.createElement("input");
    input.setAttribute("disabled", "true");
    input.setAttribute("placeholder", "You should type a task name...");
    input.value = taskText;

    // Group button
    const div = document.createElement("div");
    const edit_done_btn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("i");
    const checkBtn = document.createElement("i");
    edit_done_btn.classList.add("edit-done-btn", "btn-disable");
    deleteBtn.classList.add("delete-btn");
    if (taskCheck) {
      checkBtn.classList.add(
        "fa-regular",
        "fa-check-circle",
        "check-btn",
        "active"
      );
    } else {
      checkBtn.classList.add("fa-regular", "fa-circle", "check-btn");
    }
    editBtn.classList.add("fa-regular", "fa-pen-to-square", "edit-btn");
    edit_done_btn.textContent = "Done";
    deleteBtn.textContent = "Delete";

    // Append
    div.appendChild(checkBtn);
    div.appendChild(editBtn);
    div.appendChild(deleteBtn);
    div.appendChild(edit_done_btn);
    li.appendChild(input);
    li.appendChild(div);
    taskList.appendChild(li);

    // Clear input
    taskInput.value = "";

    // check task action
    checkBtn.addEventListener("click", () => {
      checkBtn.classList.toggle("active");
      checkBtn.classList.toggle("fa-circle");
      checkBtn.classList.toggle("fa-check-circle");
      li.classList.toggle("active");
      saveToLocalStorage();
    });
    // Edit action
    editBtn.addEventListener("click", () => {
      editAction_block();
      li.classList.remove("btn-block");
      checkBtn.classList.add("btn-disable");
      editBtn.classList.add("btn-disable");
      deleteBtn.classList.add("btn-disable");
      edit_done_btn.classList.remove("btn-disable");
      input.removeAttribute("disabled");
      input.focus();
      input.select();
      filterAllBtn.classList.add("btn-block");
      filterCompleteBtn.classList.add("btn-block");
      filterPendingBtn.classList.add("btn-block");
      addTaskBtn.classList.add("btn-block");
      clearList.classList.add("btn-block");
      taskInput.classList.add("btn-block");
      taskInput.value = "";
    });
    edit_done_btn.addEventListener("click", () => {
      if (input.value !== "") {
        checkBtn.classList.remove("btn-disable");
        editBtn.classList.remove("btn-disable");
        deleteBtn.classList.remove("btn-disable");
        edit_done_btn.classList.add("btn-disable");
        input.setAttribute("disabled", "true");
        filterAllBtn.classList.add("btn-block");
        filterCompleteBtn.classList.add("btn-block");
        filterPendingBtn.classList.add("btn-block");
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
// Filter tasks
function applyFilter(filterType) {
  const tasks = document.querySelectorAll("#task-list li");
  tasks.forEach((task) => {
    if (filterType === "all") {
      task.style.display = "flex";
    } else if (filterType === "complete") {
      task.classList.contains("active")
        ? (task.style.display = "flex")
        : (task.style.display = "none");
    } else if (filterType === "pending") {
      !task.classList.contains("active")
        ? (task.style.display = "flex")
        : (task.style.display = "none");
    }
  });
}
// Helper function to highlight active button
function setActiveFilter(activeBtn) {
  document
    .querySelectorAll(".filter-btn")
    .forEach((btn) => btn.classList.remove("active"));
  activeBtn.classList.add("active");
}

// Filter event listener
filterAllBtn.addEventListener("click", () => {
  setActiveFilter(filterAllBtn);
  applyFilter("all");
});
filterCompleteBtn.addEventListener("click", () => {
  setActiveFilter(filterCompleteBtn);
  applyFilter("complete");
});
filterPendingBtn.addEventListener("click", () => {
  setActiveFilter(filterPendingBtn);
  applyFilter("pending");
});

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
