import { describe, expect, it } from "vitest"
import { checkDraw, checkWinner } from "../src/game/gameRules";

import type { Cell } from "../src/types/types";

describe("checkWinner", () => {
    describe("rows", () => {
        it('detects top row win for X', () => {
            // Arrange board with top row winner X
            const cells: Cell[] = [
                "X","X","X",
                "","O","",
                "","O",""
            ]

            // Act
            const [winner, winningLine] = checkWinner(cells);

            // Assert
            expect(winner).toBe("X");
            expect(winningLine).toEqual([0,1,2]);
        });
        it('detects middle row win for X', () => {
            // Arrange board with top row winner X
            const cells: Cell[] = [
                "","O","",
                "X","X","X",
                "","O",""
            ]

            // Act
            const [winner, winningLine] = checkWinner(cells);

            // Assert
            expect(winner).toBe("X");
            expect(winningLine).toEqual([3,4,5]);
        });
        it('detects bottom row win for X', () => {
            // Arrange board with top row winner X
            const cells: Cell[] = [
                "","O","",
                "","O","",
                "X","X","X"
            ]

            // Act
            const [winner, winningLine] = checkWinner(cells);

            // Assert
            expect(winner).toBe("X");
            expect(winningLine).toEqual([6,7,8]);
        });
    });
    describe("columns", () => { 
        it('detects left column win for O', () => {
            // Arrange board with top row winner X
            const cells: Cell[] = [
                "O","X","",
                "O","","",
                "O","X","X"
            ]

            // Act
            const [winner, winningLine] = checkWinner(cells);

            // Assert
            expect(winner).toBe("O");
            expect(winningLine).toEqual([0,3,6]);
        });
        it('detects middle column win for O', () => {
            // Arrange board with top row winner X
            const cells: Cell[] = [
                "X","O","",
                "","O","",
                "X","O","X"
            ]

            // Act
            const [winner, winningLine] = checkWinner(cells);

            // Assert
            expect(winner).toBe("O");
            expect(winningLine).toEqual([1,4,7]);
        });
        it('detects right column win for O', () => {
            // Arrange board with top row winner X
            const cells: Cell[] = [
                "X","X","O",
                "","","O",
                "X","","O"
            ]

            // Act
            const [winner, winningLine] = checkWinner(cells);

            // Assert
            expect(winner).toBe("O");
            expect(winningLine).toEqual([2,5,8]);
        });
    });
    describe("diagonal", () => { 
        it('detects top left to bottom right diagonal win for O', () => {
            const cells: Cell[] = [
                "O","","X",
                "","O","",
                "","X","O"
            ]

            // Act
            const [winner, winningLine] = checkWinner(cells);
        
            // Assert
            expect(winner).toBe("O");
            expect(winningLine).toEqual([0,4,8]);
        });
        it('detects bottom left to top right diagonal win for X', () => {
            const cells: Cell[] = [
                "O","","X",
                "","X","",
                "X","","O"
            ]

            // Act
            const [winner, winningLine] = checkWinner(cells);
        
            // Assert
            expect(winner).toBe("X");
            expect(winningLine).toEqual([2,4,6]);
        });
    });
    describe("no winners", () => { 
        it('detects no winner', () => {
            const cells = Array(9).fill("");

            // Act
            const [winner, winningLine] = checkWinner(cells);

            // Assert
            expect(winner).toBeNull();
            expect(winningLine).toBeUndefined();
        });     
    });
});
describe("checkDraw", () => {
    it('detects draw', () => {
        const cells: Cell[] = [
            "O","O","X",
            "X","X","O",
            "O","X","X"
        ]

        // Act
        const result = checkDraw(cells)

        // Assert
        expect(result).toBe(true);
    });

    it('game still in progress', () => {
        const cells: Cell[] = [
            "O","","X",
            "","","",
            "","X","O"
        ]

        // Act
        const result = checkDraw(cells)

        // Assert
        expect(result).toBe(false);
    });
});
describe('edge cases', () => {
    it('multiple winning lines, first found', () => {
        const cells: Cell[] = [
            "X","O","O",
            "X","X","X",
            "X","O","O"
        ]

        // Act
        const [winner, winningLine] = checkWinner(cells);

        // Assert
        expect(winner).toBe("X");
        expect(winningLine).toEqual([3,4,5]);
    });
    it('conflicting winners, first scanned wins', () => {
        const cells: Cell[] = [
            "X","O","O",
            "X","O","X",
            "X","O","O"
        ]

        // Act
        const [winner, winningLine] = checkWinner(cells);

        // Assert
        expect(winner).toBe("X");
        expect(winningLine).toEqual([0,3,6]);
    });
});