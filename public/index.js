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