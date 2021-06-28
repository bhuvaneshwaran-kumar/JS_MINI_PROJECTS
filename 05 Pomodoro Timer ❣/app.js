// Elements and variables
const pomodoroForm = document.querySelector('form')
const resetButton = pomodoroForm.resetBtn
const setButton = pomodoroForm.setBtn
const submitButton = pomodoroForm.submitBtn
const timerInput = pomodoroForm.timerInput
const minuteElement = document.querySelector('#MM')
const secondElement = document.querySelector('#SS')
const pomodoroStatusElement = document.querySelector('#session-status')
const audio = document.querySelector('audio');


const SECONDS = 1000 // in miliseconds
const MINUTE = SECONDS * 60
let timer, endTime
let minuteTimerDuration = 25
let pomodoroStatus = false

minuteElement.textContent = minuteTimerDuration

// Hide audio element
audio.style.display = 'none'

// Functions 

// toggels display of the element based on pomodoroStatus
function toggleElement(pomodoroTimerStatus) {
    resetButton.style.display = !pomodoroTimerStatus ? 'none' : 'initial'
    setButton.style.display = pomodoroTimerStatus ? 'none' : 'initial'
    submitButton.style.display = pomodoroTimerStatus ? 'none' : 'initial'
    timerInput.style.display = pomodoroTimerStatus ? 'none' : 'initial'
}

// set's the minute textContent from timerInput.
function setMinutes(e) {
    e?.preventDefault()
    minuteTimerDuration = timerInput.value
    minuteElement.textContent = minuteTimerDuration
}

// set's pomodoroStatus
function setStatusMessage(status) {
    if (status) {
        pomodoroStatusElement.textContent = "Session Started !"
    } else {
        pomodoroStatusElement.textContent = "Start Session !"
        console.log('session is yet to start')
    }
}

// form submited.
function handleFormSubmit(e) {
    e.preventDefault()

    if (pomodoroStatus) return

    pomodoroStatus = true
    setStatusMessage(pomodoroStatus)
    toggleElement(pomodoroStatus)

    minuteElement.textContent = minuteTimerDuration - 1

    const endTime = new Date().getTime() + minuteTimerDuration * 60000

    timer = setInterval(() => {
        const now = new Date().getTime()
        const distance = endTime - now
        const isOver = distance <= 0
        if (isOver) {
            clearInterval(timer)
            audio.play()
            pomodoroStatusElement.textContent = 'Session Completed !'
            sendNotification()
            stopPomodoroTimer()
        } else {
            minuteElement.textContent = Math.floor((distance / MINUTE))
            secondElement.textContent = Math.floor((distance % MINUTE) / SECONDS)
        }
    }, 1000)
    secondElement.textContent = '59'

}


//get's Notification permission.
function getNotificationPermissions() {
    if (!('Notification' in window))
        return console.log('This browser does not support desktop notification!')

    if (Notification.permission !== 'denied') {
        Notification.requestPermission().then((permission) => {
            if (permission === 'granted') return console.log('Notification permision granted!')
            if (permission !== 'granted') return console.log('You will not recieve any notification!')
        })
    }
}

//Send notification
function sendNotification() {
    if (Notification.permission !== 'granted') return getNotificationPermissions()

    const options = {
        icon: '../Bhuvi-Fav-icon.ico',
        body: `${minuteTimerDuration} is over !`
    }
    let customNotifications = new Notification("Time up", options)
    customNotifications.onclick = () => {
        window.focus()
    }
    //close the notification in 3000 ms
    setTimeout(customNotifications.close.bind(customNotifications), 3000)
}

//Reset the pomodoro Status to the begining
function stopPomodoroTimer(e) {
    e?.preventDefault()
    minuteTimerDuration = timerInput.value
    pomodoroStatus = false
    minuteElement.textContent = minuteTimerDuration
    secondElement.textContent = '00'
    setStatusMessage(pomodoroStatus)
    toggleElement(pomodoroStatus)
    clearInterval(timer)

}

// EventListener.
setButton.addEventListener('click', setMinutes)
pomodoroForm.addEventListener('submit', handleFormSubmit)
resetButton.addEventListener('click', stopPomodoroTimer)
window.addEventListener('beforeunload', (event) => {
    if (pomodoroStatus) {
        event.preventDefault();
        event.returnValue = "You have unfinished changes!";
    }
})


//function call's
getNotificationPermissions()
toggleElement(pomodoroStatus)
setStatusMessage(pomodoroStatus)

// JS Nuggets: Notifications API

//Notification.requestPermission();

//new Notification("Subscribe to JS Nuggets!");

