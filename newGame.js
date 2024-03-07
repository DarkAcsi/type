var newGame = document.getElementById("new_game");
var playGame = document.getElementById("play_game");
var restartGame = document.getElementById("restart_game");
var buttonBot = document.getElementById("bot");
var buttonPlayer = document.getElementById("player");
var orderStep = document.getElementById("order_step");
var cells = [];
var placeGame = document.getElementById("place_game");
var _loop_1 = function (index) {
    var div = document.createElement("div");
    placeGame.append(div);
    var _loop_2 = function (index2) {
        var button = document.createElement("button");
        button.setAttribute("id", (index * 3 + index2).toString());
        button.setAttribute("class", "cell");
        div.append(button);
        console.log(button);
        cells.push([button, null]);
        button.addEventListener("click", function () { return DoStep(cells[index * 3 + index2]); });
        console.log(cells[index * 3 + index2]);
    };
    for (var index2 = 0; index2 < 3; index2++) {
        _loop_2(index2);
    }
};
for (var index = 0; index < 3; index++) {
    _loop_1(index);
}
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
    withBot = bot;
}
function RestartGame(restart) {
    countSteps = 0;
    for (var index = 0; index < 9; index++) {
        cells[index][0].style.backgroundImage = "none";
        cells[index][0].disabled = false;
        cells[index][1] = null;
    }
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
            if (countSteps % 2)
                cells[index][0].style.backgroundImage = "img/circle.png";
            else
                cells[index][0].style.backgroundImage = "img/cross.png";
            var winner = SomeoneWin();
            if (winner)
                return EndGame(winner);
            else {
                cells[index][0].style.backgroundImage = "none";
                freeCells.push(cells[index]);
            }
        }
    }
    if (freeCells.length == 0)
        EndGame(-1);
    else
        DoStep(freeCells[Math.floor(freeCells.length)]);
}
function DoStep(cell) {
    if (countSteps % 2)
        cell[0].style.backgroundImage = "img/circle.png";
    else
        cell[0].style.backgroundImage = "img/cross.png";
    cell[0].disabled = true;
    cell[1] = countSteps % 2;
    var winner = SomeoneWin();
    if (winner)
        EndGame(winner);
    countSteps++;
    if (withBot)
        DoStepBot();
}
buttonBot.addEventListener("click", function () { return PlayGame(true); });
buttonPlayer.addEventListener("click", function () { return PlayGame(false); });
