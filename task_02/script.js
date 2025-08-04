// Get DOM elements
const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");
const customToast = document.getElementById("custom-toast");
const customToastMessage = document.getElementById("toast-message");
const customModal = document.getElementById("custom-modal");
const customModalTitle = document.getElementById("custom-modal-title");
const customModalBody = document.getElementById("custom-modal-body");
const customModalButton = document.getElementById("custom-modal-button");
// Function to render todos
function showAllTasks() {
  // Clear previous list
  const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  taskList.innerHTML = "";

  // show all tasks
  if (Array.isArray(tasks)) {
    if (tasks.length > 0) {
      tasks.forEach((each, index) => {
        const item = document.createElement("li");
        item.className =
          "list-group-item d-flex justify-content-between align-items-center";
        item.textContent = each.title;

        if (index % 2 == 0) {
          item.style.backgroundColor = "#63B4D1";
        } else {
          item.style.backgroundColor = "#7699D4";
        }
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
          deleteButton.addEventListener("click", () =>
            deleteTaskWithModal(index)
          );
          buttonGroup.appendChild(completeButton);
          buttonGroup.appendChild(deleteButton);
          item.appendChild(buttonGroup);
          taskList.appendChild(item);
        } else {
          item.style.textDecoration = "line-through";
          const buttonGroup = document.createElement("div");
          const deleteButton = document.createElement("button");
          deleteButton.className = "btn btn-warning btn-sm";
          deleteButton.style.borderWidth = "2px";
          deleteButton.style.borderColor = "black";
          deleteButton.style.borderStyle = "solid";
          deleteButton.style.margin = "2px";
          deleteButton.textContent = "Delete this task";
          deleteButton.addEventListener("click", () =>
            deleteTaskWithModal(index)
          );
          buttonGroup.appendChild(deleteButton);
          item.appendChild(buttonGroup);
          taskList.appendChild(item);
        }
      });
    } else {
      const item = document.createElement("li");
      item.className =
        "list-group-item d-flex justify-content-between align-items-center";
      item.textContent = "No Task has been added";
      item.style.backgroundColor = "#7699D4";
      item.style.color = "#000000";
      taskList.appendChild(item);
    }
  }
}

// Function to add a new task
function addTask(taskTitle) {
  const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  if (Array.isArray(allTasks)) {
    allTasks.push({ title: taskTitle, completed: false });
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    showAllTasks();
    showToast("Task has been added", 1);
  }
}

// Function to delete a task with modal

function deleteTaskWithModal(index) {
  const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  customModalTitle.innerText = "Want to delete?";
  customModalBody.innerHTML = `<span style="font-weight: bold">${allTasks[index].title}</span> task will be deleted. Click confirm to continue.`;
  const modal = new bootstrap.Modal(customModal);
  modal.show(); // this line should be bottom as bootstrap.modal.hide() wont work if show() called
  customModalButton.addEventListener("click", () => {
    showToast(`${allTasks[index].title} is deleted`, 2);
    allTasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    showAllTasks();
  });
}

function updateTaskAsDone(index) {
  const allTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
  if (Array.isArray(allTasks)) {
    allTasks[index].completed = true;
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    showAllTasks();
    showToast(`${allTasks[index].title} is completed`, 3);
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

function showToast(title, type) {
  customToastMessage.innerText = title;
  switch (type) {
    case 1:
      customToast.style.backgroundColor = "#8ddbe0";
      customToast.style.color = "#000000";
      break;
    case 2:
      customToast.style.backgroundColor = "#F69DB0";
      customToast.style.color = "#000000";
      break;
    case 3:
      customToast.style.backgroundColor = "#3C5A14";
      customToast.style.color = "#FFFFFF";
    default:
      break;
  }
  const toast = new bootstrap.Toast(customToast);
  toast.show();
}

showAllTasks();
