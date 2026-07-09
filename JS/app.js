const MenuItems = document.querySelectorAll(".menu li");
const menuBtn = document.querySelector(".menu-btn");
const sidebar = document.querySelector("aside")



MenuItems.forEach((item) => {
            item.addEventListener("click" , () => {
                MenuItems.forEach((menu) =>{
                    menu.classList.remove("active");
                })

                item.classList.add("active");
            });
});

menuBtn.addEventListener("click" , () => {
            sidebar.classList.toggle("close")
            
});

