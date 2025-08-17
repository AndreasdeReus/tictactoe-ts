import { setupEventListeners } from './ui/events';
import { setupGame } from './game/gameState';

setupEventListeners(); 
setupGame();

// moved to renderer.ts
/*
function renderBoard() {
  boardElement.innerHTML = '';
  cells.forEach((val, idx) => {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.textContent = val;
    cell.onclick = () => makeMove(idx);
    boardElement.appendChild(cell);
  });
}
*/

// moved to gameRules.ts
/*
function checkWinner(): void {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (const combination of winningCombinations) {
    const [a, b, c] = combination;
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      winnerMessage(cells[a]);
    } else if (!cells.includes('')) {
      winnerMessage(null);
    }
  }
}
*/

// moved to gameState.ts
/*
function makeMove(index: number) {
  if (cells[index]) return;
  cells[index] = currentPlayer;
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  checkWinner();
  renderBoard();
}
*/

// moved to ui/renderer.ts
/*
function winnerMessage(winner: 'X' | 'O' | null) {
  if (winner) {
    alert(`${winner} wins!`);
  } else {
    alert("It's a draw!");
  }
  resetGame();
}
*/