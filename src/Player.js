import Gameboard from "./Gameboard.js";

class Player {
  constructor(isCPU = false) {
    this.gameboard = new Gameboard();
    this.isCPU = isCPU;
    this.triedMoves = [];
  }
  attack(opponent, x, y) {
    opponent.gameboard.receiveAttack(x, y);
  }
  
  getRandomMove() {
    let x, y;

    do {
      x = Math.floor(Math.random() * 10);
      y = Math.floor(Math.random() * 10);
    } while (this.triedMoves.some(([r, c]) => r === x && c === y));
    this.triedMoves.push([x, y]);
    return [x, y];
  }
}

export default Player;
