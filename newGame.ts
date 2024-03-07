const newGame = document.getElementById("new_game") as HTMLDivElement
const playGame = document.getElementById("play_game") as HTMLDivElement
const restartGame = document.getElementById("restart_game") as HTMLDivElement
const buttonBot = document.getElementById("bot") as HTMLButtonElement
const buttonPlayer = document.getElementById("player") as HTMLButtonElement
const orderStep = document.getElementById("order_step") as HTMLOutputElement
const cells:[string, number|null][] = [] 
const placeGame = document.getElementById("place_game") as HTMLDivElement
for (let index = 0; index < 3; index++) {
    let div = document.createElement("div")
    placeGame.append(div)
    for (let index2 = 0; index2 < 3; index2++) {
        let button = document.createElement("button")
        let id = (index*3+index2).toString()
        button.setAttribute("id", id)
        button.setAttribute("class", "cell")
        div.append(button)
        cells.push([id, null]);
        button.addEventListener("click", () => DoStep(id))
    }
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

function DoStepBot(id:string){
    let freeCells:[string, number|null][] = []
    for (let index = 0; index < 9; index++) {
        if (!cells[index][1]) {
            if (countSteps % 2) cells[index][0].style.backgroundImage = "img/circle.png"
            else cells[index][0].style.backgroundImage = "img/cross.png"
            let winner = SomeoneWin()
            if (winner) return EndGame(winner)
            else {
                cells[index][0].style.backgroundImage = "none"
                freeCells.push(cells[index])
            }
        }
    }
    if (freeCells.length == 0) EndGame(-1)
    else DoStep(freeCells[Math.floor(freeCells.length)])
}

function DoStep(id:string){
    if (countSteps % 2) cell[0].style.backgroundImage = "img/circle.png"
    else cell[0].style.backgroundImage = "img/cross.png"
    cell[0].disabled = true
    cell[1] = countSteps % 2
    let winner = SomeoneWin()
    if (winner) EndGame(winner)
    countSteps++
    if (withBot) DoStepBot()
}


buttonBot.addEventListener("click", () => PlayGame(true))
buttonPlayer.addEventListener("click", () => PlayGame(false))

