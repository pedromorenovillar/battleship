import Game from "../src/Gameplay.js";
import Ship from "../src/Ship.js";
import { fleet } from "../src/Gameplay.js";

// Create a new Game
let game = new Game();

let currentShipIndex = 0;
let currentDirection = "horizontal";

// Grab HTML elements
const playerBoardContainer = document.getElementById("player-board");
const CPUBoardContainer = document.getElementById("cpu-board");
const resetBtn = document.getElementById("reset-btn");
const infoMsg = document.getElementById("info-msg");
resetBtn.disabled = true;

createBoard(playerBoardContainer);
createBoard(CPUBoardContainer);
renderBoards();
let directionInfo = renderInitialInfo();

// Attach click listeners
CPUBoardContainer.addEventListener("click", handleClick);
playerBoardContainer.addEventListener("click", placeShips);
resetBtn.addEventListener("click", restartGame)
document.addEventListener("keydown", (event) => {
  const keyName = event.key;

  if (keyName === "r") {
    if (currentDirection === "horizontal") {
      currentDirection = "vertical";
    } else {
      currentDirection = "horizontal";
    }
  }
  updatePlacementInfo();
});

// Update DOM after every move

// Helper functions
function createBoard(container) {
  container.innerHTML = "";

  for (let row = 0; row < 10; row++) {
    for (let col = 0; col < 10; col++) {
      const cell = document.createElement("div");
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.classList.add("cell");

      container.appendChild(cell);
    }
  }
}

function updateBoard(container, gameboard, showShips = false) {
  const cells = container.querySelectorAll(".cell");

  cells.forEach((cell) => {
    const row = Number(cell.dataset.row);
    const col = Number(cell.dataset.col);

    const boardCell = gameboard.board[row][col];
    cell.classList.remove("hit", "miss", "ship");
    cell.textContent = ""
    if (boardCell.ship) {
    }

    if (boardCell.isHit && boardCell.ship) {
      cell.classList.add("hit");
      cell.textContent = "X";
    } else if (boardCell.isHit && !boardCell.ship) {
      cell.classList.add("miss");
      cell.textContent = "X";
    } else if (showShips && boardCell.ship) {
      cell.classList.add("ship");
    }
  });
}

function handleClick(e) {
  const cell = e.target;
  // Ignore click if not .cell class
  if (!cell.classList.contains("cell")) return;
  // Ignore click on game over or before game start
  if (game.isGameOver || !game.isGameStarted) return;
  // Ignore click on CPU's turn
  if (game.currentPlayer.isCPU) return;

  const row = Number(cell.dataset.row);
  const col = Number(cell.dataset.col);

  const result = game.attack(row, col);
  if (result === "hit") {
    infoMsg.textContent = "¡Tocado!";
  } else if (result === "miss") {
    infoMsg.textContent = "¡Agua!";
  }
  renderBoards();
  if (game.currentPlayer.isCPU && !game.isGameOver) {
    setTimeout(() => {
      game.attack();
      renderBoards();
    }, 500);
  }
}

function renderBoards() {
  if (game.isGameOver) {
    showGameOverMessage();
  }
  updateBoard(playerBoardContainer, game.players[0].gameboard, true);
  updateBoard(CPUBoardContainer, game.players[1].gameboard, true);
  toggleBoardInteraction();
}

function toggleBoardInteraction() {
  CPUBoardContainer.style.pointerEvents = game.currentPlayer.isCPU
    ? "none"
    : "auto";
}

function placeShips(e) {
  if (game.isGameStarted || game.isGameOver) return;
  if (!e.target.classList.contains("cell")) return;
  try {
    const row = Number(e.target.dataset.row);
    const col = Number(e.target.dataset.col);

    const ship = new Ship(fleet[currentShipIndex].length);
    game.placeShip(game.players[0], ship, row, col, currentDirection);
    currentShipIndex++;
    if (currentShipIndex === fleet.length) {
      game.autoPlaceCPUFleet();
      game.startGame();
      renderBoards();
      infoMsg.textContent = `¡Ahora ataca el tablero enemigo!`;
      return;
    }
    renderBoards();
    updatePlacementInfo();
  } catch (error) {
    console.error(error);
  }
}

function renderInitialInfo() {
  const infoHeader = document.createElement("h3");
  infoHeader.textContent = `Para empezar, despliega tu flota haciendo clic en tu tablero.`;
  infoMsg.appendChild(infoHeader);
  const directionInfo = document.createElement("h4");
  const directionChange = document.createElement("h5");
  directionChange.textContent = `Pulsa R para cambiar la dirección.`;

  directionInfo.textContent = `Colocarás un ${fleet[currentShipIndex].name} (${fleet[currentShipIndex].length} casillas) en ${currentDirection}.`;
  infoMsg.appendChild(directionInfo);
  infoMsg.appendChild(directionChange);
  return directionInfo;
}

function updatePlacementInfo() {
  if (currentShipIndex < fleet.length) {
    directionInfo.textContent = `Colocarás un ${fleet[currentShipIndex].name} (${fleet[currentShipIndex].length} casillas) en ${currentDirection}.`;
  }
}
function showGameOverMessage() {
  if (game.winner.isCPU) {
    infoMsg.textContent = `Has perdido...`;
  } else {
    infoMsg.textContent = "¡Has ganado!";
  }
  CPUBoardContainer.style.pointerEvents = "none";
  playerBoardContainer.style.pointerEvents = "none";
  resetBtn.disabled = false;
}
function restartGame() {
  // Recreate game
  game = new Game();

  // Reset placement variables
  currentShipIndex = 0;
  currentDirection = "horizontal";

  // Re-enable interactions
  playerBoardContainer.style.pointerEvents = "auto";
  CPUBoardContainer.style.pointerEvents = "auto";

  // Disable reset button
  resetBtn.disabled = true

  // Clear info container
  infoMsg.innerHTML = ""

  directionInfo = renderInitialInfo()
  renderBoards()
}
