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
    const ship = new Ship(2);

    const opponent = game.players[1];
    opponent.gameboard.placeShip(ship, 0, 0);
    game.attack(0, 0);
    game.attack(0, 1);
    expect(game.isGameOver).toBe(true);
  });
  it("prevent ship placement after game starts", () => {
    const game = new Game();
    const humanPlayer = game.players[0];
    const opponent = game.players[1];
    const ship1 = new Ship(2);
    const ship2 = new Ship(2);
    const ship3 = new Ship(2);
    const ship4 = new Ship(2);
    const ship5 = new Ship(2);
    game.placeShip(humanPlayer, ship1, 0, 0);
    game.placeShip(humanPlayer, ship2, 3, 0);
    game.placeShip(opponent, ship3, 0, 0);
    game.placeShip(opponent, ship4, 3, 0);
    game.startGame();

    expect(() => {
      game.placeShip(humanPlayer, ship5, 7, 0);
    }).toThrow();
  });

  it("requires both players to place at least one ship before starting", () => {
    const game = new Game();

    expect(() => {
      game.startGame();
    }).toThrow();
  });
  it("CPU player makes a valid attack", () => {
    const game = new Game();
    const humanPlayer = game.players[0];
    const opponent = game.players[1];
    const ship1 = new Ship(2);
    const ship2 = new Ship(2);
    const ship3 = new Ship(2);
    const ship4 = new Ship(2);
    game.placeShip(humanPlayer, ship1, 0, 0);
    game.placeShip(humanPlayer, ship2, 3, 0);
    game.placeShip(opponent, ship3, 0, 0);
    game.placeShip(opponent, ship4, 3, 0);
    game.startGame();
    game.attack(9, 9);
    game.attack();
    
    const wasAnyCellHit = humanPlayer.gameboard.board.some((row) =>
      row.some((cell) => cell.isHit),
    );
    expect(wasAnyCellHit).toBe(true);
  });
});
