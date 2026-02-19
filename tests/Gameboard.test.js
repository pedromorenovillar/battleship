import Gameboard from "../src/Gameboard.js";

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
  it("places ships at coordinates", () => {});
  it("prevents ships from going off board", () => {});
  it("prevents ships from overlapping", () => {});
  it("tracks missed attacks", () => {});
  it("tracks hit attacks", () => {});
});
