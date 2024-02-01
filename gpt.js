document.addEventListener('DOMContentLoaded', function () {
    const taskForm = document.getElementById('task-form');
    const taskInput = document.getElementById('task');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');
   
    taskForm.addEventListener('submit', function (event) {
      event.preventDefault();
      addTask(taskInput.value);
      taskInput.value = '';
    });
   
    taskList.addEventListener('click', function (event) {
      const target = event.target;
      if (target.classList.contains('edit-btn')) {
        editTask(target.parentElement);
      } else if (target.classList.contains('delete-btn')) {
        deleteTask(target.parentElement);
      } else if (target.classList.contains('done-btn')) {
        markAsDone(target.parentElement);
      }
    });
   
    function addTask(taskText) {
      if (taskText.trim() === '') return;
   
      const taskItem = document.createElement('li');
      taskItem.innerHTML = `<span>${taskText}</span>
                           <input type="text" class="edit-input" style="display: none;" />
                           <button class="edit-btn">Edit</button>
                           <button class="delete-btn">Delete</button>
                           `;
   
      taskList.appendChild(taskItem);
      saveTasksToLocalStorage();
    }
   
    function editTask(taskItem) {
      const span = taskItem.querySelector('span');
      const input = taskItem.querySelector('.edit-input');
      const editBtn = taskItem.querySelector('.edit-btn');
   
      span.style.display = 'none';
      input.style.display = 'inline';
      input.value = span.textContent;
      input.focus();
   
      const saveBtn = document.createElement('button');
      saveBtn.textContent = 'Save';
      saveBtn.classList.add('save-btn');
      taskItem.appendChild(saveBtn);
   
      editBtn.style.display = 'none';
   
      saveBtn.addEventListener('click', function () {
        span.textContent = input.value;
        span.style.display = 'inline';
        input.style.display = 'none';
        editBtn.style.display = 'inline';
        saveBtn.remove();
        saveTasksToLocalStorage();
      });
   
      input.addEventListener('blur', function () {
        span.textContent = input.value;
        span.style.display = 'inline';
        input.style.display = 'none';
        editBtn.style.display = 'inline';
        saveBtn.remove();
        saveTasksToLocalStorage();
      });
   
      input.addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
          span.textContent = input.value;
          span.style.display = 'inline';
          input.style.display = 'none';
          editBtn.style.display = 'inline';
          saveBtn.remove();
          saveTasksToLocalStorage();
        }
      });
    }
   
    function deleteTask(taskItem) {
        taskItem.remove();
        saveTasksToLocalStorage();
   
    }
   
   
    function saveTasksToLocalStorage() {
      const tasks = [];
      document.querySelectorAll('#task-list li span').forEach(task => {
        tasks.push({
          text: task.textContent,
          done: task.style.textDecoration === 'line-through'
        });
      });
   
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
   
    function loadTasksFromLocalStorage() {
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
   
      tasks.forEach(task => {
        addTask(task.text);
        if (task.done) {
          markAsDone(taskList.lastElementChild);
        }
      });
    }
   
    loadTasksFromLocalStorage();
  });
   