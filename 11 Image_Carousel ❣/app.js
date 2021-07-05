const carouselImages = document.querySelectorAll(".carousel__image")
const carouselDots = document.querySelectorAll(".carousel__dot")
const leftBtn = document.querySelector('.carousel__leftBtn')
const rightBtn = document.querySelector('.carousel__rightBtn')

let imageIndex = 0;
let interval;

//initial set active to 0 index to the respective element.
carouselImages[imageIndex].classList.add("--active")
carouselDots[imageIndex].classList.add("--active")


function moveLeft() {
    clearInterval(interval) //clear's the previous interval so that delay will be constant.
    --imageIndex
    if (imageIndex == -1) imageIndex = carouselImages.length - 1

    //remove's active to all the elements
    carouselImages.forEach(image => image.classList.remove('--active'))
    carouselDots.forEach(dot => dot.classList.remove('--active'))

    //add the active to respective element
    carouselImages[imageIndex].classList.add("--active")
    carouselDots[imageIndex].classList.add("--active")

    //set new Interval.
    interval = setInterval(moveRight, 2000)

}

function moveRight() {
    clearInterval(interval) //clear's the previous interval so that delay will be constant.
    imageIndex++
    if (imageIndex === carouselImages.length) imageIndex = 0

    //remove's active to all the elements
    carouselImages.forEach(img => img.classList.remove('--active'))
    carouselDots.forEach(dot => dot.classList.remove('--active'))

    //add the active to respective element
    carouselImages[imageIndex].classList.add("--active")
    carouselDots[imageIndex].classList.add("--active")

    //set new Interval.
    interval = setInterval(moveRight, 2000)

}

// add event listener to left and right btn.
rightBtn.addEventListener('click', moveRight)
leftBtn.addEventListener('click', moveLeft)


//set the interval.
interval = setInterval(moveRight, 2000)

