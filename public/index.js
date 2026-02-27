import Gameboard from "../src/Gameboard.js";
import Game from "../src/Gameplay.js";
import Ship from "../src/Ship.js";

// Create a new Game
const game = new Game();

const fleet = [5, 4, 3, 3, 2];
let currentShipIndex = 0;

// Render boards
const playerBoardContainer = document.getElementById("player-board");
const CPUBoardContainer = document.getElementById("cpu-board");

createBoard(playerBoardContainer);
createBoard(CPUBoardContainer);
renderBoards();

// Attach click listeners
CPUBoardContainer.addEventListener("click", handleClick);
playerBoardContainer.addEventListener("click", placeShips);

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

    if (boardCell.isHit && boardCell.ship) {
      cell.classList.add("hit");
    } else if (boardCell.isHit && !boardCell.ship) {
      cell.classList.add("miss");
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
  if (game.currentPlayer.isCPU && !game.isGameOver) {
    setTimeout(() => {
      game.attack();
      renderBoards();
    }, 500);
  }
  renderBoards();
}

function renderBoards() {
  updateBoard(playerBoardContainer, game.players[0].gameboard, true);
  updateBoard(CPUBoardContainer, game.players[1].gameboard, false);
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
  if (currentShipIndex === fleet.length) return

  try {
    const cell = e.target;
    const row = Number(e.target.dataset.row);
    const col = Number(e.target.dataset.col);
    console.log(fleet[currentShipIndex]);

    const ship = new Ship(fleet[currentShipIndex]);
    game.placeShip(game.players[0], ship, row, col);
    currentShipIndex++;
    renderBoards();
  } catch (error) {
    console.error(error);
  }
}
