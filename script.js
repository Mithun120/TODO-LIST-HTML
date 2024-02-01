const taskInput = document.querySelector("#task");
const taskList = document.querySelector("#task-list");

const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${task}</span>
      <input type="text" class="edit-input" style="display: none;" />
      <button class="edit-btn">Edit</button>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    taskList.appendChild(li);
  });
}

function addTask(e) {
  e.preventDefault();
  const task = taskInput.value.trim();
  if (task) {
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
    taskInput.value = "";
  }
}

function deleteTask(e) {
  if (e.target.classList.contains("delete-btn")) {
    const index = e.target.dataset.index;
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
}

// Edit task
function editTask(e) {
  if (e.target.classList.contains("edit-btn")) {
    const li = e.target.parentNode;
    const span = li.querySelector("span");
    const input = li.querySelector(".edit-input");
    const editBtn = li.querySelector(".edit-btn");
    const text = span.textContent;
    input.value = text;
    span.style.display = "none";
    input.style.display = "block";
    editBtn.textContent = "Save";
    editBtn.classList.remove("edit-btn");
    editBtn.classList.add("save-btn");
  } else if (e.target.classList.contains("save-btn")) {
    const li = e.target.parentNode;
    const span = li.querySelector("span");
    const input = li.querySelector(".edit-input");
    const saveBtn = li.querySelector(".save-btn");
    const text = input.value.trim();
    if (text) {
      tasks[li.dataset.index] = text;
      localStorage.setItem("tasks", JSON.stringify(tasks));
      span.textContent = text;
      span.style.display = "block";
      input.style.display = "none";
      saveBtn.textContent = "Edit";
      saveBtn.classList.remove("save-btn");
      saveBtn.classList.add("edit-btn");
    }
  }
}

// Event listeners
document.addEventListener("DOMContentLoaded", renderTasks);
document.querySelector("form").addEventListener("submit", addTask);
taskList.addEventListener("click", deleteTask);
taskList.addEventListener("click", editTask);
