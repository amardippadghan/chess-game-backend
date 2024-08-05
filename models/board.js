const Piece = require("./piece")

class Board {
    constructor(){
    
    }
    resetboard(){
        this.board = this.createInitialboard()
    }
    createInitialboard(){
        const initialBoard = Array(8).fill(null).map(()=>{
            Array(8).fill(null)
        })
        for(let i = 0 ; i < 8 ; i++){
            initialBoard[1][i] = new Piece("paws", "black");
            initialBoard[6][i]= new Piece("paws" , "white")
        }

        //bishop 
        initialBoard[0][2] = new Piece("bishop" , "black")
        initialBoard[0][5] = new Piece("bishop" , "black")
        initialBoard[7][2] = new Piece("bishop" , "white")
        initialBoard[7][5] = new Piece("bishop" , "white")

        //rook

        initialBoard[7][0] = new Piece("rook" , "white")
        initialBoard[7][7] = new Piece("rook" , "white")
        initialBoard[0][0] = new Piece("rook" , "black")
        initialBoard[0][7] = new Piece("rook" , "black")


        //knight 
        initialBoard[0][1] = new Piece("knight" , "black")
        initialBoard[0][6] = new Piece("knight" , "black")
        initialBoard[7][1] = new Piece("knight" , "white")
        initialBoard[7][6] = new Piece("knight" , "white")


        //queen 
        initialBoard[0][3] = new Piece("queen" , "black")
        initialBoard[7][3] = new Piece("queen" , "white")


        //king
        initialBoard[0][4] = new Piece("king" , "black")
        initialBoard[7][4] = new Piece("king" , "white")


        return initialBoard;
    }

    movePiece(start , end ){
        const [startRow , startCol] = start ;
        const [endRow , endCol] = end;
        const piece = this.board[startRow][startCol]
    
        if(!piece){
            throw new Error("no piece is at start ")
        }
    
        //logic for validate moves 
        // if(!piece.isValidMove(start , end , this.board)){
        //     throw new Error("invalid move for this piece")
        // }
        if(this.board[endRow][endCol] !== null && this.board[endRow][endCol].color === piece.color){
            throw new Error("cannot capture your own piece")
        }

        this.board[endRow][endCol] = piece
        this.board[startRow][startCol] = null ; 
        piece.hasMoved = true;
        
    }

    getBoard(){
        return this.board
    }
}

module.exports = Board;

