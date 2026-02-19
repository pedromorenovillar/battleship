class Gameboard {
  constructor() {
    this.board = [];
    for (let i = 0; i < 10; i++) {
      let row = new Array(10).fill(null);
      this.board.push(row);
    }
  }
}
export default Gameboard;
