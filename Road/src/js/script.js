const game = () => {
    const score = document.querySelector('.score'),
        start = document.querySelector('.start'),
        gameArena = document.querySelector('.gameArena'),
        stop = document.querySelector('.stop'),
        car = document.createElement('div'),
        myCar = document.querySelector('.my-care');
    let record = 0;

//change button start/stop
    start.addEventListener('click', () => {
        start.classList.add('hide');
        stop.classList.remove('hide');
        gameArena.innerHTML = '';
        car.style.left = '300px';
        car.style.top = 'auto';
        car.style.bottom = '10px';
        if (record < setting.score) {
        record = setting.score;
        };
        document.querySelector('.record').innerHTML = `<b>Рекорд: ${record}</b>`;

        const getAmountElements = (heightElement) => {
            return document.documentElement.clientHeight / heightElement + 1;
         }

        for (let i = 0; i < getAmountElements(20); i++) {
            const line = document.createElement('div');
            line.classList.add('line');
            line.style.top = (i * 75) + 'px';
            line.y = i * 100;
            gameArena.appendChild(line);
        }
         
        for (let i = 0; i < getAmountElements(100 * setting.traffic); i++) {
            const enemy = document.createElement('div');
            enemy.classList.add('enemy');
            enemy.y = -170 * setting.traffic * (i + 1);
            enemy.style.left = Math.round(Math.random() * (gameArena.offsetWidth - 90)) + 'px';
            enemy.style.top = enemy.y + 'px';
            gameArena.appendChild(enemy);
        }
        setting.score = 0;
        setting.start = true;
        gameArena.appendChild(car).classList.add('my-care');
        setting.x = car.offsetLeft;
        setting.y = car.offsetTop;
        requestAnimationFrame(playGame);
    });
    stop.addEventListener('click', () => {
        stop.classList.add('hide');
        start.classList.remove('hide');
        setting.start = false;
        gameArena.textContent = '';
        if (record < setting.score) {
        record = setting.score;
        }
        document.querySelector('.record').innerHTML = `<b>Рекорд: ${record}</b>`;
    })

const setting = {
    start: false,
    score: 0,
    speed: 3,
    traffic: 3
}

//animation
const playGame = () => {
    
    if (setting.start === true) {
        setting.score += setting.speed;
        score.textContent = `Ваш счёт: ${setting.score}`;

        moveRoad();
        moveEnemy();
        if (keys.ArrowLeft && setting.x > 0) {
            setting.x -= setting.speed; 
        }
        if (keys.ArrowRight && setting.x < (gameArena.offsetWidth - car.offsetWidth)) {
            setting.x += setting.speed;
        }
        if (keys.ArrowDown && setting.y <  (gameArena.offsetHeight - car.offsetHeight)) {
            setting.y += setting.speed;
        }
        if (keys.ArrowUp && setting.y > 0) {
            setting.y -= setting.speed;
        }

        car.style.left = setting.x + 'px';
        car.style.top = setting.y + 'px';

     requestAnimationFrame(playGame);
    }
}

const moveRoad = () => {
    let lines = document.querySelectorAll('.line');
    lines.forEach(item => {
        item.y += setting.speed + 2;
        item.style.top = item.y + 'px';
        if (item.y >= document.documentElement.clientHeight) {
            item.y = -100;
        }
    });
};

const moveEnemy = () => {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach((item) => {
        let carRect = car.getBoundingClientRect();
        let enemyRect = item.getBoundingClientRect();
        if (carRect.top <= enemyRect.bottom && carRect.right >= enemyRect.left && carRect.left <= enemyRect.right && carRect.bottom >= enemyRect.top) {
            console.log('ДТП');
            setting.start = false;
            stop.classList.add('hide');
            start.classList.remove('hide');
        }
        item.y += setting.speed;
        item.style.top = item.y + 'px';
        if (item.y >= document.documentElement.clientHeight) {
            item.y = -200 * 2 * setting.traffic;
            item.style.left = Math.round(Math.random() * (gameArena.offsetWidth - 90)) + 'px';
        }
    });
    
};

    const keys = {
        ArrowUp: false,
        ArrowDown: false,
        ArrowRight: false,
        ArrowLeft: false
    };

//button click event
    document.addEventListener('keydown', event => {
        event.preventDefault();
        keys[event.key] = true;
    });

//button release event
    document.addEventListener('keyup', event => {
        event.preventDefault();
        keys[event.key] = false;
    })

}

game();






/* 
    for (let number = 0; number < 1000; number++) {
        if (number % 3 === 0) {
            if (number % 5 === 0) {
                continue;
            } else {
                let summ = 0;
                let numArr = String(number).split('');
                for (let i = 0; i < numArr.length; i++) {
                    summ += Number(numArr[i]);
                }
                if (summ < 10) {
                     console.log(`Само число: ${number}, сумма: ${summ}`);  
                     console.log('Само число: ' + number + ' сумма: ' + summ);    
                }
            }
        }
        
    } */