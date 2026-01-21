hour = document.querySelector('.hour');
minutes = document.querySelector('.minutes');
seconds = document.querySelector('.seconds');

function updateClock() {
    const date = new Date();
    hour.textContent = date.getHours().toString().padStart(2, '0');
    minutes.textContent = date.getMinutes().toString().padStart(2, '0');
    seconds.textContent = date.getSeconds().toString().padStart(2, '0');
    console.log('appel')
}

updateClock();

setInterval(updateClock, 1000);
