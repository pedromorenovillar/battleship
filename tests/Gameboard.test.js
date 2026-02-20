import Gameboard from "../src/Gameboard.js";
import Ship from "../src/Ship.js";

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
    expect(gameboard.board[0][0].ship).toBe(null);
    expect(gameboard.board[0][0].isHit).toBe(false);
  });
  it("places ships horizontally at coordinates", () => {
    const ship = new Ship(2);
    gameboard.placeShip(ship, 0, 0);

    expect(gameboard.board[0][0].ship).toBe(ship);
    expect(gameboard.board[0][1].ship).toBe(ship);
  });
  it("prevents ships from going off board horizontally", () => {
    const ship = new Ship(2);
    expect(() => {
      gameboard.placeShip(ship, 0, 9);
    }).toThrow();
  });
  it("prevents ships from overlapping", () => {
    const ship1 = new Ship(2);
    gameboard.placeShip(ship1, 0, 0);
    const ship2 = new Ship(2);
    expect(() => {
      gameboard.placeShip(ship2, 0, 0);
    }).toThrow();
  });
  it("does not allow the same ship to be placed twice", () => {
  const ship = new Ship(2);
  gameboard.placeShip(ship, 0, 0);

  expect(() => {
    gameboard.placeShip(ship, 2, 0);
  }).toThrow();
});
  it("places ships vertically at coordinates", () => {
    const ship = new Ship(2);
    gameboard.placeShip(ship, 0, 0, "vertical");

    expect(gameboard.board[0][0].ship).toBe(ship);
    expect(gameboard.board[1][0].ship).toBe(ship);
  });
  it("tracks missed attacks", () => {
    gameboard.receiveAttack(1, 1);
    expect(gameboard.missedAttacks).toContainEqual([1, 1]);
  });
  it("tracks hit attacks", () => {
    const ship = new Ship(2);
    gameboard.placeShip(ship, 0, 0);

    gameboard.receiveAttack(0, 0);

    expect(ship.hits).toBe(1);
    expect(gameboard.board[0][0].ship).toBe(ship);
    expect(gameboard.board[0][0].isHit).toBe(true);
  });
  it("marks ship as sunk if all parts are hit", () => {
    const ship = new Ship(2);
    gameboard.placeShip(ship, 0, 0);

    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 1);

    expect(ship.isSunk()).toBe(true);
  });
  it("does not register the same attack twice", ()=> {
    const ship = new Ship(2);
    gameboard.placeShip(ship, 0, 0);

    gameboard.receiveAttack(0, 0);
    gameboard.receiveAttack(0, 0);
    expect(ship.hits).toBe(1);
    expect(gameboard.board[0][0].isHit).toBe(true);
    expect(gameboard.missedAttacks).not.toContainEqual([0, 0]);
  })
  it("returns false if no ships are placed", ()=> {
    expect(gameboard.areAllShipsSunk()).toBe(false)
  })
});
