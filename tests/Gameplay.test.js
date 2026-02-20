import Game from "../src/Gameplay";
import Ship from "../src/Ship";

describe("Gameplay", () => {
  it("starts game with two players", () => {
    const game = new Game();
    // Confirm players are assigned
    expect(game.players.length).toBe(2);
    // Confirm turn starts with P1
    expect(game.currentPlayer).toBe(game.players[0]);
  });
  it("switching turns changes player", () => {
    const game = new Game();
    game.nextTurn();

    expect(game.currentPlayer).toBe(game.players[1]);
  });
  it("current player can attack opponent", () => {
    const game = new Game();
    const opponent = game.players[1];

    game.attack(0, 0);

    expect(opponent.gameboard.missedAttacks).toContainEqual([0, 0]);
  });
  it("detects game over when all opponent ships are sunk", () => {
    const game = new Game();
    const ship = new Ship(2)

    const opponent = game.players[1];
    opponent.gameboard.placeShip(ship, 0, 0)
    game.attack(0, 0);
    game.attack(0, 1);
    expect(game.isGameOver).toBe(true);
  });
});
