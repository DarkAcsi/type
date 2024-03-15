var newGame = document.getElementById("new_game");
var playGame = document.getElementById("play_game");
var restartGame = document.getElementById("restart_game");
var buttonExit = document.getElementById("exit");
var buttonRestart = document.getElementById("restart");
var buttonBot = document.getElementById("bot");
var buttonPlayer = document.getElementById("player");
var orderStep = document.getElementById("order_step");
var cells = [];
var _loop_1 = function (index) {
    var button = document.getElementById(index.toString());
    cells.push([button, null]);
    button.addEventListener("click", function () { return DoStep(index); });
};
for (var index = 0; index < 9; index++) {
    _loop_1(index);
}
buttonRestart.addEventListener("click", function () { return RestartGame(true); });
buttonExit.addEventListener("click", ExitGame);
var withBot = false;
var countSteps = 0;
var order = 0;
function PlayGame(bot) {
    newGame.style.display = "none";
    playGame.style.display = "inline";
    if (bot) {
        var firstStep = document.getElementById("first_step");
        order = Math.round(Math.random());
        firstStep.textContent = "\u0412\u044B \u0445\u043E\u0434\u0438\u0442\u0435: ".concat(order + 1);
        if (order == 1)
            DoStepBot();
    }
    else {
        orderStep.style.display = "inline";
        orderStep.textContent = "Ход 1 игрока";
    }
    withBot = bot;
}
function RestartGame(restart) {
    countSteps = 0;
    for (var index = 0; index < 9; index++) {
        cells[index][0].style.backgroundImage = "";
        cells[index][0].disabled = false;
        cells[index][1] = null;
    }
    orderStep.style.display = "none";
    restartGame.style.display = "none";
    if (restart)
        PlayGame(withBot);
}
function ExitGame() {
    RestartGame(false);
    newGame.style.display = "inline";
    playGame.style.display = "none";
}
function EndGame(winner) {
    playGame.style.display = "none";
    orderStep.style.display = "none";
    restartGame.style.display = "inline";
    var textWinner = document.getElementById("winner");
    var textWin = "Победил ";
    if (winner == -1)
        textWinner.textContent = "Ничья";
    if (!withBot)
        textWin += "игрок" + winner;
    else if (order + 1 == winner)
        textWin += "игрок";
    else
        textWin += "бот";
    textWinner.textContent = textWin;
}
function SomeoneWin() {
    if (((cells[4][1] == cells[0][1] && cells[0][1] == cells[8][1]))
        || ((cells[4][1] == cells[1][1] && cells[1][1] == cells[7][1]))
        || ((cells[4][1] == cells[2][1] && cells[2][1] == cells[6][1]))
        || ((cells[4][1] == cells[3][1] && cells[3][1] == cells[5][1])))
        return cells[4][1];
    if (((cells[2][1] == cells[1][1] && cells[1][1] == cells[0][1]))
        || ((cells[2][1] == cells[5][1] && cells[5][1] == cells[8][1])))
        return cells[2][1];
    if (((cells[6][1] == cells[3][1] && cells[3][1] == cells[0][1]))
        || ((cells[6][1] == cells[7][1] && cells[7][1] == cells[8][1])))
        return cells[6][1];
    return null;
}
function DoStepBot() {
    var freeCells = [];
    for (var index = 0; index < 9; index++) {
        if (!cells[index][1]) {
            cells[index][1] = countSteps % 2 + 1;
            if (SomeoneWin()) {
                return DoStep(index, false);
            }
            cells[index][1] = null;
            freeCells.push(index);
        }
    }
    if (freeCells.length == 0)
        EndGame(-1);
    else {
        var id = freeCells[Math.floor(Math.random() * freeCells.length) % freeCells.length];
        DoStep(id, false);
    }
}
function DoStep(id, bot) {
    if (bot === void 0) { bot = true; }
    if (countSteps % 2)
        cells[id][0].style.backgroundImage = "url(img/circle.png)";
    else
        cells[id][0].style.backgroundImage = "url(img/cross.png)";
    cells[id][0].disabled = true;
    cells[id][1] = countSteps % 2 + 1;
    var winner = SomeoneWin();
    if (winner)
        EndGame(winner);
    countSteps++;
    if (!withBot)
        orderStep.textContent = "Ход " + ((countSteps) % 2 + 1).toString() + " игрока";
    if (withBot && bot)
        DoStepBot();
}
buttonBot.addEventListener("click", function () { return PlayGame(true); });
buttonPlayer.addEventListener("click", function () { return PlayGame(false); });
