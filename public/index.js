import Gameboard from "../src/Gameboard.js";
import Game from "../src/Gameplay.js";
import Ship from "../src/Ship.js";
import { fleet } from "../src/Gameplay.js";

// Create a new Game
const game = new Game();

let currentShipIndex = 0;
let currentDirection = "horizontal";

// Render boards
const playerBoardContainer = document.getElementById("player-board");
const CPUBoardContainer = document.getElementById("cpu-board");
const resetBtn = document.getElementById('reset-btn')
resetBtn.disabled = true

const infoMsg = document.getElementById('info-msg')
const infoHeader = document.createElement("h2")
infoHeader.textContent = `Para empezar, despliega tu flota haciendo clic en tu tablero.`
const directionInfo = document.createElement("h4")
directionInfo.textContent = `Posición: ${currentDirection}. Pulsa R para cambiar la dirección.`

infoMsg.appendChild(infoHeader)
infoMsg.appendChild(directionInfo)

createBoard(playerBoardContainer);
createBoard(CPUBoardContainer);
renderBoards();

// Attach click listeners
CPUBoardContainer.addEventListener("click", handleClick);
playerBoardContainer.addEventListener("click", placeShips);
document.addEventListener("keydown", (event) => {
  const keyName = event.key;

  if (keyName === "r") {
    if (currentDirection === "horizontal") {
      currentDirection = "vertical";
    } else {
      currentDirection = "horizontal";
    }
  }
  directionInfo.textContent = `Posición: ${currentDirection}. Pulsa R para cambiar la dirección.`
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
    if (boardCell.ship) {
    }

    if (boardCell.isHit && boardCell.ship) {
      cell.classList.add("hit");
      cell.textContent = "X"
    } else if (boardCell.isHit && !boardCell.ship) {
      cell.classList.add("miss");
      cell.textContent = "X"
    } else if (showShips && boardCell.ship) {
      cell.classList.add("ship");
    }
  });
}

function handleClick(e) {
  const cell = e.target;

  // Ignore click if not .cell class
  if (!cell.classList.contains("cell")) return;
  // Ignore click on game over
  if (game.isGameOver) return;
  // Ignore click on CPU's turn
  if (game.currentPlayer.isCPU) return;

  const row = Number(cell.dataset.row);
  const col = Number(cell.dataset.col);

  game.attack(row, col);
  renderBoards();
  if (game.currentPlayer.isCPU && !game.isGameOver) {
    setTimeout(() => {
      game.attack();
      renderBoards();
    }, 500);
  }
}

function renderBoards() {
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
    infoHeader.textContent = `¡Has desplegado un ${fleet[currentShipIndex].name}!`
    currentShipIndex++;
    if (currentShipIndex === fleet.length) {
      game.autoPlaceCPUFleet();
      infoHeader.textContent = `¡Ahora ataca una casilla del tablero enemigo!`
      directionInfo.remove()
      game.startGame();
      renderBoards();
      return;
    }
    renderBoards();
  } catch (error) {
    console.error(error);
  }
}
