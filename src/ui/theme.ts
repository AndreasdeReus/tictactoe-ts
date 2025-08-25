import { fetchElementById } from "../utils/dom";
import { Theme } from "../types/types";

const STORAGE_KEY = "ttt-theme";
const DATA_ATTR = "data-theme";
const DARK = "dark";

function initialTheme(): Theme {
    const saved = localStorage.getItem(STORAGE_KEY) as Theme | null;
    if (saved) return saved;
    const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches ?? false;
    return prefersDark ? "dark" : "light";
}

function loadTheme(): Theme {
    return initialTheme();
}

function saveTheme(theme: Theme): void {
    localStorage.setItem(STORAGE_KEY, theme);
}

function applyTheme(theme: Theme): void {
    const root = document.body;

    if(theme === "dark"){
        root.setAttribute(DATA_ATTR, DARK);
    } else {
        root.removeAttribute(DATA_ATTR);
    }
}

export function setupThemeToggle(): void {
    let current: Theme = loadTheme();
    applyTheme(current);

    const button = fetchElementById("themeToggle", HTMLButtonElement);
    const updateButtonUi = () => {
        if(button) {
            const isDark = document.body.hasAttribute(DATA_ATTR);
            button.textContent = isDark ? "🌙 Dark" : "☀️ Light";
            button.setAttribute("aria-pressed", String(isDark));
            button.title = `Theme: ${current}`;
        };
    }
    if(button) {
        button.addEventListener("click", () => {
            current = current === "light" ? "dark": "light";
            applyTheme(current);
            saveTheme(current);
            updateButtonUi();
        });
    }

    updateButtonUi();
}