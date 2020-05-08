
let collapseElements = document.querySelectorAll('[data-toggle="collapse"]');
const CLASS_SHOW = 'show';
const CLASS_COLLAPSE = 'collapse';
const CLASS_COLLAPSING = 'collapsing';
const CLASS_COLLAPSED = 'collapsed';
const ANIMATION_TIME = 350; // 0.35s

const pomodoroBtn = document.querySelector('.pomodoro-btn');
const ShortBreakBtn = document.querySelector('.sh-break-btn');
const LongBreakBtn = document.querySelector('.ln-break-btn');
const playBtn = document.querySelector('.play-icon');
const resetBtn = document.querySelector('.reset-icon');
const pauseBtn = document.querySelector('.pause-icon');
const timeDisplay = document.querySelector('.time');
let isPaused = true;
let pomodoroTime;
const alert = document.querySelector('.bubble-sound');

let pomodoro = 25;
let shortBr = 5;
let longBr = 20;
let reset = 0;

function handleCollapseElementClick(e) {
    let el = e.currentTarget;
        let targetEl = document.querySelector("#navbarSupportedContent");
        let isShown = targetEl.classList.contains(CLASS_SHOW) || targetEl.classList.contains(CLASS_COLLAPSING);
        if(!isShown) {
            targetEl.classList.remove(CLASS_COLLAPSE);
            targetEl.classList.add(CLASS_COLLAPSING);
            targetEl.style.height = 0
            targetEl.classList.remove(CLASS_COLLAPSED);
            setTimeout(() => {
                targetEl.classList.remove(CLASS_COLLAPSING);
                targetEl.classList.add(CLASS_COLLAPSE, CLASS_SHOW);
                targetEl.style.height = '';
            }, ANIMATION_TIME)
            targetEl.style.height = targetEl.scrollHeight + 'px';
        } else {
            targetEl.style.height = `${targetEl.getBoundingClientRect().height}px`
            targetEl.offsetHeight; // force reflow
            targetEl.classList.add(CLASS_COLLAPSING);
            targetEl.classList.remove(CLASS_COLLAPSE, CLASS_SHOW);
            targetEl.style.height = '';
            setTimeout(() => {
                targetEl.classList.remove(CLASS_COLLAPSING);
                targetEl.classList.add(CLASS_COLLAPSE);
            }, ANIMATION_TIME)
        }
    
}

collapseElements.forEach((el) => {
    el.addEventListener('click', handleCollapseElementClick)
})

function startTimerHandler() {
    let originalTime = document.querySelector('.time').textContent;
        if(originalTime === '00:00') {
            return;
        } else {
            toggleBtn();
}
            clearInterval(pomodoroTime);
            isPaused = false;   
            let min = parseInt(document.querySelector('.minutes').textContent);
            let sec = parseInt(document.querySelector('.sec').textContent);
            

            pomodoroTime = setInterval(()=>{
                let result = '';
                
                if(isPaused === false && originalTime !== '00:00'){
                    sec--;
                    if(sec < 0 || sec === 59){
                        sec = 59;
                        --min;
                    }
                    
                    function addLeadingZeroes(time) {
                        return time < 10 ? `0${time}` : time
                    }

                    result += `<span class="minutes">${addLeadingZeroes(min)}</span>:<span class="sec">${addLeadingZeroes(sec)}</span>`
                    timeDisplay.innerHTML = result;
                    
                    if(min === 0 && sec === 0) {
                        alert.play();
                        isPaused = true;
                        toggleBtn();

                    }
                    
                }

            }, 1000);
}
const pauseTimerHandler = function() {
    isPaused = true;
    toggleBtn();
}

const toggleBtn = function() {
    pauseBtn.classList.toggle('d-none');
    playBtn.classList.toggle('d-none');
    resetBtn.classList.toggle('d-none');
};


// const resetTimerHandler = function() {
//     let originalTime = document.querySelector('.time').textContent;
//     setTime(reset);
//     // if(originalTime !== '00:00') {
//         // pauseBtn.classList.toggle('d-none');
//         // playBtn.classList.toggle('d-none');
//         // resetBtn.classList.toggle('d-none');
//     // }
    
// };

// const pomodoroHandler = function() {
//     setTime(pomodoro);
// };

// const shortBrHandler = function() {
//     setTime(shortBr);
// };

// const longBrHandler = function() {
//     setTime(longBr);
    
// };

function setTime(time) {
    isPaused = true;
    if(playBtn.classList.contains('d-none')){
        toggleBtn();
    }
    
    if(time < 10) {
        timeDisplay.innerHTML = `<span class="minutes">0${time}</span>:<span class="sec">00</span>`
    } else {
        timeDisplay.innerHTML = `<span class="minutes">${time}</span>:<span class="sec">00</span>`
    }
    
}

pomodoroBtn.addEventListener('click',  setTime.bind(null, pomodoro));
ShortBreakBtn.addEventListener('click', setTime.bind(null, shortBr));
LongBreakBtn.addEventListener('click', setTime.bind(null, longBr));
playBtn.addEventListener('click', startTimerHandler);
resetBtn.addEventListener('click', setTime.bind(null, reset));
pauseBtn.addEventListener('click', pauseTimerHandler);
