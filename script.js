const submitBtn = document.getElementById("submit");
const playerForm = document.getElementById("player-form");
const game = document.getElementById("game");
const message = document.querySelector(".message");
const cells = document.querySelectorAll(".cell");

let player1 = "";
let player2 = "";
let currentPlayer = "";
let currentSymbol = "X";
let board = ["", "", "", "", "", "", "", "", ""];

const winningCombos = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

// Handle submit
submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player-1").value;
  player2 = document.getElementById("player-2").value;

  if (!player1 || !player2) return;

  currentPlayer = player1;
  message.textContent = `${currentPlayer}, you're up`;

  playerForm.style.display = "none";
  game.style.display = "block";
});

// Handle cell click
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

    togglePlayer();
  });
});

function togglePlayer() {
  if (currentPlayer === player1) {
    currentPlayer = player2;
    currentSymbol = "O";
  } else {
    currentPlayer = player1;
    currentSymbol = "X";
  }
  message.textContent = `${currentPlayer}, you're up`;
}

function checkWin() {
  return winningCombos.some(combo =>
    combo.every(index => board[index] === currentSymbol)
  );
}

function disableBoard() {
  cells.forEach(cell => cell.style.pointerEvents = "none");
}
