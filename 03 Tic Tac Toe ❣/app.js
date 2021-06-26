const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle'
const WINNING_COMBINATION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6], // Winning combination of the tic tac toe
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
let circleTurn

//Selecting DOM elements using DOM APIs.
const cellElements = document.querySelectorAll('[data-cell]') // selects All each cell in grid.
const board = document.getElementById('board')  // selects the board.
const winningMessageElement = document.getElementById('winningMessage')
const restartButton = document.getElementById('restartButton')
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')

//StartGame Function
function startGame() {
    winningMessageElement.classList.remove('show') // make sure the winning message is hidden.
    circleTurn = false // set the circleTurn to false so the X player will be first one to start the game.
    cellElements.forEach(cell => {
        //remove the class's
        cell.classList.remove(X_CLASS)
        cell.classList.remove(CIRCLE_CLASS)
        //remove the event listener if has any.
        cell.removeEventListener('click', handleClick)
        //add the event listener which executes only once.
        cell.addEventListener('click', handleClick, {
            once: true
        })
    })
}

// when cell is clicked handleClick will be triggered.
function handleClick(e) {
    // mapping which cell need to marked with what value,
    let cell = e.target
    const currnetClass = circleTurn ? CIRCLE_CLASS : X_CLASS
    placeMark(cell, currnetClass)
    // check if the player is win.
    if (checkWin(currnetClass)) {
        endGame(false) // false -> draw or not.
    } else if (isDraw()) {
        endGame(true)
    } else {
        swapTurn() // swap the turn 
        setBoardHoverClass() // swap the hover effect.
    }

}


function checkWin(currnetClass) {
    return WINNING_COMBINATION.some(combination => {
        // some returns true if any of the combination pass the condition.
        return combination.every(index => {
            // every returns true if all the index in the combination pass the condition.
            return cellElements[index].classList.contains(currnetClass)
        })
    })
}

//places mark to the cell
function placeMark(cell, currnetClass) {
    cell.classList.add(currnetClass)
}

//swap the turn of the player.
function swapTurn() {
    circleTurn = !circleTurn
}

//checks if the match is draw.
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}

//decides the board hover effect 
function setBoardHoverClass() {
    board.classList.remove(X_CLASS)
    board.classList.remove(CIRCLE_CLASS)
    circleTurn ? board.classList.add(CIRCLE_CLASS) : board.classList.add(X_CLASS)
}

//endGame
function endGame(isdraw) {
    console.log(`draw ${isdraw} ${winningMessageTextElement}`)
    if (isdraw) {
        winningMessageTextElement.innerText = 'Draw!'
    } else {
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

restartButton.addEventListener('click', startGame)



startGame()
setBoardHoverClass()