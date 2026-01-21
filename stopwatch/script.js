// DOM
const hourContent = document.querySelector(".hour");
const minutesContent = document.querySelector(".minutes");
const secondsContent = document.querySelector(".seconds");
const tiercesContent = document.querySelector(".tierces");

const startBtn = document.querySelector(".start-btn");
const pauseBtn = document.querySelector(".pause-btn");
const resetBtn = document.querySelector(".reset-btn");



let hour = 0;
let minutes = 0;
let seconds = 0;
let tierces = 0;

function updateChrono() {
    hourContent.textContent = hour.toString().padStart(2, '0');
    minutesContent.textContent = minutes.toString().padStart(2, '0');
    secondsContent.textContent = seconds.toString().padStart(2, '0');
    tiercesContent.textContent = tierces.toString().padStart(2, '0');
           
    }
    
function chrono() {
    let interval = setInterval(() => {
    tierces++;
    if(tierces === 100) {
        seconds++;
        tierces = 0;
        }
    
    if(seconds === 60) {
        minutes++;
        seconds = 0;
        }
    
    if(minutes === 60) {
        hour++;
        minutes = 0;
        }
   updateChrono();
   }, 10);
   
   return interval;
   }
   
startBtn.addEventListener('click', () => {
    let chronoInterval = chrono();
    pauseBtn.addEventListener('click', () => {
        clearInterval(chronoInterval);
        });
        
    resetBtn.addEventListener('click', () => {
        tierces = 0;
        seconds = 0;
        minutes = 0;
        hour = 0;
        updateChrono();
        });
    });

