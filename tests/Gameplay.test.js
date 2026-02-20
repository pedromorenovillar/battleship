import Gameplay from "../src/Gameplay";

// Initialize game with two players
// Confirm players are assigned
// Confirm turn starts with P1

describe('Gameplay', ()=> {
  it('starts game with two players', () {
    const game = new Game();
    expect(game.players.length).toBe(2)
    expect(game.currentPlayer).toBe(game.players[0])
  })
})