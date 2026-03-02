import Player from "./Player.js";
import Ship from "./Ship.js";
export const fleet = [{name: "portaaviones", length: 5}, {name: "fragata", length: 4}, {name: "submarino", length: 3}, {name: "submarino", length: 3}, {name: "crucero", length: 2}];

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

    // Determine coordinates for CPU or human
    if (x === undefined || y === undefined) {
      if (!this.currentPlayer.isCPU) {
        throw new Error("Human player must provide coordinates.");
      }
      // CPU keeps attacking until it misses
      let result;
      do {
        [x, y] = this.currentPlayer.getNextMove();
        result = this.currentPlayer.attack(opponent, x, y);
        if (opponent.gameboard.areAllShipsSunk()) {
          this.winner = this.currentPlayer;
          this.isGameOver = true;
          return;
        }
      } while (result === "hit");
      this.nextTurn(); // switch turn after miss
      return;
    }

    // Human attack
    const result = this.currentPlayer.attack(opponent, x, y);

    if (opponent.gameboard.areAllShipsSunk()) {
      this.winner = this.currentPlayer;
      this.isGameOver = true;
      return;
    }

    if (result === "miss") {
      this.nextTurn();
    }
  }
  placeShip(player, ship, x, y, currentDirection = "horizontal") {
    if (this.isGameStarted === true) {
      throw new Error("You cannot place a ship after the game has started.");
    }
    player.gameboard.placeShip(ship, x, y, currentDirection);
  }
  autoPlaceCPUFleet() {
    fleet.forEach((fleetShip) => {
      const ship = new Ship(fleetShip);
      let placed = false;
      while (!placed) {
        try {
          let x = Math.floor(Math.random() * 10);
          let y = Math.floor(Math.random() * 10);
          let currentDirection =
            Math.random() < 0.5 ? "horizontal" : "vertical";
          this.placeShip(this.players[1], ship, x, y, currentDirection)
          placed = true;
        } catch (error) {
        }
      }
    });
  }

  startGame() {
    if (
      this.players[0].gameboard.ships.length > 0 &&
      this.players[1].gameboard.ships.length > 0
    ) {
      this.isGameStarted = true;
    } else {
      throw new Error("Each player needs to place at least one ship.");
    }
  }
}

export default Game;
