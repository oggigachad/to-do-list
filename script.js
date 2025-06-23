let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function formatTime(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString(); // You can format it better if needed
}

function getPriorityColor(priority) {
    switch (priority) {
        case 'High':
            return '#dc3545';
        case 'Medium':
            return '#fd7e14';
        case 'Low':
            return '#0d6efd';
        default:
            return '#007bff';
    }
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    const filter = document.getElementById("filterPriority").value;
    taskList.innerHTML = "";

    tasks
        .filter(task => filter === "All" || task.priority === filter)
        .forEach((task, index) => {
            const li = document.createElement("li");
            li.className = `task-item ${task.completed ? "completed" : ""}`;
            li.style.borderLeftColor = getPriorityColor(task.priority);

            li.innerHTML = `
        <span class="task-text" onclick="toggleComplete(${index})">${task.text}</span>
        <div class="task-info">
          Priority: ${task.priority} | Created: ${formatTime(task.createdAt)}
        </div>
        <div class="task-buttons">
          <button onclick="editTask(${index})">✏️</button>
          <button onclick="deleteTask(${index})">🗑️</button>
        </div>
      `;

            taskList.appendChild(li);
        });
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const priorityInput = document.getElementById("priorityInput");
    const taskText = taskInput.value.trim();
    const priority = priorityInput.value;

    if (taskText !== "") {
        tasks.push({
            text: taskText,
            priority: priority,
            completed: false,
            createdAt: Date.now()
        });
        taskInput.value = "";
        saveTasks();
        renderTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    renderTasks();
}

function toggleComplete(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    renderTasks();
}

function editTask(index) {
    const newText = prompt("Edit your task:", tasks[index].text);
    if (newText !== null) {
        tasks[index].text = newText.trim();
        saveTasks();
        renderTasks();
    }
}

// Initial render
renderTasks();