//your JS code here. If required.
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

const winningPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

// Start game
submitBtn.addEventListener("click", () => {
  player1 = document.getElementById("player-1").value;
  player2 = document.getElementById("player-2").value;

  if (player1 === "" || player2 === "") return;

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
      cells.forEach(c => c.style.pointerEvents = "none");
      return;
    }

    // switch player
    if (currentSymbol === "X") {
      currentSymbol = "O";
      currentPlayer = player2;
    } else {
      currentSymbol = "X";
      currentPlayer = player1;
    }

    message.textContent = `${currentPlayer}, you're up`;
  });
});

function checkWin() {
  return winningPatterns.some(pattern =>
    pattern.every(i => board[i] === currentSymbol)
  );
}
