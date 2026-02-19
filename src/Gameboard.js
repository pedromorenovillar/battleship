import Ship from "./Ship";

class Gameboard {
  constructor() {
    this.missedAttacks = []
    this.board = [];
    for (let i = 0; i < 10; i++) {
      let row = new Array(10).fill(null);
      this.board.push(row);
    }
  }
  placeShip(ship, x, y, direction = "horizontal") {
    // Swap coordinates depending on direction
    const dx = direction === "vertical" ? 1 : 0;
    const dy = direction === "horizontal" ? 1 : 0;

    // Bounds check
    if (x + dx * (ship.length - 1) >= 10 || y + dy * (ship.length - 1) >= 10) {
      throw Error("Cannot place ship outside board.");
    }
    // Validation loop to check if all spots are free
    for (let i = 0; i < ship.length; i++) {
      const row = x + dx * i;
      const col = y + dy * i;
      if (this.board[row][col] !== null) {
        throw Error("Cannot place ship where there is already one.");
      }
    }
    // Placement loop
    for (let i = 0; i < ship.length; i++) {
      const row = x + dx * i;
      const col = y + dy * i;
      this.board[row][col] = ship;
    }
  }
  receiveAttack(x, y) {
    const cell = this.board[x][y]
    if(cell instanceof Ship) {
      cell.hit()
      this.board[x][y] = { ship: cell, isHit: true };
    } else {
      this.missedAttacks.push([x, y])
    }
  }
}
export default Gameboard;
