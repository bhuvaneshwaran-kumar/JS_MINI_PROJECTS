//dom elements selected by data attribute
const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')

//Calculate the ratio for hour,minute,second.
function setClock() {
    const currentDate = new Date()
    const secondRatio = currentDate.getSeconds() / 60
    const minuteRatio = currentDate.getMinutes() / 60
    const hourRatio = currentDate.getHours() / 12

    setRotation(secondHand, secondRatio)
    setRotation(minuteHand, minuteRatio)
    setRotation(hourHand, hourRatio)
}

//set the variable of rotaion in css.
function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio * 360)
}

const timer = setInterval(setClock, 1000)

document.addEventListener('beforeunload', () => clearInterval(timer))

setClock()