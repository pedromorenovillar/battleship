import Gameboard from "./Gameboard.js";

class Player {
  constructor(isCPU = false) {
    this.gameboard = new Gameboard();
    this.isCPU = isCPU;
    this.triedMoves = [];
    this.targetQueue = []
  }
  attack(opponent, x, y) {
    const result = opponent.gameboard.receiveAttack(x, y);
    if (this.isCPU == true) {
      if (result === "hit") {
        this.processHit(x, y)
      }
    }
    return result
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

  processHit(x, y) {
    this.targetQueue.push([x-1, y])
    this.targetQueue.push([x+1, y])
    this.targetQueue.push([x, y-1])
    this.targetQueue.push([x, y+1])
  }
}

export default Player;
