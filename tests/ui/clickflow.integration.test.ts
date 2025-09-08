/**
 * @vitest-environment jsdom
 */

// tests/ui/clickflow.integration.test.ts
import { describe, it, beforeEach, expect, afterEach } from "vitest";
import { showDrawMessage, showTurnMessage, showWinMessage } from "../../src/ui/messages";

import { setupEventListeners } from "../../src/ui/events";
import { setupGame } from "../../src/game/gameState";

// We’ll assume your game starts with X and “no AI” for a pure manual flow.

describe("UI click-flow", () => {
  beforeEach(() => {
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

    // Setup first turn
    setupEventListeners();
    setupGame();
  });

  afterEach(() => {
    document.body.removeAttribute("data-theme");
    document.body.innerHTML = "";
    localStorage.clear();
  });

  it("clicking an empty cell places a mark and updates status", async () => {
    const board = document.getElementById("board")!;
    let cells = board.querySelectorAll<HTMLDivElement>(".cell");
    const status = document.getElementById("statusMessage")!;

    // Pre-assertions
    expect(cells.length).toBe(9);
    expect(status.textContent).toBe(showTurnMessage("X").text);
    expect(board!.getAttribute("aria-disabled")).toBe("false");

    // Click first cell (index 0)
    cells[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));

    // After click:
    // - cell 0 should have "X"
    // - status should flip to "O's turn"
    // - board should remain enabled (no win/draw yet)
    cells = board.querySelectorAll<HTMLDivElement>(".cell");
    expect(cells[0].textContent).toBe("X");
    expect(status.textContent).toBe(showTurnMessage("O").text);
    expect(board.getAttribute("aria-disabled")).toBe("false");
  });

  it("click occupied cell does nothing", () => {
    const board = document.getElementById("board")!;
    let cells = board.querySelectorAll<HTMLDivElement>(".cell");
    const status = document.getElementById("statusMessage")!;

    cells[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));

    // Pre-assertions
    expect(cells.length).toBe(9);
    expect(status.textContent).toBe(showTurnMessage("O").text);
    expect(board!.getAttribute("aria-disabled")).toBe("false");

    // Click cell already containing "X" 
    cells[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));

    // After click:
    // - cell 0 should still have "X"
    // - board should remain enabled (no win/draw yet)
    cells = board.querySelectorAll<HTMLDivElement>(".cell");
    expect(cells[0].textContent).toBe("X");
    expect(status.textContent).toBe(showTurnMessage("O").text);
    expect(board.getAttribute("aria-disabled")).toBe("false");
  });

  it("winning move highlights 3 cells and disables board", async () => {
    const board = document.getElementById("board")!;
    let cells = board.querySelectorAll<HTMLDivElement>(".cell");
    const status = document.getElementById("statusMessage")!;

    // Simulate clicks
    board.querySelector<HTMLElement>('[data-index="0"]')!
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    
    board.querySelector<HTMLElement>('[data-index="3"]')!
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    
    board.querySelector<HTMLElement>('[data-index="1"]')!
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    
    board.querySelector<HTMLElement>('[data-index="4"]')!
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    
    board.querySelector<HTMLElement>('[data-index="2"]')!
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));

    cells = board.querySelectorAll<HTMLDivElement>(".cell");
    
    // After click:
    // - should show win message for "X"
    // - board should be disabled (win for "X")
    [0, 1, 2].forEach(i => {
      expect(cells[i].textContent).toBe("X");
    });

    [0, 1, 2].forEach(i => {
      expect(cells[i].classList.contains("cell-win")).toBe(true)
    });
    expect(status.textContent).toBe(showWinMessage("X").text);
    expect(board!.getAttribute("aria-disabled")).toBe("true");

 });

  it("draw disables board and shows draw message", () => {
    const board = document.getElementById("board")!;
    let cells = board.querySelectorAll<HTMLDivElement>(".cell");
    const status = document.getElementById("statusMessage")!;

    // Simulate clicks to fill board
    board.querySelector<HTMLElement>('[data-index="0"]')!
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    board.querySelector<HTMLElement>('[data-index="3"]')!
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    board.querySelector<HTMLElement>('[data-index="1"]')!
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    board.querySelector<HTMLElement>('[data-index="4"]')!
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    board.querySelector<HTMLElement>('[data-index="5"]')!
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    board.querySelector<HTMLElement>('[data-index="2"]')!
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    board.querySelector<HTMLElement>('[data-index="6"]')!
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    board.querySelector<HTMLElement>('[data-index="7"]')!
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));
    board.querySelector<HTMLElement>('[data-index="8"]')!
      .dispatchEvent(new MouseEvent("click", { bubbles: true }));

    cells = board.querySelectorAll<HTMLDivElement>(".cell");
    
    // After click:
    // - should show message for draw
    // - board should be disableshould show message for draw
    // - board should be disabledd
    expect(status.textContent).toBe(showDrawMessage().text);
    expect(board!.getAttribute("aria-disabled")).toBe("true");


  });
  it("restart clears board and status", () => {
    const board = document.getElementById("board")!;
    let cells = board.querySelectorAll<HTMLDivElement>(".cell");
    const reset = document.getElementById("resetButton")!;
    const status = document.getElementById("statusMessage")!;

    // Pre-assertions    
    expect(status.textContent).toBe(showTurnMessage("X").text);
    cells[0].dispatchEvent(new MouseEvent("click", { bubbles: true }));
    cells = board.querySelectorAll<HTMLDivElement>(".cell");
    expect(cells[0].textContent).toBe("X");

    // Click reset button
    reset.dispatchEvent(new MouseEvent("click", { bubbles: true }));
    cells = board.querySelectorAll<HTMLDivElement>(".cell");

    // After click of reset
    expect(status.textContent).toBe(showTurnMessage("X").text);
    expect(board!.getAttribute("aria-disabled")).toBe("false");
    expect(cells[0].textContent).toBe("");
  });
});
