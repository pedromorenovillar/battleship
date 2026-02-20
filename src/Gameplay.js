import Player from "./Player";

class Game {
  constructor() {
    this.players = []

    const player1 = new Player()
    const player2 = new Player(true)

    this.players.push(player1, player2)
    this.currentPlayer = player1
  }
}

export default Game;