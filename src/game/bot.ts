/* # AI logic (easy/medium/hard)
bot.ts:
    Easy: random move
    Medium: block
    Hard: block/win
    Impossible: minimax
*/
import { Cell, Difficulty, Player, MiniMaxResult } from '../types/types';
import { checkDraw, checkWinner, getEmptyCells } from './gameRules';

export function getAIMove(cells: Cell[], difficulty: Difficulty, human: Player, aiPlayer: Player): number {
  switch (difficulty) {
    case 'easy':
      return easyAiMove(cells);
    case 'medium':
      return mediumAiMove(cells, human);
    case 'hard':
      return hardAiMove(cells, human, aiPlayer);
    case 'impossible':
      return impossibleAiMove(cells, human, aiPlayer);
    default:
      throw new Error(`Unknown difficulty: ${difficulty}`);
  }
}

function getRandomMove(cells: Cell[]): number {
  const emptyCells = getEmptyCells(cells);
  if (emptyCells.length > 0){
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }
  return -1;
}

function getBestMove(cells: Cell[], opponent: Player): number {
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

function getMinimaxMove(cells: Cell[], human: Player, aiPlayer: Player): number{
  // start minimax algorithm
  const emptyCells = getEmptyCells(cells);
  if (emptyCells.length === 0){
    return -1;
  }
  const depth = 0;
  const { move } = minimax(cells, depth, true, human, aiPlayer);
  return move;
}

function minimax(
  cells: Cell[],
  depth: number,
  isMaximizing: boolean,
  human: Player,
  aiPlayer: Player
): MiniMaxResult{ 
    const currScore = terminalScore(cells, depth, human, aiPlayer);
    if(currScore !== null){
      return { move: -1, score: currScore }
    }
    const moves = getEmptyCells(cells);
    if(isMaximizing){
      let best = {move: -1, score: -Infinity}
      for(const idx of moves){
        applyMove(cells, idx, aiPlayer);
        const child = minimax(cells, depth+1, false, human, aiPlayer);
        undoMove(cells, idx); 
        if (child.score > best.score){
          best = { move: idx, score: child.score }
        }
      };
      return best;
    } else {
      let best = {move: -1, score: +Infinity}
      for(const idx of moves){
        applyMove(cells, idx, human);
        const child = minimax(cells, depth+1, true, human, aiPlayer);
        undoMove(cells, idx); 
        if (child.score < best.score){
          best = { move: idx, score:child.score };
        }
      };
      return best;
    }
}

function terminalScore(cells: Cell[], depth: number, human: Player, aiPlayer: Player): number | null {
  const [winner, winningLine ] = checkWinner(cells) 
  if(winner){
      if(winner === aiPlayer){
        return 10 - depth
      }else if(winner === human){
        return depth - 10;
      }
  }else if(checkDraw(cells)){
    return 0;
  }
  return null;
}

function applyMove(cells: Cell[], index: number, player: Player): void {
  cells[index] = player;
}

function undoMove(cells: Cell[], index: number): void {
  cells[index] = "";
}

function easyAiMove (cells: Cell[]): number{
  return getRandomMove(cells)
}

function mediumAiMove (cells: Cell[], opponent: Player): number {
  const blockMove = getBestMove(cells, opponent);
  if(blockMove != -1){
    return blockMove;
  }
  return getRandomMove(cells);
}

function hardAiMove (cells: Cell[], opponent: Player, aiPlayer : Player): number {
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

function impossibleAiMove (cells: Cell[], human: Player, aiPlayer : Player): number {
  return getMinimaxMove(cells, human, aiPlayer);
}