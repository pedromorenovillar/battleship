// Player has a gameboard
// Can attack other player's gameboard
// Can be marked as CPU player
import Player from "../src/Player";
import Gameboard from "../src/Gameboard";


describe("Player", () => {
  it("has a gameboard", () => {
    let P1 = new Player();
    expect(P1.gameboard).toBeInstanceOf(Gameboard)
  });
  it("can attack other player's gameboard", () => {});
  it("can be marked as CPU player", () => {});
});
