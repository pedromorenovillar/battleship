import Player from "./Player";

class Game {
  constructor() {
    this.isGameStarted = false;
    this.isGameOver = false;
    this.winner;
    this.players = [];

    const player1 = new Player();
    const player2 = new Player(true);

    this.players.push(player1, player2);
    this.currentPlayer = player1;
  }
  nextTurn() {
    if (this.currentPlayer === this.players[0]) {
      this.currentPlayer = this.players[1];
    } else {
      this.currentPlayer = this.players[0];
    }
  }
  attack(x, y) {
    if (this.isGameOver) return;
    
    const opponent =
      this.currentPlayer === this.players[0]
        ? this.players[1]
        : this.players[0];


    this.currentPlayer.attack(opponent, x, y);

    if (opponent.gameboard.areAllShipsSunk()) {
      this.winner = this.currentPlayer;
      this.isGameOver = true;
      return;
    }
    this.nextTurn();
  }
  placeShip(player, ship, x, y) {
    if (this.isGameStarted === true) {
      throw new Error('You cannot place a ship after the game has started.');
    }
    player.gameboard.placeShip(ship, x, y)
  }
  startGame() {
    this.isGameStarted = true;
  }
}

export default Game;
