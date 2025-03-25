
document.addEventListener("DOMContentLoaded", function() {
    const users = JSON.parse(sessionStorage.getItem('user'));
   
    if (!user) {
        window.location.href = "/log-in.html";
    }
});




// Adding task on local store under the login user
document.getElementById("addTaskButton").addEventListener("click", function() {
    const task = document.getElementById("task").value;
    const user = JSON.parse(sessionStorage.getItem('user'));
    const tasks = JSON.parse(localStorage.getItem(user.email)) || [];
    if (task === "") {
        alert("Please enter a task");
        return;
    }
    tasks.push(task);
    localStorage.setItem(user.email, JSON.stringify(tasks));
    document.getElementById("task").value = "";
    window.location.reload();

});


        // showing tasks with sl no and add a check box
        const taskList = document.getElementById("taskList");
        const tasks = JSON.parse(localStorage.getItem(user.email)) || [];

        if (tasks.length === 0) {
            const listItem = document.createElement("li");
            listItem.classList.add("flex");
            listItem.innerHTML = `
                <span>No tasks added yet.</span>
            `;
            taskList.appendChild(listItem);
        }

        // delete task
        
        
        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            listItem.classList.add("flex", "items-center", "justify-between", "border", "border-gray-300", "p-3", "rounded-md", "bg-white");
        
            listItem.innerHTML = `
                <span class="w-1/12  text-center font-semibold text-gray-800 text-xl">${index + 1}.</span>  <!-- SL -->
                <span class="w-7/12 text-left font-semibold text-gray-800 text-xl">${task}</span>  <!-- Task Name -->
        
                <!-- Action Buttons -->
                <div class="w-4/12 flex justify-end space-x-4">
                    <button id = "markAsDone" class="text-green-500 hover:text-green-700" title="Mark as Done">
                        ✅
                    </button>
                    <button id = "editTask" class="text-blue-500 hover:text-blue-700" title="Edit Task">
                        ✏️
                    </button>
                    <button id = "deleteTask" class="text-red-500 hover:text-red-700" title="Delete Task">
                        🗑️
                    </button>
                </div>
            `;
        
            taskList.appendChild(listItem);

        });
        