/*# Event listeners (clicks, buttons)
events.ts:
    Adds/removes listeners for cell clicks, restart button, difficulty select
*/
import { makeMove, resetGame, setDifficulty } from '../game/gameState';
import { Difficulty } from '../types/types';
import { fetchElementById } from '../utils/dom';

export function setupEventListeners() {
  const resetButton = fetchElementById<HTMLButtonElement>('resetButton', HTMLButtonElement);
  if (resetButton){
    resetButton.addEventListener('click', resetGame);
  }

  const boardElement = fetchElementById<HTMLDivElement>('board', HTMLDivElement);
  if (boardElement) {
    boardElement.addEventListener('click', (event) => {
        const target = event.target as HTMLElement;
        if (target.classList.contains('cell')) {
            const index = Number(target.dataset.index);
            makeMove(index);
        }
    });
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
