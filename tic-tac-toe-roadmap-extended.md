# Tic Tac Toe Project Roadmap ✅

A structured checklist to guide the development of your TypeScript-based Tic Tac Toe browser game.

---

## 🏗️ Phase 1: Setup

- [x] `index.html` with basic structure
- [x] `main.ts` as the app entry point
- [x] Initialize TypeScript and Vite
- [x] Create `src/types/types.ts` for shared types

---

## 🎮 Phase 2: Game State & Rendering

- [x] `game/gameState.ts` – manage the board array and moves
- [x] `ui/renderer.ts` – render the board based on game state
- [x] `ui/events.ts` – add event listeners for clicks
- [x] Player turn handling in `main.ts`

---

## 🧠 Phase 3: Game Logic

- [x] `game/gameRules.ts` – add `checkWinner` and `isDraw` logic
- [x] Show win/draw result in UI
- [x] Disable board after game ends

---

## 🔁 Phase 4: Reset & UI Feedback

- [x] Add "Restart Game" button
- [x] Implement `resetBoard()` logic in `gameState.ts`
- [x] Display turn indicators and result messages
- [x] Improve error handling (e.g., click on occupied cell)

---

## 🤖 Phase 5: AI Opponent

- [x] `game/bot.ts` – implement easy AI (random move)
- [x] Add difficulty selector to UI
- [x] Implement medium AI (win/block logic)
- [x] Implement hard AI using Minimax algorithm

---

## 💄 Phase 6: Styling & UX

- [x] `ui/styles.css` – style the game board and layout
- [x] Make layout responsive (grid/flexbox)
- [x] Add hover effects and animations
- [x] Add light/dark mode toggle

---

## 🧪 Phase 7: Testing

- [x] Set up test framework (e.g., Vitest or Jest)
- [x] Write unit tests for `gameRules.ts`
- [x] Write unit tests for `bot.ts`
- [x] Write integration tests for user interactions
- [ ] Add basic end-to-end test (e.g., using Playwright or Cypress)

---

## 📚 Phase 8: Documentation

- [x] Add README.md with project overview and setup instructions
- [ ] Create architecture overview (folder structure explanation)
- [ ] Add usage instructions for different modes (human vs human, vs AI)
- [ ] Include contribution guidelines (if open source)

---

## 🚀 Phase 9: Deployment

- [ ] Build production-ready app using `vite build`
- [ ] Host on GitHub Pages, Netlify, or Vercel
- [ ] Add custom domain (optional)
- [ ] Add favicon and meta tags for better SEO/sharing
- [ ] Enable PWA support (optional installable app)

---

## 🧩 Optional Extras

- [ ] Scoreboard to track session wins
- [ ] Move history and undo functionality
- [ ] Game timer
- [ ] WebSocket multiplayer mode

---

Keep checking off tasks and enjoy building your game!
