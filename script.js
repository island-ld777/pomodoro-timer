// DOM ELEMENTS
const pomodoroTab = document.getElementById('pomodoro-tab');
const restTab = document.getElementById('rest-tab');
const longRestTab = document.getElementById('long-rest-tab');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const stopBtn = document.getElementById('stop-btn');
const timer = document.getElementById('timer');

// VARIABLES
let minutes = parseInt(timer.innerText.split(":")[0]);
let seconds = parseInt(timer.innerText.split(":")[1]);
let state = "POMODORO";
let restCheck = 0;
let pomodoroTime;

// FUNCTIONS
function reset() {
    minutes = parseInt(timer.innerText.split(":")[0]);
    seconds = parseInt(timer.innerText.split(":")[1]);
    pauseBtn.setAttribute('disabled', true);
    stopBtn.setAttribute('disabled', true);
}

function setPomodoro() {
    timer.innerText = "20:00";
    state = "POMODORO"
    reset();
}

function setRest() {
    timer.innerText = "05:00";
    state = "REST";
    reset();
}

function setLongRest() {
    timer.innerText = "15:00";
    restCheck = 0;
    state = "LONG_REST";
    reset();
}

// EVENT LISTENERS
startBtn.addEventListener('click', () => {
    pauseBtn.removeAttribute('disabled');
    stopBtn.removeAttribute('disabled');
    pomodoroTime = setInterval(function() {
        var time = minutes * 60 + seconds;
        time--;
        if (time < 0){
            clearInterval(pomodoroTime);
            switch(state){
                case "POMODORO":
                    restCheck++;
                    if (restCheck === 4){
                        setLongRest();
                        break;
                    }
                    setRest();
                    break;
                case "REST":
                    setPomodoro();
                    break;
                case "LONG_REST":
                    setPomodoro();
                    break;
            }
            return;
            
        }
        minutes = Math.floor(time / 60);
        seconds = time % 60;
        var textMinutes = minutes < 10 ? '0' + minutes : minutes;
        var textSeconds = seconds < 10 ? '0' + seconds : seconds;
        timer.innerText = `${textMinutes}:${textSeconds}`;
    }, 0.8);
});

pauseBtn.addEventListener('click', () => {
    clearInterval(pomodoroTime);
});

stopBtn.addEventListener('click', () => {
    clearInterval(pomodoroTime);
    setPomodoro();
})