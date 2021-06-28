const pomodoroForm = document.querySelector('form')
const resetButton = pomodoroForm.resetBtn
const setButton = pomodoroForm.setBtn
const submitButton = pomodoroForm.submitBtn
const timerInput = pomodoroForm.timerInput
const minuteElement = document.querySelector('#MM')
const secondElement = document.querySelector('#SS')
const pomodoroStatus = document.querySelector('#session-status')

let minuteTimerDuration = 25
let secondTimerDuration = '00'

secondElement.textContent = secondTimerDuration
minuteElement.textContent = minuteTimerDuration

// Hide the reset button
resetButton.style.display = 'initial'

setButton.style.display = 'none'
submitButton.style.display = 'none'
timerInput.style.display = 'none'
// set's the minute textContent from timerInput.
setButton.addEventListener('click', setMinutes)
function setMinutes(e) {
    e.preventDefault()
    minuteElement.textContent = timerInput.value
}









// JS Nuggets: Notifications API

//Notification.requestPermission();

//new Notification("Subscribe to JS Nuggets!");

const audio = document.querySelector('audio');
// audio.play()
// console.log(audio);
audio.style.display = 'none'
// audio.play();

function notifyMe() {
    console.log("line 8")
    if (!("Notification" in window)) {
        console.log("10")
        alert("This browser does not support system notifications");
    }
    else if (Notification.permission === "granted") {
        console.log("14")
        notify();
    }
    else if (Notification.permission !== 'denied') {
        Notification.requestPermission(function (permission) {
            if (permission === "granted") {
                notify();
                console.log('hii')
            }
        });
    }

    function notify() {
        console.log("hi")
        var notification = new Notification('TITLE OF NOTIFICATION', {
            body: "Hey! You are on notice!",
        });

        notification.onclick = function () {
            window.open("https://www.youtube.com/watch?v=OMXtJ0USM8s");
        };
        setTimeout(notification.close.bind(notification), 1000);
    }


}
Notification.requestPermission().then(function (permission) {
    console.log(permission)
});
new Notification('hii there')
notifyMe();