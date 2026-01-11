// Buttons
let buttonAdd = document.getElementById("add-btn");
let filterBtns = document.querySelectorAll(".filter-btn");
console.log(document.querySelector(".filter-btn"));

// Other
let taskInput = document.getElementById("task-input");
let taskList = document.getElementById("task-list");

let tasks = [];
let currentFilter = "all";

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

// API

// Фильтр
filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((button) => button.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    renderAllTasks();
  });
});

// Обработчик клика на чекбокс и кнопки
taskList.addEventListener("click", function (event) {
  const targetLi = event.target.closest(".task-item");
  if (!targetLi) return;
  const taskId = targetLi.dataset.id;
  const targetTask = tasks.find((t) => t.id == taskId);

  if (event.target.classList.contains("task-checkbox")) {
    targetTask.completed = !targetTask.completed;
    saveTasksToLocalStorage();
    renderAllTasks();
  } else if (event.target.classList.contains("reminder-btn")) {
    const seconds = parseInt(prompt("Через сколько секунд напомнить?"));
    if (isNaN(seconds) || seconds <= 0) {
      alert("Неверное значение!");
    }
    setTimeout(() => {
      alert(`Вы собирались сделать: ${targetTask.text}`);
    }, seconds * 1000);
  } else if (event.target.classList.contains("delete-btn")) {
    let indexDelTask = tasks.findIndex((task) => task.id == taskId);
    tasks.splice(indexDelTask, 1);
    saveTasksToLocalStorage();
    renderAllTasks();
  }
});

// Рендерим пункт + обрабатываем complete
function renderTask(task) {
  console.log("renderTask вызван для:", task.text);
  let taskElement = document.createElement("li");
  taskElement.className = "task-item";
  taskElement.dataset.id = task.id;

  let inputCheck = document.createElement("input");
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
    reminderButton.style.display = "none";
  }

  taskList.append(taskElement);
}

// Рендерим все пункты скопом
function renderAllTasks() {
  console.log("renderAllTasks вызван, tasks.length =", tasks.length);
  taskList.innerHTML = "";
  for (let task of tasks) {
    if (currentFilter == "completed" && !task.completed) continue;
    if (currentFilter == "uncompleted" && task.completed) continue;
    renderTask(task);
  }
}

buttonAdd.addEventListener("click", () => {
  if (taskInput.value) {
    let aboutTask = {
      id: Date.now(),
      text: taskInput.value,
      completed: false,
      reminder: false,
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
