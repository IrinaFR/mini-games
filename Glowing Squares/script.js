const board = document.getElementById('board'),
qtySquare = document.getElementById('qty-square'),
btnCreate = document.querySelector('.create'),
maxSquare = 700;



btnCreate.addEventListener('click', () => {
    board.innerHTML = ''
    if(qtySquare.value <= maxSquare){
        for(let i = 0; i < qtySquare.value; i++){
            const square = document.createElement('div')
            square.classList.add('square')
            square.addEventListener('mouseover', () => {
                setColor(square)
            })
    
            square.addEventListener('mouseleave', () => {
                removeColor(square)
            })
    
            board.append(square)
        }
    } else {
        for(let i = 0; i < maxSquare; i++){
            const square = document.createElement('div')
            square.classList.add('square')
            square.addEventListener('mouseover', () => {
                setColor(square)
            })
    
            square.addEventListener('mouseleave', () => {
                removeColor(square)
            })
    
            board.append(square)
        }
        qtySquare.value = maxSquare
    }
})

let color = ['#4047A8','#40F6A8','#F68C40','#EA2B2B','#CA13AC','#F3C017']

function setColor(element){
    let getrandom =Math.floor( Math.random() * (color.length))
    element.style.backgroundColor = color[getrandom]
    element.style.boxShadow = `0 0 2px ${color[getrandom]}, 0 0 10px ${color[getrandom]}`
}

function removeColor(element){
    element.style.backgroundColor = '#1d1d1d'
    element.style.boxShadow = '0 0 2px #1d1d1d'
}

