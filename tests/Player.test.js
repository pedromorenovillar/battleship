// Can attack other player's gameboard
// Can be marked as CPU player
import Player from "../src/Player";
import Gameboard from "../src/Gameboard";

describe("Player", () => {
  it("has a gameboard", () => {
    const player1 = new Player();
    expect(player1.gameboard).toBeInstanceOf(Gameboard);
  });
  it("can attack other player's gameboard", () => {
    const player1 = new Player();
    const player2 = new Player();

    player1.attack(player2, 0, 0);

    expect(player2.gameboard.missedAttacks).toContainEqual([0, 0]);
  });
  it("can be marked as CPU player", () => {
    const CPUplayer = new Player(true);

    expect(CPUplayer.isCPU).toBe(true);
  });
});
