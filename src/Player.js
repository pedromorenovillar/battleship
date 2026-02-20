import Gameboard from "./Gameboard";

class Player {
  constructor() {
    this.gameboard = new Gameboard();
  }
  attack(opponent, x, y) {
    opponent.gameboard.receiveAttack(x, y)
  }
}

export default Player;
