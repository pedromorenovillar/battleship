# Battleship Project

## Assignment Overview

This project is part of The Odin Project's JavaScript curriculum. The goal is to build a **Battleship game** using **Test-Driven Development (TDD)**. I implemented the game logic, gameboard, and ships, focusing on writing tests first and then writing the code to pass them.

## Learning Goals

- Understand TDD and practice writing tests with Jest.
- Use JavaScript modules for organizing code.
- Apply object-oriented programming concepts (factories, classes, etc.).
- Implement game logic with clear separation of concerns.
- Handle edge cases and invalid input gracefully.

## Requirements

1. **Gameboard**
   - Represent a 10x10 grid.
   - Place ships at specified coordinates (horizontal or vertical).
   - Prevent ships from overlapping or going off the board.
   - Track missed and hit attacks.

2. **Ships**
   - Have a length property.
   - Track hits and determine when sunk.
   - Must respond correctly to attacks.

3. **Gameplay**
   - Allow players to take turns attacking each other’s boards.
   - End the game when all ships of one player are sunk.

4. **Test-Driven Development**
   - Write tests for each module before implementing functionality.
   - Use **Jest** or a testing framework of your choice.

## Modules

- `Ship` – represents a ship, tracks its length and hits.
- `Gameboard` – stores ships and attacks, handles placement and strikes.
- `Player` – can attack other players' boards.
- `Gameplay` – game logic.
- `index.js` – integrates everything.

## Optional Enhancements

- Random ship placement for CPU.
- Simple UI in the browser.
- AI opponent with basic strategy (hunting mode).

## AI Use

I have used AI tools (Claude Code and ChatGPT) in a  limited way, never asking for full solutions; instead asking for help with:

- Arquitecture guiding questions
- State debugging
- Refactoring code to separate rendering from logic
- Reasoning about flow

## Resources

- [The Odin Project – Battleship Lesson](https://www.theodinproject.com/lessons/node-path-javascript-battleship)
- [Jest Documentation](https://jestjs.io/docs/getting-started)
