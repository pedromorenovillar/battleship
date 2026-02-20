import Player from "./Player";

class Game {
  constructor() {
    this.isGameOver = false;
    this.winner
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
  attackCurrentPlayer(opponent, x, y){
    if (this.isGameOver) return

    this.currentPlayer.attack(opponent, x, y)
    
    if(opponent.gameboard.areAllShipsSunk()){
      this.winner = this.currentPlayer
      this.isGameOver = true
      return;
    }
    this.nextTurn()
  }
}

export default Game;