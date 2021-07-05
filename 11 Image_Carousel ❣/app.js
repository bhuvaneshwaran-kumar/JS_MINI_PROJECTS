const carouselImages = document.querySelectorAll(".carousel__image")
const carouselDots = document.querySelectorAll(".carousel__dot")
const leftBtn = document.querySelector('.carousel__leftBtn')
const rightBtn = document.querySelector('.carousel__rightBtn')

let imageIndex = 0;
let interval;

function moveLeft() {
    clearInterval(interval)
    --imageIndex
    if (imageIndex == -1) imageIndex = carouselImages.length - 1
    carouselImages.forEach(image => image.classList.remove('--active'))
    carouselDots.forEach(dot => dot.classList.remove('--active'))

    carouselImages[imageIndex].classList.add("--active")
    carouselDots[imageIndex].classList.add("--active")

    interval = setInterval(moveRight, 2000)

}

function moveRight() {

}

carouselImages[imageIndex].classList.add("--active")
carouselDots[imageIndex].classList.add("--active")