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
    clearInterval(interval)
    imageIndex++
    if (imageIndex === carouselImages.length) imageIndex = 0

    carouselImages.forEach(img => img.classList.remove('--active'))
    carouselDots.forEach(dot => dot.classList.remove('--active'))

    carouselImages[imageIndex].classList.add("--active")
    carouselDots[imageIndex].classList.add("--active")

    interval = setInterval(moveRight, 2000)

}

carouselImages[imageIndex].classList.add("--active")
carouselDots[imageIndex].classList.add("--active")

interval = setInterval(moveRight, 2000)

rightBtn.addEventListener('click', moveRight)
leftBtn.addEventListener('click', moveLeft)
