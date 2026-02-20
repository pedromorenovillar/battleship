import Player from "./Player";

class Game {
  constructor() {
    this.players = []

    const player1 = new Player()
    const player2 = new Player(true)

    this.players.push(player1, player2)
    this.currentPlayer = player1
  }
  nextTurn() {
    if (this.currentPlayer===this.players[0]) {
      this.currentPlayer = this.players[1]
    } else {
      this.currentPlayer = this.players[0]
    }
  }
}

export default Game;