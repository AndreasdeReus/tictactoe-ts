 // tests/ui/renderer.integration.test.ts
import { describe, it, expect, beforeEach } from "vitest";
import { renderBoard } from "../../src/ui/renderer";
import type { Cell } from "../../src/types/types";
import { setupEventListeners } from "../../src/ui/events";
import { setupGame } from "../../src/game/gameState";

describe("renderer DOM integration", () => {
  beforeEach(() => {
    // Minimal DOM structure as in index.html
    document.body.innerHTML = `
      <div class="app">
        <div class="controls">
          <div id="statusMessage" class="status-message" aria-live="polite"></div>
          <button id="resetButton" class="resetButton" type="button">Restart</button>
          <button id="themeToggle" class="resetButton" type="button" aria-pressed="false">🌓 Theme</button>
          <label class="control" for="difficultySelect">Difficulty:
            <select id="difficultySelect" aria-label="AI difficulty">
              <option value="noAI">No AI</option>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
              <option value="impossible">Impossible</option>
            </select>
          </label>
          <button type="button" id="resetButton" class="roundedButton" tabindex="0">Restart Game</button>
          <button type="button" id="themeToggle" class="roundedButton" aria-pressed="false" title="Toggle dark mode">
              Theme
          </button>
        </div>
        <div id="board" class="board" role="grid" aria-disabled="false"></div>
      </div>
    `;
    setupEventListeners();
    setupGame();
  });

  it("renders 9 cells for a fresh board", () => {
    const board = document.getElementById("board")!;
    let cells = board.querySelectorAll<HTMLDivElement>(".cell");

    // Assert
    expect(cells.length).toBe(9);
    cells.forEach( cell => {
      cell.textContent = "";
    });
  });

  it("sets aria-disabled correctly", () => {
    const cells: Cell[] = [
      "X","O","X",
      "X","O","O",
      "O","X","O"
    ];
    // Act
    renderBoard(cells, { disableBoard: true });

    // Assert
    const board = document.getElementById("board")!;
    const cellEls = board.querySelectorAll(".cell");

    expect(cellEls.length).toBe(9);

    // Board is disabled via aria (CSS uses this to block clicks & dim)
    expect(board.getAttribute("aria-disabled")).toBe("true");
  });

  it("highlights winning cells and disables the board", () => {
    // Arrange
    const cells: Cell[] = [
      "X","X","X",
      "O","","O",
      "","",""
    ];
    const winningLine = [0,1,2];

    // Act
    renderBoard(cells, { winningLine, disableBoard: true });

    // Assert
    const board = document.getElementById("board")!;
    const cellEls = board.querySelectorAll(".cell");
    const winEls = board.querySelectorAll(".cell.cell-win");

    expect(cellEls.length).toBe(9);
    expect(winEls.length).toBe(3);

    // The exact winning indices have the win class
    winningLine.forEach((i) => {
      expect(cellEls[i].classList.contains("cell-win")).toBe(true);
    });

    // Board is disabled via aria (CSS uses this to block clicks & dim)
    expect(board.getAttribute("aria-disabled")).toBe("true");
  });

  it("renders correct cell text", () => {
    // Arrange
    const cells: Cell[] = [
      "X","","X",
      "O","X","O",
      "","",""
    ];

    // Act
    renderBoard(cells);

    // Assert
    const board = document.getElementById("board")!;
    let cellEls = board.querySelectorAll(".cell");

    [0,2,4].forEach((i) => {
      expect(cellEls[i].textContent).toBe("X");
    });
    [1,6,7,8].forEach((i) => {
      expect(cellEls[i].textContent).toBe("");
    });
    [3,5].forEach((i) => {
      expect(cellEls[i].textContent).toBe("O");
    });


  });
  it("is idempotent on repeated render", () => {
    // Arrange
    const cells: Cell[] = [
      "X","","X",
      "O","X","O",
      "","",""
    ];

    // Act
    renderBoard(cells);

    // Pre-Assert
    const board = document.getElementById("board")!;
    let cellEls = board.querySelectorAll(".cell");

    [0,2,4].forEach((i) => {
      expect(cellEls[i].textContent).toBe("X");
    });
    [1,6,7,8].forEach((i) => {
      expect(cellEls[i].textContent).toBe("");
    });
    [3,5].forEach((i) => {
      expect(cellEls[i].textContent).toBe("O");
    });

    // Rerender board 10 times
    for (let i = 0; i < 10; i++) {
      cellEls.forEach((cell, index) => {
        cells[index] = cell.textContent as Cell
      });
    renderBoard(cells);
    }

    cellEls = board.querySelectorAll(".cell");

    // Assert board is idompotent and has not changed
    [0,2,4].forEach((i) => {
      expect(cellEls[i].textContent).toBe("X");
    });
    [1,6,7,8].forEach((i) => {
      expect(cellEls[i].textContent).toBe("");
    });
    [3,5].forEach((i) => {
      expect(cellEls[i].textContent).toBe("O");
    });
  });
});
