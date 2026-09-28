const form = document.querySelector('form');
const input = document.querySelector('input');
const taskList = document.querySelector('#task-list');

let tasks = JSON.parse(localStorage.getItem('studyspace-tasks') || '[]');

function saveTasks() {
  localStorage.setItem('studyspace-tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.replaceChildren();

  tasks.forEach(function (task) {
    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.done;

    const taskLabel = document.createElement('span');
    taskLabel.textContent = task.text;
    taskLabel.classList.toggle('done', task.done);

    checkbox.addEventListener('change', function () {
      task.done = checkbox.checked;
      taskLabel.classList.toggle('done', task.done);
      saveTasks();
    });

    const deleteButton = document.createElement('button');
    deleteButton.type = 'button';
    deleteButton.textContent = 'Delete';

    deleteButton.addEventListener('click', function () {
      tasks = tasks.filter(function (savedTask) {
        return savedTask !== task;
      });
      saveTasks();
      renderTasks();
    });

    taskItem.append(checkbox, taskLabel, deleteButton);
    taskList.appendChild(taskItem);
  });
}

form.addEventListener('submit', function (event) {
  event.preventDefault();

  const taskText = input.value.trim();
  if (taskText === '') return;

  tasks.push({ text: taskText, done: false });
  saveTasks();
  renderTasks();

  input.value = '';
  input.focus();
});

renderTasks();