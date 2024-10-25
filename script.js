const board = document.getElementById("board");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
let cells = Array.from(document.querySelectorAll(".cell"));
let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Initialize the game
function initializeGame() {
  cells.forEach(cell => {
    cell.addEventListener("click", cellClicked);
    cell.classList.remove("winning-cell"); // Reset winning color
  });
  restartBtn.addEventListener("click", restartGame);
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

// Handle cell click event
function cellClicked(e) {
  const cell = e.target;
  const index = cell.dataset.index;

  if (gameBoard[index] !== "" || checkWinner()) return;

  gameBoard[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add(currentPlayer); // Add color class based on player

  if (checkWinner()) {
    highlightWinningCells();
    statusText.textContent = `Player ${currentPlayer} wins!`;
  } else if (gameBoard.every(cell => cell !== "")) {
    statusText.textContent = "It's a tie!";
  } else {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
}

// Check for winner
function checkWinner() {
  return winningCombinations.some(combination => {
    return combination.every(index => gameBoard[index] === currentPlayer);
  });
}

// Highlight the winning cells in red
function highlightWinningCells() {
  winningCombinations.forEach(combination => {
    if (combination.every(index => gameBoard[index] === currentPlayer)) {
      combination.forEach(index => {
        cells[index].classList.add("winning-cell");
      });
    }
  });
}

// Restart the game
function restartGame() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.className = "cell"; // Reset all cell classes
  });
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

initializeGame();
