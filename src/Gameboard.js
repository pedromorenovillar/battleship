class Gameboard {
  constructor() {
    this.board = [];
    for (let i = 0; i < 10; i++) {
      let row = new Array(10).fill(null);
      this.board.push(row);
    }
  }
  placeShip(ship, x, y, direction = "horizontal") {
    if (direction === "horizontal") {
      // Out of bounds validation
      if (y + ship.length > 10) {
        throw Error("Cannot place ship outside board.");
      }
      // Validation loop to check if all spots are free
      for (let i = 0; i < ship.length; i++) {
        if (this.board[x][y + i] !== null) {
          throw Error("Cannot place ship where there is already one.");
        }
      }
      // Placement loop
      for (let i = 0; i < ship.length; i++) {
        this.board[x][y + i] = ship;
      }
    } else if (direction === "vertical") {
      // Out of bounds validation
      if (x + ship.length > 10) {
        throw Error("Cannot place ship outside board.");
      }
      // Validation loop to check if all spots are free
      for (let i = 0; i < ship.length; i++) {
        if (this.board[x + i][y] !== null) {
          throw Error("Cannot place ship where there is already one.");
        }
      }
      // Placement loop
      for (let i = 0; i < ship.length; i++) {
        this.board[x + i][y] = ship;
      }
    }
  }
}
export default Gameboard;
