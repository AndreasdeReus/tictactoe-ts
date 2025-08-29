import { checkDraw, checkWinner, getEmptyCells } from "../src/game/gameRules";
import { getAIMove } from "../src/game/bot";
import { Cell, Difficulty, Player } from "../src/types/types";
import { describe, expect, it } from "vitest"
import { getOpponent } from "../src/game/gameState";

describe("easy difficulty", () => {
    const difficulty = 'easy';
    const opponent = "O";
    const aiPlayer = "X";
    it('AI random valid move', () => {
            const cells: Cell[] = [
            "","O","",
            "X","","X",
            "","O",""
        ];

        // Act
        const result = getAIMove(cells, difficulty, opponent, aiPlayer);
        const emptyCells = getEmptyCells(cells);

        // Assert
        expect(emptyCells).toContain(result);
    });
});


describe("impossible difficulty", () => {
    const difficulty = 'impossible';
    let opponent: Player = "O";
    let aiPlayer: Player = "X";
    it('perfect play AI vs AI, draw', () => {
        let cells: Cell[] = [
            "","","",
            "","","",
            "","",""
        ];

        // Act
        let currentPlayer: Player = aiPlayer;
        cells = AIVsAI(cells, currentPlayer, difficulty);
        const draw = checkDraw(cells);
        const [winner ,] = checkWinner(cells);

        // Assert
        expect(draw).toBe(true);
        expect(winner).toBeNull();
    });
});

function AIVsAI(cells: Cell[], currentPlayer: Player, difficulty: Difficulty) {
    let winner: Player | null =  null;
    let totalMoves = 0;
    while (!checkDraw(cells) && !winner) {
        if (totalMoves >= 9) expect.fail();
        let result = getAIMove(cells, difficulty, getOpponent(currentPlayer), currentPlayer);
        expect(result).toBeGreaterThan(-1);
        cells[result] = currentPlayer;
        currentPlayer = getOpponent(currentPlayer);
        [winner ,] = checkWinner(cells);
        totalMoves ++;
    };
    return cells;
};