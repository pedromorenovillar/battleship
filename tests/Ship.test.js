import Ship from "../src/Ship.js";

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
  it("knows when it is sunk", ()=> {
    const ship = new Ship(2);
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  })
});
