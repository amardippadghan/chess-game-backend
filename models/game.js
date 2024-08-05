const Board = require("./board")
const Player = require("./player")


class Game {
    constructor() {
        this.board = new Board()
        this.players = []
        this.currentTurn = null;


    }

    addPlayer(player) {
        if (this.players.length < 2) {
            this.players.push(player)
            if (this.players.length === 2) {
                this.startGame();
            }
        }
        else {
            throw new Error("game has already 2 player")
        }
    }

    startGame() {
        this.currentTurn = this.players[0]
    }

    switchTurn() {

        this.currentTurn = this.currentTurn = this.players[0] ? this.players[1] : this.players[0]
    }


    makeMove(start, end) {
        const startIndices = this.convertNotationToIndices(start)
        const endIndices = this.convertNotationToIndices(end)
        if (this.isValidMove(startIndices, endIndices)) {
            this.board.movePiece(startIndices, endIndices)
            this.switchTurn()
        }

        else {
            throw new Error("invalid move")
        }

    }
    isValidMove (start , end ){
        const piece = this.board.getBoard()[start[0]][start[1]]
        return piece && piece.color === this.currentTurn.color && piece
        .isValidMove(start , end , this.board.getBoard())
    }
    convertNotationToIndices(notations) {
        const files = 'abcedfgh'
        const ranks = '12345678'
        const [file, rank] = notations.split(" ");
        const row =  8 - parseInt(rank, 10) 
        const col  = files.indexOf(file)

        if(row < 0 || row > 7 || col < 0 || col > 7) {
            throw new Error("invalid move") 
        }
        return [row, col]
    }

    getGameState() {
        return {
            board: this.board.getBoard(),
            currentTurn: this.currentTurn,
            players: this.players
        }
    }
}


module.exports = Game