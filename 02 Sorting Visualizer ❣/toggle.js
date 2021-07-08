const toggleNavElement = document.querySelector('.toggle-nav')
const navListElm = document.querySelector('.toggle-nav-lists')



document.addEventListener("click", (e) => {
    const target = e.target
    if (target.classList.contains("toggle-nav") || target.classList.contains("center-center")) {
        navListElm.classList.add("active")
    } else {
        navListElm.classList.remove("active")
    }
})