const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("reset");

let currentPlayer = "X";
let gameActive = true;
let gameState = Array(9).fill("");

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function createBoard() {
  board.innerHTML = "";
  gameState = Array(9).fill("");
  currentPlayer = "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
  gameActive = true;

  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.className = "cell";
    cell.dataset.index = i;
    cell.addEventListener("click", onCellClick, { once: true });
    board.appendChild(cell);
  }
}

function onCellClick(e) {
  const index = +e.target.dataset.index;
  if (!gameActive || gameState[index]) return;

  gameState[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    statusText.textContent = `Player ${currentPlayer} Wins! 🎉`;
    gameActive = false;
    lockBoard();
    return;
  }

  if (!gameState.includes("")) {
    statusText.textContent = "It's a Draw! 🤝";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function checkWin(player) {
  return winPatterns.some(pattern =>
    pattern.every(i => gameState[i] === player)
  );
}

function lockBoard() {
  // remove listeners so no more moves allowed
  [...board.children].forEach(cell => {
    const cloned = cell.cloneNode(true);
    cloned.textContent = cell.textContent;
    board.replaceChild(cloned, cell);
  });
}

resetBtn.addEventListener("click", createBoard);

createBoard();
