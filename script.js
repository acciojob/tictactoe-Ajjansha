const submitBtn = document.getElementById("submit");
const playerForm = document.getElementById("player-form");
const game = document.getElementById("game");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "x";
let board = ["", "", "", "", "", "", "", "", ""];

const wins = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player1").value;
  player2 = document.getElementById("player2").value;

  if (!player1 || !player2) return;

  currentPlayer = player1;
  currentSymbol = "x";
  message.textContent = `${currentPlayer}, you're up`;

  playerForm.style.display = "none";
  game.style.display = "block";
});

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => {
    if (cell.textContent !== "") return;

    cell.textContent = currentSymbol;
    board[index] = currentSymbol;

    if (checkWin()) {
      message.textContent = `${currentPlayer} congratulations you won!`;
      disableBoard();
      return;
    }

    switchTurn();
  });
});

function switchTurn() {
  if (currentPlayer === player1) {
    currentPlayer = player2;
    currentSymbol = "o";
  } else {
    currentPlayer = player1;
    currentSymbol = "x";
  }
  message.textContent = `${currentPlayer}, you're up`;
}

function checkWin() {
  return wins.some(combo =>
    combo.every(i => board[i] === currentSymbol)
  );
}

function disableBoard() {
  cells.forEach(cell => cell.style.pointerEvents = "none");
}
