


const menuBtn = document.querySelector(".menu-btn");
const sidebAR = document.querySelector("aside");
const menuItems = document.querySelectorAll(".menu li")
const addBtn = document.querySelector(".add-btn");
const taskSection = document.querySelector(".task-section")

let complete = 0;

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


//features of sidebar 
menuItems.forEach((item) => {
    item.addEventListener("click", () => {
        menuItems.forEach((menu) => {
            menu.classList.remove("active");
        })
        item.classList.add("active");
    });
});


menuBtn.addEventListener("click", () => {
    sidebAR.classList.toggle("close");

});

tasks.forEach((taskData, index) => {
    createTask(taskData, index);
});

updateTotalTask();

function createTask(taskData, index) {



    const task = document.createElement("div")
    task.className = "task-item";
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

    taskSection.appendChild(task);


    const deleteBtn = task.querySelector(".delete-button");

    deleteBtn.addEventListener("click", () => {
        if (checkbox.checked) {
            complete--;
            completedCount.textContent = complete;
        }

        task.remove();
        tasks.splice(index, 1);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        updateTotalTask();

    })



    const checkbox = task.querySelector("input")
    const completedCount = document.querySelector(".completed-count");
    checkbox.addEventListener("change", () => {
        if (checkbox.checked) {
            task.classList.add("completed");

            complete++;
            completedCount.textContent = complete;
            taskData.complete = true;
        }

        else {
            task.classList.remove("completed")

            complete--;
            completedCount.textContent = complete;
            taskData.complete = false;
        }

        localStorage.setItem("tasks", JSON.stringify(tasks));

    });

    if (taskData.complete) {
        checkbox.checked = true;
        task.classList.add("completed");

        complete++;
        completedCount.textContent = complete;
    }


}




addBtn.addEventListener("click", () => {
    const taskName = prompt("Entre task Name")

    if (taskName === "" || taskName === null) {
        alert("Please Entre The Task First");
        return;
    }


    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTime = `${hour} : ${minute}`

    const taskData = {
        taskName,
        currentTime,
        complete: false
    }

    tasks.push(taskData);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    createTask(taskData, tasks.length - 1);
    updateTotalTask();

});


function updateTotalTask() {
    const totalTaskContent = document.querySelector(".total-task-count");
    totalTaskContent.textContent = tasks.length;
}

const searchTask = document.querySelector(".search-task");

searchTask.addEventListener("input" , ()=>{
    const allTask = document.querySelectorAll(".task-item");

    allTask.forEach((task) =>{
         const taskTitle = task.querySelector("h4");
         if (taskTitle.textContent.toLocaleLowerCase()
            .includes(searchTask.value.toLowerCase())){
            task.style.display = "flex";
         }
         else {
            task.style.display = "none";
            
         }
        
    });
})

const timer = document.querySelector(".timer");
const startBtn = document.querySelector(".start-btn");
const resetBtn = document.querySelector(".reset-btn");
const pauseBtn = document.querySelector(".pause-btn");

let timeLeft = 25*60;
let interval;

function updateTimer(){
    const minute = Math.floor(timeLeft / 60);
    let second = (timeLeft % 60);

    if (second < 10){
        second = "0" + second;
    }

    timer.textContent = `${minute} : ${second}`;
};

startBtn.addEventListener("click" , ()=>{
        clearInterval(interval);
        interval = setInterval(() =>{
            timeLeft--;
            updateTimer();

            if (timeLeft <= 0){
                clearInterval(interval)
                alert("Promodoro Complete");
                timeLeft = 25*60;
                updateTimer();
            }
            
        }, 1000);

});

resetBtn.addEventListener("click" , ()=>{
        clearInterval(interval);
        timeLeft = 25*60;
        updateTimer();
       
});

pauseBtn.addEventListener("click", ()=>{
    clearInterval(interval);
});