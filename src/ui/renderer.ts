/*# Handles DOM updates (board, messages)
renderer.ts:
    Updates the board view
    Shows winner messages
    Highlights winning line
*/
import { fetchElementById } from "../utils/dom";
import type { Cell, RenderOptions } from "../types/types.ts";

export function renderBoard(cells: Cell[], options: RenderOptions = {}) : void {
  const boardElement = fetchElementById('board', HTMLDivElement);
  if (!boardElement) {
    throw new Error("Board element not found");
  }
  if (options.disableBoard) {
    boardElement.setAttribute("aria-disabled", 'true');
  } else {
    boardElement.setAttribute("aria-disabled", 'false');
  }
  boardElement.innerHTML = '';
  cells.forEach((val, idx) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.textContent = val;
    cell.dataset.index = idx.toString(); 
   
    if (options.winningLine?.includes(idx)) {
      cell.classList.add('cell-win');
    }
    if (options.highlightedCells?.includes(idx)) {
      cell.classList.add('cell-highlight');
    }
    boardElement.appendChild(cell);
  }); 
}

export function renderStatusMessage({text, addClass} : {text: string, addClass: string}): void {
  const statusMessage = fetchElementById('statusMessage', HTMLDivElement);
  if (!statusMessage) {
    throw new Error("Status message element not found");
  }
  statusMessage.textContent = `${text}`;
  clearStatusMessage();
  if (addClass) { 
    statusMessage.classList.add(addClass);
  }
  if (text && text.trim().length > 0) {
    statusMessage.classList.remove('hidden');
  } else {
    statusMessage.classList.add('hidden');
  }
}

export function clearStatusMessage() {
  const statusMessage = fetchElementById('statusMessage', HTMLDivElement);
  if (!statusMessage) {
    throw new Error("Status message element not found");
  }
  const msgStatuses = ["win", "draw", "turn"];
  msgStatuses.forEach( msgStatus => {
    statusMessage.classList.remove(msgStatus)
  });
}