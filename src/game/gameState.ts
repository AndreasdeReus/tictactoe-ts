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
import { disableClickListener, enableClickListener } from '../ui/events';

let gameState: GameState = {
  cells: Array(9).fill(''),
  currentPlayer: 'X', // Starting player
  isGameOver: false, 
  difficulty: 'noAI', // Default difficulty
  cheatsEnabled: false
};

let AIPlayer: Player | null;


export function setupGame(): void {
  resetGame();
}

export function setDifficulty(d : Difficulty): void {
  gameState.difficulty = d;
}

export function resetGame() {
  const cells = gameState.cells = Array(9).fill('');
  gameState.isGameOver = false;
  gameState.currentPlayer = 'X'
  if (gameState.difficulty != "noAI"){
    const human = Math.random() > 0.25 ? gameState.currentPlayer : getOpponent(gameState.currentPlayer);
    AIPlayer = getOpponent(human);
    if (gameState.currentPlayer === AIPlayer){
      makeMove(getAIMove(gameState.cells, gameState.difficulty, human, AIPlayer));
    }
  } else AIPlayer = null; 
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
    if (gameState.currentPlayer === AIPlayer){
      renderStatusMessage("AI wins");
    } else renderStatusMessage(showWinMessage(boardResult.winner));
  } else if (boardResult.isDraw) {
    gameState.isGameOver = true; 
    renderBoard(gameState.cells, {disableBoard: true});
    renderStatusMessage(showDrawMessage());
  } else {
    // Switch players
    gameState.currentPlayer = getOpponent(gameState.currentPlayer);
    renderBoard(gameState.cells);
    if (gameState.currentPlayer === AIPlayer){
       renderStatusMessage(showAITurnMessage());
    } else {
       renderStatusMessage(showTurnMessage(gameState.currentPlayer));
    }
    // AI move
    if (gameState.difficulty != "noAI" && AIPlayer == gameState.currentPlayer){
      const human = getOpponent(gameState.currentPlayer);
      const aiMoveIndex = getAIMove(gameState.cells, gameState.difficulty, human, AIPlayer);
      if (aiMoveIndex  !== -1) {
        setTimeout(() => makeMove(aiMoveIndex),450);
      }
      if (!gameState.cheatsEnabled){
        disableClickListener();
        setTimeout(() => enableClickListener(), 500);
        console.log(gameState.cheatsEnabled);
      }
    }
  }

  return true;
}

function getOpponent(player: Player): Player{
  return player === 'X' ? 'O' : 'X';
}

export function setCheatsEnabled(enabled: boolean) {
  gameState.cheatsEnabled = enabled;
}

(window as any).boardOptions = {
    setCheatsEnabled,
    resetGame,
    setDifficulty,
};