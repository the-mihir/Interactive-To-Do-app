document.addEventListener("DOMContentLoaded", function() {
    const user = JSON.parse(sessionStorage.getItem('user'));
    if (!user) {
        window.location.href = "/log-in.html";
        return;
    }

    const taskInput = document.getElementById("task");
    const addTaskButton = document.getElementById("addTaskButton");
    const taskList = document.getElementById("taskList");
    const completedTaskList = document.getElementById("completedTaskList");
    const totalTaskCount = document.getElementById("totalTaskCount");
    const activeTaskCount = document.getElementById("activeTaskCount");
    const pendingTaskCount = document.getElementById("pendingTaskCount");


   


    function getTasks() {
        return JSON.parse(localStorage.getItem(user.email)) || [];
    }
    
    function setTasks(tasks) {
        localStorage.setItem(user.email, JSON.stringify(tasks));
    }
    
    function getCompletedTasks() {
        return JSON.parse(localStorage.getItem("completedTasks")) || [];
    }
    
    function setCompletedTasks(tasks) {
        localStorage.setItem("completedTasks", JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = "";
        const tasks = getTasks();
        
        if (tasks.length === 0) {
            taskList.innerHTML = `<li><span>No tasks added yet.</span></li>`;
        } else {
            tasks.forEach((task, index) => {
                const listItem = document.createElement("li");
                listItem.classList.add("flex", "items-center", "justify-between", "border", "border-gray-300", "p-3", "rounded-md", "bg-white");
                listItem.innerHTML = `
                    <span class="w-1/12 text-center font-semibold text-gray-800 text-xl">${index + 1}.</span>
                    <span class="w-7/12 text-left font-semibold text-gray-800 text-xl">${task}</span>
                    <div class="w-4/12 flex justify-end space-x-4">
                        <button class="mark-as-done text-green-500 hover:text-green-700">✅</button>
                        <button class="delete-task text-red-500 hover:text-red-700">🗑️</button>
                    </div>
                `;
                taskList.appendChild(listItem);

                listItem.querySelector(".delete-task").addEventListener("click", () => {
                    tasks.splice(index, 1);
                    setTasks(tasks);
                    renderTasks();
                });

                listItem.querySelector(".mark-as-done").addEventListener("click", () => {
                    const completedTasks = getCompletedTasks();
                    completedTasks.push(task);
                    setCompletedTasks(completedTasks);
                    tasks.splice(index, 1);
                    setTasks(tasks);
                    renderTasks();
                    renderCompletedTasks();
                });
            });
        }
    }

    function renderCompletedTasks() {
        completedTaskList.innerHTML = "";
        const completedTasks = getCompletedTasks();
        
        if (completedTasks.length === 0) {
            completedTaskList.innerHTML = `<li><span>No completed tasks yet.</span></li>`;
        } else {
            completedTasks.forEach((task, index) => {
                const listItem = document.createElement("li");
                listItem.classList.add("flex", "items-center", "justify-between", "border", "border-gray-300", "p-3", "rounded-md", "bg-green-200");
                listItem.innerHTML = `
                    <span class="w-1/12 text-center font-semibold text-gray-900 text-xl">${index + 1}.</span>
                    <span class="w-7/12 text-left font-semibold text-gray-900 text-xl">${task}</span>
                    <div class="w-4/12 flex justify-end space-x-4">
                        <button class="remove-completed-task text-red-700 hover:text-red-900">🗑️</button>
                    </div>
                `;
                completedTaskList.appendChild(listItem);

                listItem.querySelector(".remove-completed-task").addEventListener("click", () => {
                    completedTasks.splice(index, 1);
                    setCompletedTasks(completedTasks);
                    renderCompletedTasks();
                });
            });
        }
    }

    addTaskButton.addEventListener("click", function() {
        const task = taskInput.value.trim();
        if (task === "") {
            alert("Please enter a task");
            return;
        }
        const tasks = getTasks();
        tasks.push(task);
        setTasks(tasks);
        taskInput.value = "";
        renderTasks();
    });

    renderTasks();
    renderCompletedTasks();
});


// How many tasks are there?
const tasks = JSON.parse(localStorage.getItem(user.email)) || [];
const completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];

// Total task count
totalTaskCount.textContent = tasks.length + completedTasks.length;

// Active task count (Incomplete tasks)
activeTaskCount.textContent = tasks.length;

// Pending task count (Completed tasks)
pendingTaskCount.textContent = completedTasks.length;

