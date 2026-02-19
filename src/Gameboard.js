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
  placeShip(ship, start, end, direction = "horizontal") {
    // Swap coordinates depending on direction
    const dStart = direction === "vertical" ? 1 : 0;
    const dEnd = direction === "horizontal" ? 1 : 0;

    // Bounds check
    if (start + dStart * (ship.length - 1) >= 10 || end + dEnd * (ship.length - 1) >= 10) {
      throw Error("Cannot place ship outside board.");
    }
    // Validation loop to check if all spots are free
    for (let i = 0; i < ship.length; i++) {
      const row = start + dStart * i;
      const col = end + dEnd * i;
      if (this.board[row][col] !== null) {
        throw Error("Cannot place ship where there is already one.");
      }
    }
    // Placement loop
    for (let i = 0; i < ship.length; i++) {
      const row = start + dStart * i;
      const col = end + dEnd * i;
      this.board[row][col] = ship;
    }
  }
  receiveAttack(x, y) {
    const cell = this.board[x][y]
    if(cell instanceof Ship) {
      cell.hit()
    } else {
      this.missedAttacks.push([x, y])
    }
  }
}
export default Gameboard;
