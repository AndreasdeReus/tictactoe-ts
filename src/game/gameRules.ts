/*# Game rules, win/draw detection, turn handling
gameRules.ts:
    checkWinner, isDraw, getAvailableMoves
*/
import type { Player, Cell, EvaluateBoardResult } from '../types/types';

export function checkWinner(cells: Cell[]): [Player | null, winningLine?: number[] ] {
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

  for (const [a, b, c] of winningCombinations) {
    if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
      return [cells[a] as Player, [a, b, c]];
    }
  }
  return [null, []];
}

export function checkDraw(cells: Cell[]): boolean {
  return cells.every(cell => cell !== ''); 
}

export function getEmptyCells(cells: Cell[]): number[]{
  return cells.map((cell, index) => cell === '' ? index : -1).filter(index => index !== -1);
}

export function evaluateBoard(cells: Cell[]): EvaluateBoardResult{
  const [winner, winningLine]= checkWinner(cells);
  const isDraw = false;
  if (winner) return { winner, isDraw, winningLine };
  else if (checkDraw(cells)) {
    return { winner: null, isDraw: true, winningLine: [] };
  }
  return { winner: null, isDraw: false, winningLine: [] };
}