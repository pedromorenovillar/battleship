import Gameboard from "../src/Gameboard.js";
import Ship from "../src/Ship.js";

// Represent a 10x10 grid.
// Place ships at specified coordinates (horizontal or vertical).
// Prevent ships from overlapping or going off the board.
// Track missed and hit attacks.

describe("Gameboard", () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });
  it("represents a 10x10 grid", () => {
    expect(gameboard.board.length).toBe(10);
    gameboard.board.forEach((row) => {
      expect(row.length).toBe(10);
    });
  });
  it("initializes all cells as empty", () => {
    expect(gameboard.board[0][0]).toBe(null);
  });
  it("places ships at coordinates", () => {
    const ship = new Ship(2);
    gameboard.placeShip(ship, 0, 0);

    expect(gameboard.board[0][0]).toBe(ship);
    expect(gameboard.board[0][1]).toBe(ship);
  });
  it("prevents ships from going off board", () => {});
  it("prevents ships from overlapping", () => {});
  it("tracks missed attacks", () => {});
  it("tracks hit attacks", () => {});
});
