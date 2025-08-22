/*# Event listeners (clicks, buttons)
events.ts:
    Adds/removes listeners for cell clicks, restart button, difficulty select
*/
import { makeMove, resetGame, setDifficulty } from '../game/gameState';
import { Difficulty } from '../types/types';
import { fetchElementById } from '../utils/dom';

function handleBoardClick(event: Event): void {
  const target = event.target as HTMLElement;
  if (target.classList.contains('cell')) {
    const index = Number(target.dataset.index);
    makeMove(index);
  }

}

export function setupEventListeners() {
  const resetButton = fetchElementById<HTMLButtonElement>('resetButton', HTMLButtonElement);
  if (resetButton){
    resetButton.addEventListener('click', resetGame);
  }

  const boardElement = fetchElementById<HTMLDivElement>('board', HTMLDivElement);
  if (boardElement) {
    boardElement.addEventListener('click', handleBoardClick);
  }

  const diffSelect = fetchElementById<HTMLSelectElement>('difficultySelect', HTMLSelectElement);
  if (diffSelect) {
    diffSelect.addEventListener('change', () => {
    const value = diffSelect.value as Difficulty;
    console.log("difficulty: "+value)
    setDifficulty(value);
    resetGame();
    });
  }
}

export function disableClickListener(): void {
  const boardElement = fetchElementById<HTMLDivElement>('board', HTMLDivElement);
  if (boardElement) {
    boardElement.removeEventListener('click', handleBoardClick);
  }
}

export function enableClickListener(): void {
  const boardElement = fetchElementById<HTMLDivElement>('board', HTMLDivElement);
  if (boardElement) {
    boardElement.addEventListener('click', handleBoardClick);
  }
}