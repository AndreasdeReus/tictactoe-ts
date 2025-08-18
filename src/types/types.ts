/*
# Type definitions (e.g. Player, Cell, GameStatus
types/ folder
Centralizes types/interfaces for safety and reusability.
types.ts:
    type Player = 'X' | 'O'
    type Cell = '' | 'X' | 'O'
    interface GameState { ... }
    type Difficulty = 'easy' | 'medium' | 'hard'
*/

export type Player = 'X' | 'O';
export type Cell = '' | Player;
export type Difficulty = 'easy' | 'medium' | 'hard' | 'impossible' | 'noAI'; // 'noAI' for local multiplayer
export interface GameState {
    cells: Cell[];
    currentPlayer: Player;
    isGameOver: boolean;
    difficulty: Difficulty;
    // additional properties can be added as needed
    // e.g. scoreboard and moveHistory: Cell[][];
    // moveHistory: Cell[][];
}
export interface RenderOptions {
    winningLine?: number[],
    disableBoard?: boolean,
    highlightedCells?: number[] // future for highlighting ai moves
}
export interface EvaluateBoardResult {
    winner: Player | null;
    isDraw: boolean;
    winningLine?: number[];
    // additional properties can be added as needed
    // e.g. score: number;
}

export interface MiniMaxResult {
    move: number;
    score: number;
}