const btnStart = document.getElementById('start'),
modeGame = document.getElementById('time-list'),
timer = document.getElementById('time'),
board = document.getElementById('board'),
screens = document.querySelectorAll('.screen');

let time = 0,
score = 0

btnStart.addEventListener('click', (event) => {
    event.preventDefault()
    createRandomCircle()
    screens[0].classList.add('up')
})

modeGame.addEventListener('click', (event) => {
    if(event.target.classList.contains('time-btn')){
        time = Number(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', (event) => {
    if(event.target.classList.contains('circle')){
        score++
        event.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    setTime(time)
}

function decreaseTime(){
    if(time === 0){
        finishGame()
    } else{
        let current = --time
        if(current < 10){
            current = `0${current}`
        }
        setTime(current)
    }
    
}

function setTime(value){
    timer.innerHTML = `00:${value}`
}

function finishGame() {
    timer.parentNode.classList.add('hide')
    board.innerHTML = `<h1>Ваш счёт: <span class="primary">${score}</span></h1>`
}

let color = ['#4047A8','#40F6A8','#F68C40','#EA2B2B','#CA13AC','#F3C017']

function createRandomCircle(){
    board.innerHTML = `<div class="circle"></div>`
    const size = random(10, 60)
    const {width, height} = board.getBoundingClientRect()
    const x = random(0, width - size)
    const y = random(0, height - size)
    const getrandom = random(0, color.length-1)
    document.querySelector('.circle').style.backgroundColor = color[getrandom]
    document.querySelector('.circle').style.boxShadow = `0 0 2px ${color[getrandom]}, 0 0 10px ${color[getrandom]}`
    document.querySelector('.circle').style.width = `${size}px`
    document.querySelector('.circle').style.height = `${size}px`
    document.querySelector('.circle').style.top = `${y}px`
    document.querySelector('.circle').style.left = `${x}px`
}

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }