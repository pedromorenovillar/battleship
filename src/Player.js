import Gameboard from "./Gameboard";

class Player {
  constructor(isCPU=false) {
    this.gameboard = new Gameboard();
    this.isCPU = isCPU
  }
  attack(opponent, x, y) {
    opponent.gameboard.receiveAttack(x, y)
  }
}

export default Player;
