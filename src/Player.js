import Gameboard from "./Gameboard.js";

class Player {
  constructor(isCPU = false) {
    this.gameboard = new Gameboard();
    this.isCPU = isCPU;
    this.triedMoves = [];
    this.targetQueue = [];
  }
  attack(opponent, x, y) {
    const result = opponent.gameboard.receiveAttack(x, y);
    if (this.isCPU == true) {
      if (result === "hit") {
        this.processHit(x, y);
      }
    }
    return result;
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
    const candidates = [
      [x - 1, y],
      [x + 1, y],
      [x, y - 1],
      [x, y + 1],
    ];

    candidates.forEach(([nx, ny]) => {
      if (nx >= 0 && nx <= 9 && ny >= 0 && ny <= 9) {
        // Only queue if not already tried
        if (!this.triedMoves.some(([r, c]) => r === nx && c === ny)) {
          this.targetQueue.push([nx, ny]);
        }
      }
    });
  }
  getNextMove() {
    let move;

    if (this.targetQueue.length > 0) {
      do {
        move = this.targetQueue.shift();
      } while (
        move &&
        this.triedMoves.some(([r, c]) => r === move[0] && c === move[1])
      );
    }

    if (!move) {
      move = this.getRandomMove();
    } else {
      this.triedMoves.push(move);
    }

    return move;
  }
}

export default Player;
