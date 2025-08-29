import { setupEventListeners } from './ui/events';
import { resetGame, setCheatsEnabled, setDifficulty, setupGame } from './game/gameState';
import { setupThemeToggle } from "./ui/theme"; 

setupEventListeners(); 
setupThemeToggle();
setupGame();

(window as any).ttt = {
    setCheatsEnabled,
    resetGame,
    setDifficulty,
};