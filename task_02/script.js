// Get DOM elements
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Function to render todos
function showAllTasks() {
  // Clear previous list
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  taskList.innerHTML = "";
  console.log(tasks);

  // show all tasks
  tasks.forEach((each, index) => {
    const item = document.createElement("li");
    item.className =
      "list-group-item d-flex justify-content-between align-items-center";
    item.textContent = each.title;
    if (!each.completed) {
      const buttonGroup = document.createElement("div");
      const completeButton = document.createElement("button");
      completeButton.className = "btn btn-success btn-sm";
      completeButton.style.borderWidth = "2px";
      completeButton.style.borderColor = "black";
      completeButton.style.borderStyle = "solid";
      completeButton.style.margin = "2px";
      completeButton.textContent = "Complete this Task";
      completeButton.addEventListener("click", () => {
        updateTaskAsDone(index);
      });
      const deleteButton = document.createElement("button");
      deleteButton.className = "btn btn-warning btn-sm";
      deleteButton.style.borderWidth = "2px";
      deleteButton.style.borderColor = "black";
      deleteButton.style.borderStyle = "solid";
      deleteButton.style.margin = "2px";
      deleteButton.textContent = "Delete this task";
      deleteButton.addEventListener("click", () => {
        const newName = prompt("Delete Your task!", each.title);
        if (newName && newName.trim() != "") {
          deleteTask(index);
        }
      });
      buttonGroup.appendChild(completeButton);
      buttonGroup.appendChild(deleteButton);
      item.appendChild(buttonGroup);
      taskList.appendChild(item);
    } else {
      item.style.textDecoration = "line-through";
      const buttonGroup = document.createElement("div");
      const completeButton = document.createElement("button");
      completeButton.className = "btn btn-success btn-sm";
      completeButton.style.borderWidth = "2px";
      completeButton.style.borderColor = "black";
      completeButton.style.borderStyle = "solid";
      completeButton.style.margin = "2px";
      completeButton.textContent = "Incomplete this Task";
      completeButton.addEventListener("click", () => {
        updateTaskAsUnDone(index);
      });
      const deleteButton = document.createElement("button");
      deleteButton.className = "btn btn-warning btn-sm";
      deleteButton.style.borderWidth = "2px";
      deleteButton.style.borderColor = "black";
      deleteButton.style.borderStyle = "solid";
      deleteButton.style.margin = "2px";
      deleteButton.textContent = "Delete this task";
      deleteButton.addEventListener("click", () => {
        const newName = prompt("Delete Your task!", each.title);
        if (newName && newName.trim() != "") {
          deleteTask(index);
        }
      });
      buttonGroup.appendChild(completeButton);
      buttonGroup.appendChild(deleteButton);
      item.appendChild(buttonGroup);
      taskList.appendChild(item);
    }
  });
}

// Function to add a new task
function addTask(taskTitle) {
  const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  if (Array.isArray(allTasks)) {
    allTasks.push({ title: taskTitle, completed: false });
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    showAllTasks();
  }
}

// Function to delete a task
function deleteTask(index) {
  const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  if (Array.isArray(allTasks)) {
    allTasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    showAllTasks();
  }
}

function updateTaskAsDone(index) {
  const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  if (Array.isArray(allTasks)) {
    allTasks[index].completed = true;
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    showAllTasks();
  }
}

function updateTaskAsUnDone(index) {
  const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  if (Array.isArray(allTasks)) {
    allTasks[index].completed = false;
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    showAllTasks();
  }
}

// Form submission handler
taskForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const taskTitle = taskInput.value.trim();
  if (taskTitle !== "") {
    addTask(taskTitle);
    taskInput.value = ""; //clear each time when task is added into the list
  } else {
    alert("Please give a task title");
  }
});
