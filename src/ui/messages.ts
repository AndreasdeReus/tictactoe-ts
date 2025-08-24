import type { Player } from '../types/types.ts';

export function showDrawMessage(): { text: string, addClass: string } {
  const msg = "It's a draw!"
  return { text: msg, addClass:"draw" }; 
}

export function showWinMessage(player: Player): { text: string, addClass: string } {
  const msg = `Player ${player} wins!`
  return { text: msg, addClass:"win" }; 
}

export function showTurnMessage(player: Player): { text: string, addClass: string } {
  const msg = `Player ${player}'s turn`;
  return { text: msg, addClass:"turn" }; 
}

export function showAITurnMessage(): { text: string, addClass: string } {
  const msg = `AI is thinking...`;
  return { text: msg, addClass:"turn" }; 
}