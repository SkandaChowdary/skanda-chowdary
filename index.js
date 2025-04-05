const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');

// Load saved tasks
window.onload = () => {
  const saved = JSON.parse(localStorage.getItem('tasks')) || [];
  saved.forEach(task => createTask(task.text, task.completed));
};

function addTask() {
  const text = taskInput.value.trim();
  if (text === '') return;
  createTask(text);
  taskInput.value = '';
  saveTasks();
}

function createTask(text, completed = false) {
  const li = document.createElement('li');
  li.textContent = text;
  if (completed) li.classList.add('completed');

  li.addEventListener('click', () => {
    li.classList.toggle('completed');
    saveTasks();
  });

  const delBtn = document.createElement('button');
  delBtn.textContent = 'x';
  delBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    li.remove();
    saveTasks();
  });

  li.appendChild(delBtn);
  taskList.appendChild(li);
}

function saveTasks() {
  const tasks = [];
  document.querySelectorAll('li').forEach(li => {
    tasks.push({
      text: li.firstChild.textContent,
      completed: li.classList.contains('completed')
    });
  });
  localStorage.setItem('tasks', JSON.stringify(tasks));
}
