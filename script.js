// Buttons
let buttonAdd = document.getElementById("add-btn");
let filterBtns = document.querySelectorAll(".filter-btn");

// Other
let taskInput = document.getElementById("task-input");
let taskList = document.getElementById("task-list");

let userTask = taskInput.value;
let tasks = [];

// Загузка localStorage и сохранение
function saveTasksToLocalStorage() {
    localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function downloadLocalStorage() {
    const saved = localStorage.getItem("todoTasks");
    if (saved) {
        tasks = JSON.parse(sawed);
        renderAllTasks();
    }
}

// Рендерим пункт + обрабатываем complete
function renderTask(task) {
    let taskElement = document.createElement("li");
    taskElement.className = "task-item";

    let inputCheck = document.createElement("input");
    inputCheck.dataset.id = task.id;
    inputCheck.className = "task-checkbox";
    taskElement.append(inputCheck);
    inputCheck.type = "checkbox";

    let textTask = document.createElement("span");
    textTask.className = "task-text";
    textTask.textContent = task.text;
    taskElement.append(textTask);

    let reminderButton = document.createElement("button");
    reminderButton.className = "reminder-btn";
    reminderButton.textContent = "Напомнить";
    taskElement.append(reminderButton);

    let delButton = document.createElement("button");
    delButton.dataset.id = task.id;
    delButton.className = "delete-btn";
    delButton.textContent = "Удалить";
    taskElement.append(delButton);

    if (task.completed === true) {
        inputCheck.checked = true;
        taskElement.classList.add("completed");
    }

    inputCheck.addEventListener("click", function () {
        let checkedTask = tasks.find((task) => {
            return task.id == this.dataset.id;
        });
        checkedTask.completed = !checkedTask.completed;
        saveTasksToLocalStorage()
        renderAllTasks();
    });

    delButton.addEventListener("click", function () {
        let deletedTask = tasks.find((task) => {
            return task.id == this.dataset.id;
        });
        let indexDelTask = tasks.findIndex((task) => task.id == this.dataset.id);
        tasks.splice(indexDelTask, 1);
        renderAllTasks();
    });

    taskList.append(taskElement);
}

// Рендерим все пункты скопом
function renderAllTasks() {
    taskList.innerHTML = "";
    for (let task of tasks) {
        renderTask(task);
    }
}

buttonAdd.addEventListener("click", () => {
    if (taskInput.value) {
        let aboutTask = {
            id: Date.now(),
            text: taskInput.value,
            completed: false,
            reminder: false
        };

        if (tasks.some((task) => task.text === taskInput.value)) {
            alert("Вы уже добавили этот пункт");
        } else {
            tasks.push(aboutTask);
            renderAllTasks();
            taskInput.value = "";
        }
    }
});
