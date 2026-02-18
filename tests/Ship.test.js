import Ship from "../src/Ship.js";

describe("Ship", () => {
  let ship;
  beforeEach(()=> {
    ship = new Ship(2)
  })
  it("has length", () => {
    expect(ship.length).toBe(2);
  });
  it("can register hits", () => {
    ship.hit();
    expect(ship.hits).toBe(1);
  });
  it("knows when it is sunk", () => {
    ship.hit();
    ship.hit();
    expect(ship.isSunk()).toBe(true);
  });
});
