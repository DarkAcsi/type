const newGame = document.getElementById("new_game") as HTMLDivElement
const playGame = document.getElementById("play_game") as HTMLDivElement
const restartGame = document.getElementById("restart_game") as HTMLDivElement
const buttonBot = document.getElementById("bot") as HTMLButtonElement
const buttonPlayer = document.getElementById("player") as HTMLButtonElement
const orderStep = document.getElementById("order_step") as HTMLOutputElement
const cells:[HTMLButtonElement, number|null][] = [] 
for (let index = 0; index < 9; index++) {
    let button = document.getElementById(index.toString()) as HTMLButtonElement
    cells.push([button, null]);
    button.addEventListener("click", () => DoStep(index))
}
let withBot = false
let countSteps = 0
let order = 0

function PlayGame(bot:boolean) {
    newGame.style.display = "none"
    playGame.style.display = "inline"
    if (bot){
        const firstStep = document.getElementById("first_step") as HTMLOutputElement
        order = Math.round(Math.random())
        firstStep.textContent = `Вы ходите: ${order + 1}`
        if (order == 1) DoStepBot()
    }
    withBot = bot
}

function RestartGame(restart:boolean){
    countSteps = 0
    for (let index = 0; index < 9; index++) {
        cells[index][0].style.backgroundImage = "none"
        cells[index][0].disabled = false
        cells[index][1] = null
    }
    restartGame.style.display = "none"
    if (restart) PlayGame(withBot)
}

function ExitGame(){
    RestartGame(false)
    newGame.style.display = "inline"
    playGame.style.display = "none"
}

function EndGame(winner){

}

function SomeoneWin():null|number{
    if (((cells[4][1] == cells[0][1] && cells[0][1] == cells[8][1]))
        || ((cells[4][1] == cells[1][1] && cells[1][1] == cells[7][1]))
        || ((cells[4][1] == cells[2][1] && cells[2][1] == cells[6][1]))
        || ((cells[4][1] == cells[3][1] && cells[3][1] == cells[5][1])))
        return cells[4][1]
    if (((cells[2][1] == cells[1][1] && cells[1][1] == cells[0][1]))
        || ((cells[2][1] == cells[5][1] && cells[5][1] == cells[8][1])))
        return cells[2][1]
    if (((cells[6][1] == cells[3][1] && cells[3][1] == cells[0][1]))
        || ((cells[6][1] == cells[7][1] && cells[7][1] == cells[8][1])))
        return cells[6][1]
    return null
}

function DoStepBot(){
    let freeCells:number[] = []
    for (let index = 0; index < 9; index++) {
        if (!cells[index][1]) {
            freeCells.push(index)
        }
    }
    if (freeCells.length == 0) EndGame(-1)
    else {
        let id = freeCells[Math.floor(Math.random()*freeCells.length)%freeCells.length]
        DoStep(id, false)
    }
}

function DoStep(id:number, bot:boolean=true){
    if (countSteps % 2) cells[id][0].style.backgroundImage = "img/circle.png"
    else cells[id][0].style.backgroundImage = "img/cross.png"
    cells[id][0].disabled = true
    cells[id][1] = countSteps % 2
    let winner = SomeoneWin()
    if (winner) EndGame(winner)
    countSteps++
    if (withBot && bot) DoStepBot()
}


buttonBot.addEventListener("click", () => PlayGame(true))
buttonPlayer.addEventListener("click", () => PlayGame(false))

