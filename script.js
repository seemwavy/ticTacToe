const turn = document.getElementById("turnBox")
const startButton = document.getElementById("start")
const gameBoard = {
field: []
}
const cells = document.getElementsByClassName("cells");
class Player {
    constructor(playerName) {
        this.moves = [];
        this.playerName = playerName;
        this.logMove = (selection) => {
            this.moves.push(selection);
        };
    }
};
const player1 = new Player([]);
const player2 = new Player([]);
const eitherPlayer = (player1 || player2)
function takeName() {
    let name1 = prompt("Player 1, enter your name")
    let name2 = prompt("Player 2, enter your name")
    player1.playerName = name1
    player2.playerName = name2
}
function markSelection(e, selection) {
    if(turn.innerHTML == player1.playerName + " Turn") {
    e.textContent = "X"
    turn.innerHTML = player2.playerName + " Turn"
    player1.logMove(selection)
    }
    else if(turn.innerHTML == player2.playerName +  " Turn") {
        e.textContent = "O"
        player2.logMove(selection)
        turn.innerHTML = player1.playerName + " Turn"
    }
}   
function startGame() {
    takeName()
    startButton.innerHTML = "Start Over" 
    startButton.addEventListener("click", () => {
        clearBoard()
    } )
    turn.innerHTML = player1.playerName + " Turn"
    for (let cell of cells) {
        cell.addEventListener("click", (event) => {
            var e = event.target
            let mark = e.textContent
            var selection = cell.id //this works\ 
            if (mark == "") {
            markSelection(e, selection)
            win()
            }
        })
    }
}     
function clearBoard() {
    player1.moves = []
    player2.moves = []
    turn.innerHTML = player1.playerName + " Turn"
    for (let cell of cells) {
        cell.textContent = ""
    }
}
startButton.addEventListener("click", () => {
    startGame()
   })
function win () {
    const winmessage = () => {
        if(turn.innerHTML == player2.playerName + " Turn") {
            alert(player1.playerName + " Wins!")
        }
        else if (turn.innerHTML ==  player1.playerName + " Turn") {
            alert( player2.playerName + " Wins!")
        }
    }
    if (turn.innerHTML == player2.playerName + " Turn") {
        let either = JSON.stringify(player1.moves)
        winEval(either)
    }
    else if (turn.innerHTML == player1.playerName + " Turn") {
        let either = JSON.stringify(player2.moves)
        winEval(either)
    }
    function winEval(either) { 
        if (either.includes("a1") && either.includes("a2") && either.includes("a3") || either.includes("a1") &&
        either.includes("b1") && either.includes("c1") ||
        either.includes("a1") && either.includes("b2") && either.includes("c3")) {
                winmessage()
            }
            
        else if (either.includes("b3") && either.includes("a3") && either.includes("c3") || either.includes("b3") && 
        either.includes("b1") && either.includes("b2")) {
            winmessage
        }
        else if (either.includes("c2") && either.includes("c1") && either.includes("c3") ||
        either.includes("c2") && either.includes("a2") && either.includes("b2")) {
            winmessage()
        }
        else if (either.includes("b2") && either.includes("a2") && either.includes("c2") ||
        either.includes("b2") && either.includes("a3") && either.includes("c1") ) {
           winmessage()
        }
        else if (player1.moves.length == 5 || player2.moves.length == 5) {
            alert("Tie!")
        }
    }
}