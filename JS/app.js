

const MenuItems = document.querySelectorAll(".menu li");
const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector("aside");
const addBtn = document.querySelector(".add-btn");
const tasksection = document.querySelector(".task-section");

let completed = 0;
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];





// Menu Bar Features
MenuItems.forEach((item) => {
    item.addEventListener("click", () => {
        MenuItems.forEach((menu) => {
            menu.classList.remove("active");
        });
        item.classList.add("active");
    });
});

menuBtn.addEventListener("click", () => {
    sidebar.classList.toggle("close")
});



//task section and features
function CreateTaskSection() {

    tasks.forEach((taskData, index) => {
        createTask(taskData, index);

    })

    function createTask(taskData, index) {
        //task item
        const task = document.createElement("div");
        task.className = "task-item"
        task.innerHTML = ` <div class="task-left">
                            <input type="checkbox">

                            <div>
                                <h4>${taskData.taskName}</h4>
                                
                            </div>
                        </div>

                        <div class="task-right">
                            <span>${taskData.currentTime}</span>
                           <button class="delete-button">Delete</button>

                        </div>
                    `


        // tasksection.insertBefore(task, tasksection.children[1])
        tasksection.appendChild(task);

        //delete button features
        const deleteBtn = task.querySelector(".delete-button");

        deleteBtn.addEventListener("click", () => {
            if (checkbox.checked) {
                completed--;
                completedCount.textContent = completed
            };
            task.remove()
            tasks.splice(index);
            localStorage.setItem("tasks", JSON.stringify(tasks));

        });


        //checkbox features
        const checkbox = task.querySelector("input");
        const completedCount = document.querySelector(".completed-count");
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                task.classList.add("completed");

                completed++;
                completedCount.textContent = completed;

            }
            else {
                task.classList.remove("completed");

                completed--;
                completedCount.textContent = completed;
            }

        });
    };

    //add button karne pe task section ka behave
    addBtn.addEventListener("click", () => {
        const taskName = prompt("Entre task Name");
        // const priority = prompt("priority");

        if (taskName === "" || taskName === null) {
            alert("Please Enter Task First");
            return;
        }


        const now = new Date();
        const hour = now.getHours();
        const minute = now.getMinutes();
        const currentTime = `${hour} : ${minute}`


        //task Data Object
        const taskData = {
            taskName,
            currentTime,
            completed: false
        }

        tasks.push(taskData)
        localStorage.setItem("tasks", JSON.stringify(tasks));
        createTask(taskData, tasks.length - 1);


    });


}
CreateTaskSection();

//task section searchbar features
const searchTask = document.querySelector(".search-task");

searchTask.addEventListener("input" , ()=>{
    const allTasks = document.querySelectorAll(".task-item");
        allTasks.forEach((task) => {

            const taskTitle = task.querySelector("h4");

            if (taskTitle.textContent
                .toLocaleLowerCase() 
                .includes(searchTask.value.toLowerCase())){
                task.style.display = "flex";
            }
            else{
                task.style.display = "none";
            }
        })
});
