import type { Player } from '../types/types.ts';

export function showDrawMessage(): string {
  const msg = "It's a draw!"
 return msg;
}

export function showWinMessage(player: Player): string {
  const msg = `Player ${player} wins!`
  return msg;
}

export function showTurnMessage(player: Player): string {
  const msg = `Player ${player}'s turn`;
  return msg;
}

export function showAITurnMessage(): string {
  const msg = `AI is thinking...`;
  return msg;
}