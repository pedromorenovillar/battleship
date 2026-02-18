import Ship from "../src/Ship.js";

// length
// number of hits
// isSunk?

describe("Ship", () => {
  it("has length", () => {
    const ship = new Ship(3);
    expect(ship.length).toBe(3);
  });
  it("can register hits", () => {
    const ship = new Ship(2);
    ship.hit();
    expect(ship.hits).toBe(1);
  });
});
