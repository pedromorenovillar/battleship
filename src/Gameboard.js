class Gameboard {
  constructor() {
    this.board = [];
    for (let i = 0; i < 10; i++) {
      let row = new Array(10).fill(null);
      this.board.push(row);
    }
  }
  placeShip(ship, x, y) {
    this.board[x][y] = ship;
  }
}
export default Gameboard;
