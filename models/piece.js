
class Piece {
    constructor(type, color) {
        this.type = type
        this.color = color
        this.hasMoved = false;
    }


    isValidMove(start, end, board) {
        switch (this.type) {
            case "pawn":
                return this.isValidPawsMove(start, end, board)
            case "rook":
                return this.isValidRookMove(start, end, board)
            case "knight":
                return this.isValidKnightMove(start, end, board)
        }
    }


    isValidPawsMove(start, end, board) {
        const [startRow, startCol] = start;
        const [endRow, endCol] = end;
        const direction = this.color === "white" ? -1 : 1;
        if (startCol === endCol && board[endRow][endCol] === null) {
            if (startRow + direction === endRow) {
                return true;
            }
            if (!this.hasMoved && startRow + 2 * direction === endRow && board[startRow + direction][startCol] === null) {
                return true
            }
            if (Math.abs(startCol - endCol) === 1 && startRow + direction === endRow && board[endRow][endCol] === null && board[endRow][endCol].color !== this.color) return true
        }
        return false;
    }


    isValidRookMove(start, end, board) {
        const [startRow, startCol] = start;
        const [endRow, endCol] = end;

        if (startRow !== endRow && startCol !== endCol) return false

        const [stepRow, stepCol] = [Math.sign(endRow - startRow), Math.sign(endRow - endCol)]
        let row = startRow - stepRow
        let col = startCol - stepCol

        while (row !== endRow || col !== endCol) {
            if (board[row][col] !== null) return false
            row += stepRow
            col += stepCol
        }
        return board[endRow][endCol] === null || board[endRow][endCol].color !== this.color
    }

    isValidKnightMove(start, end, board) {
        const [startRow, startCol] = start;
        const [endRow, endCol] = end;

        const rowDiff = Math.abs(startRow - endRow)
        const colDiff = Math.abs(startCol - endCol)

        if ((rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2)) {
            return board[endRow][endCol] === null || board[endRow][endCol].color !== this.color;
        }
        return false

    }

    
}

module.exports = Piece;