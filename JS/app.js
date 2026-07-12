

const MenuItems = document.querySelectorAll(".menu li");
const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector("aside");
const addBtn = document.querySelector(".add-btn");
const tasksection = document.querySelector(".task-section");
const deleteBtn = task.querySelector(".delete-button");
// let completed = 0;
// let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


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


// task Section



addBtn.addEventListener("click", () => {
    const taskName = prompt("Entre task Name");
    // const priority = prompt("priority");



    const now = new Date();
    const hour = now.getHours();
    const minute = now.getMinutes();
    const currentTime = `${hour} : ${minute}`


    const task = document.createElement("div");
    task.className = "task-item"
    task.innerHTML = ` <div class="task-left">
                            <input type="checkbox">

                            <div>
                                <h4>${taskName}</h4>
                                
                            </div>
                        </div>

                        <div class="task-right">
                            <span>${currentTime}</span>
                           <button class="delete-button">Delete</button>

                        </div>
                    `

//    tasksection.appendChild(task);
tasksection.insertBefore(task, tasksection.children[1])

});





