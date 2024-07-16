// get the task input field and add task button
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');

// array to store tasks
let tasks = [];

// add task event listener
addTaskBtn.addEventListener('click', addTask);

// function to add task
function addTask() {
    const task = taskInput.value.trim();
    if (task) {
        tasks.push({ text: task, done: false });
        renderTasks();
        taskInput.value = '';
    }
}

// function to render tasks
function renderTasks() {
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const taskHTML = `
            <li>
                <input type="checkbox" ${task.done ? 'checked' : ''}>
                <span ${task.done ? 'class="done"' : ''}>${task.text}</span>
                <button class="delete-btn" data-index="${index}">Delete</button>
            </li>
        `;
        taskList.innerHTML += taskHTML;
    });
    // add event listeners to delete buttons
    const deleteBtns = taskList.querySelectorAll('.delete-btn');
    deleteBtns.forEach((btn) => {
        btn.addEventListener('click', deleteTask);
    });
}

// function to delete task
function deleteTask(event) {
    const index = event.target.dataset.index;
    tasks.splice(index, 1);
    renderTasks();
}

// function to mark task as done
taskList.addEventListener('click', (event) => {
    if (event.target.type === 'checkbox') {
        const index = event.target.parentNode.querySelector('.delete-btn').dataset.index;
        tasks[index].done = event.target.checked;
        renderTasks();
    }
});

// render tasks on page load
renderTasks();