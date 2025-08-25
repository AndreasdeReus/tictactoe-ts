import { setupEventListeners } from './ui/events';
import { setupGame } from './game/gameState';
import { setupThemeToggle } from "./ui/theme"; 

setupEventListeners(); 
setupThemeToggle();
setupGame();