document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.addEventListener('DOMContentLoaded', loadTasks);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const taskList = document.getElementById('taskList');

    const li = document.createElement('li');
    li.textContent = taskText;

    const editBtn = document.createElement('button');
    editBtn.textContent = 'edit';
    editBtn.className = 'edit';
    editBtn.disabled = true; 

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.className = 'delete';
    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(li);
        removeTaskFromLocalStorage(taskText);
    });

    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    saveTaskToLocalStorage(taskText);

    taskInput.value = '';
}

function saveTaskToLocalStorage(task) {
    let tasks = localStorage.getItem('tasks');
    tasks = tasks ? JSON.parse(tasks) : [];
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromLocalStorage(task) {
    let tasks = localStorage.getItem('tasks');
    tasks = tasks ? JSON.parse(tasks) : [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = localStorage.getItem('tasks');
    tasks = tasks ? JSON.parse(tasks) : [];

    const taskList = document.getElementById('taskList');
    tasks.forEach(taskText => {
        const li = document.createElement('li');
        li.textContent = taskText;


        const remove = document.createElement('button');
        remove.textContent = 'Delete';
        remove.className = 'delete';
        remove.addEventListener('click', () => {
            taskList.removeChild(li);
            removeTaskFromLocalStorage(taskText);
        });

        li.appendChild(remove);
        taskList.appendChild(li);
    });
}
