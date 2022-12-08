const CROSS = "<img src='./assets/cross.png' alt='X'/>"
const CIRCLE = "<img src='./assets/circle.png' alt='O' />"

const cells = document.querySelectorAll(".cell")
const statusDisplay = document.querySelector("#status")
const resetBtn = document.querySelector("button")

let gameStatus = true
let checkList = ['','','','','','','','','']
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

let currentPlayer = 'X'
let oWinCount = 0
let xWinCount = 0


const reset = () => {
    currentPlayer = 'X'
    statusDisplay.innerHTML = displayMessage('start')

    cells.forEach((cell)=>{
        cell.innerHTML = ''
        cell.classList.remove('blink')
    })

    checkList.fill('')
    gameStatus = true
}

function displayMessage(status){
    switch(status){
        case 'start':
            return `GAME START! <br/> <span id='${currentPlayer}'>${currentPlayer}</span> Turn`
            break
        case 'win':
            return `GAME END! <br/> <span id='${currentPlayer}'>${currentPlayer}</span> Win`
            break
        case 'draw':
            return "GAME END! <br/> <span>Draw</span>"
            break
        default:
            return `GAME PLAYING.. <br/> <span id='${currentPlayer}'>${currentPlayer}</span> Turn!`
            break
    }
}

function checkResult(){

    let roundWin = false

    for(let i =0; i<=7; i++){
        const wincondition = winConditions[i]
        let a = checkList[wincondition[0]]
        let b = checkList[wincondition[1]]
        let c = checkList[wincondition[2]]

        if (a === '' || b === '' || c === '') {
            continue
        }

        if (a === b && b === c){
            statusDisplay.innerHTML = displayMessage('win')
            roundWin = true
            gameStatus = false

            // showing alert border in wining row
            cells.forEach((cell)=>{
                if (cell.id == wincondition[0] || cell.id == wincondition[1] || cell.id == wincondition[2]){
                    cell.classList.add('blink')
                }
            })

            break
        }

        if (!checkList.includes('')){
            statusDisplay.innerHTML = displayMessage('draw')
            roundWin = true
            gameStatus = false
        }
    }

    if(!roundWin){
        currentPlayer = (currentPlayer === 'X')? 'O': 'X'
        statusDisplay.innerHTML = displayMessage()
    }
}


function gameStart(){
    reset()

    cells.forEach(cell => {
        cell.addEventListener("click", (e) => {
            e.preventDefault();
    
            if(gameStatus){
                let cellNo = cell.getAttribute('id')
                cell.innerHTML = (currentPlayer === 'X')? CROSS: CIRCLE
                checkList[cellNo] = currentPlayer
                
                checkResult()
            }
        })
    })
    
    resetBtn.addEventListener("click", (e) => {
        e.preventDefault();
    
        reset()
    })
}

window.onload = gameStart()