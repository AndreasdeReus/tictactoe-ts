/* # Board representation, move logic, reset logic
gameState.ts:
    Board array
    makeMove, resetGame, etc
*/
import { renderBoard, renderStatusMessage } from '../ui/renderer';
import { evaluateBoard } from './gameRules';
import { showAITurnMessage, showDrawMessage, showTurnMessage, showWinMessage } from '../ui/messages';
import { getAIMove } from './bot';
import type { GameState, Difficulty, EvaluateBoardResult, Player } from '../types/types';

let gameState: GameState = {
  cells: Array(9).fill(''),
  currentPlayer: Math.random() > 0.5 ? 'X' : 'O', //'X', // Starting player
  isGameOver: false, 
  difficulty: 'noAI' // Default difficulty
};

let AIPlayer: Player;


export function setupGame(): void {
  resetGame();
}

/* export function showGameState(): Readonly<GameState> {
  return gameState;
} */

export function setDifficulty(d : Difficulty): void {
  gameState.difficulty = d;
}

export function resetGame() {
  const cells = gameState.cells = Array(9).fill('');
  gameState.currentPlayer = Math.random() > 0.5 ? 'X' : 'O';
  gameState.isGameOver = false;
  if (gameState.difficulty != "noAI"){
    AIPlayer = (gameState.currentPlayer === 'X') ? 'O' : 'X';
  }
  renderBoard(cells);
  renderStatusMessage(showTurnMessage(gameState.currentPlayer));
}

/**
 * 
 * @param index - Index of the cell to make a move in
 * @returns true if the move was successful, false otherwise
 */
export function makeMove(index: number): boolean {
  if (gameState.isGameOver) return false; // Prevent moves after game over
  if (index < 0 || index >= gameState.cells.length) return false;
  if (gameState.cells[index]) return false; 

  gameState.cells[index] = gameState.currentPlayer;
  
  const boardResult: EvaluateBoardResult = evaluateBoard(gameState.cells);
  if (boardResult.winner) {
    gameState.isGameOver = true;
    renderBoard(gameState.cells, {
      winningLine: boardResult.winningLine,
      disableBoard: true 
    });
    renderStatusMessage(showWinMessage(boardResult.winner));
  } else if (boardResult.isDraw) {
    gameState.isGameOver = true; 
    renderBoard(gameState.cells, {disableBoard: true});
    renderStatusMessage(showDrawMessage());
  } else {
    // Switch players
    gameState.currentPlayer = gameState.currentPlayer === 'X' ? 'O' : 'X';
    console.log("Gamestate diff: "+gameState.difficulty);
    renderBoard(gameState.cells);
    if (gameState.currentPlayer === AIPlayer){
       renderStatusMessage(showAITurnMessage());
    } else {
       renderStatusMessage(showTurnMessage(gameState.currentPlayer));
    }
    // AI move
    if (gameState.difficulty != "noAI" && AIPlayer == gameState.currentPlayer){
      const opponent = (gameState.currentPlayer === 'X' ? 'O' : 'X');
      const aiMoveIndex = getAIMove(gameState.cells, gameState.difficulty, opponent, AIPlayer);
      console.log("Current AI player:" + AIPlayer +"AImove: "+aiMoveIndex)
      if (aiMoveIndex  !== -1) {
        setTimeout(() => makeMove(aiMoveIndex),450);
      }
    }
  }

  return true;
}