import Ship from "./Ship";

class Gameboard {
  constructor() {
    this.ships = [];
    this.missedAttacks = [];
    this.board = [];
    for (let i = 0; i < 10; i++) {
      let row = []
      for (let j = 0; j < 10; j++) {
        let cell = {ship: null, isHit: false}
        row.push(cell)
      }
      this.board.push(row);
    }
  }
  placeShip(ship, x, y, direction = "horizontal") {
    // Swap coordinates depending on direction
    const dx = direction === "vertical" ? 1 : 0;
    const dy = direction === "horizontal" ? 1 : 0;

    // Duplicate check
    if (this.ships.includes(ship)) {
      throw Error("Ship already placed.");
    }
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
    this.ships.push(ship);
  }
  receiveAttack(x, y) {
    const cell = this.board[x][y];
    if (cell && cell.isHit) {
      return;
    }
    if (cell instanceof Ship) {
      cell.hit();
      this.board[x][y] = { ship: cell, isHit: true };
    } else {
      this.missedAttacks.push([x, y]);
    }
  }
  areAllShipsSunk() {
    if(this.ships.length===0) {
      return false
    }
    return this.ships.every(ship=>ship.isSunk())
  }
}
export default Gameboard;
