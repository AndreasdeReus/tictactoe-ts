/* # AI logic (easy/medium/hard)
bot.ts:
    Easy: random move
    Medium: block/win
    Hard: minimax
*/
import { Cell, Difficulty, Player } from '../types/types';

export function getAIMove(cells: Cell[], difficulty: Difficulty, opponent: Player, aiPlayer: Player): number {
  switch (difficulty) {
    case 'easy':
      return easyAiMove(cells);
    case 'medium':
      return mediumAiMove(cells, opponent);
    case 'hard':
      return hardAiMove(cells, opponent, aiPlayer);
    case 'impossible':
      // return getMinimaxMove(cells, 0, true);
    default:
      throw new Error(`Unknown difficulty: ${difficulty}`);
  }
}

function getRandomMove(cells: string[]): number {
  const emptyCells = cells.map((cell, index) => cell === '' ? index : -1).filter(index => index !== -1);
  return emptyCells[Math.floor(Math.random() * emptyCells.length)];
}

function getBestMove(cells: string[], opponent: Player): number {
  // check for blocking move
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
    if (cells[a] == opponent && cells[a] === cells[b] && cells[c] === "" ){ 
      return c;
    } else if (cells[b] == opponent && cells[b] === cells[c] && cells[a] === ""){ 
      return a;
    } else if (cells[c] == opponent && cells[c] === cells[a] && cells[b] === ""){ 
      return b;
    }
  }
  return -1;
}

interface MiniMaxResult{
  move: number;
  score: number;
}

function getMinimaxMove(cells: string[], huuman: Player, aiPlayer: Player): number{
  // start minimax algorithm
  return -1;
}


function easyAiMove (cells: string[]): number{
  return getRandomMove(cells)
}

function mediumAiMove (cells: string[], opponent: Player): number {
  const blockMove = getBestMove(cells,opponent);
  if(blockMove != -1){
    return blockMove;
  }
  return getRandomMove(cells);
}


function hardAiMove (cells: string[], opponent: Player, aiPlayer : Player): number {
  const winningMove = getBestMove(cells,aiPlayer)
  const blockMove = getBestMove(cells,opponent);
  if(winningMove != -1){
    return winningMove;
  }else if(blockMove != -1){
    return blockMove;
  }  else if(cells[4] === ""){
    return 4;
  }
  return getRandomMove(cells);
}

function impossibleAiMove (cells: string[], human: Player, aiPlayer : Player): number {
  return getMinimaxMove(cells, human, aiPlayer);
  return -1;
}