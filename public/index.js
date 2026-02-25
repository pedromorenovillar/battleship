import Gameboard from "../src/Gameboard.js";
import Game from "../src/Gameplay.js";

// Create a new Game
const game = new Game();

// Render boards
const playerBoardContainer = document.getElementById('player-board')
const CPUBoardContainer = document.getElementById('cpu-board')

createBoard(playerBoardContainer)
createBoard(CPUBoardContainer)

// Attach click listeners

// Update DOM after every move

function createBoard(container) {
  container.innerHTML = "";

  for (let row = 0; row < 10; row ++) {
    for (let col = 0; col < 10; col++) {
      const cell = document.createElement("div")
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.classList.add("cell")

      container.appendChild(cell)
    }
  }
}

function updateBoard(container, gameboard, showShips=false) {
  const cells = container.querySelectorAll(".cell");

  cells.forEach(cell => {
    const row = Number(cell.dataset.row)
    const col = Number(cell.dataset.col)

    const boardCell = gameboard.board[row][col]
    cell.classList.remove("hit", "miss", "ship")

    if (boardCell.isHit && boardCell.ship) {
      cell.classList.add("hit")    
    } else if (boardCell.isHit && !boardCell.ship) {
      cell.classList.add("miss")
    } else if (showShips && boardCell.ship) {
      cell.classList.add("ship")
    }
  });
}