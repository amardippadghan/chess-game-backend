const Game = require("../models/game")
const Player = require("../models/player")


let currentGame = null ; 


const createGame = (req, res)=>{
    currentGame = new Game()
    res.status(201).send({message : "game is crated "})
}

const addPlayer= (req, res)=>{
    if(!currentGame){
        return res.status(400).send({message :"no game in progress"})
    }
    const {name , color } = req.body

    if(!name || !color){
        return res.status(400).send({message : "name and color required"})
    }

    try {
        const player = new Player(name , color);
        currentGame.addPlayer(player)
        res.status(200).send({message : "player added successfully" , game : currentGame.getGameState()})
        
    } catch (error) {
        res.status(400).send({message : error.message})
        
    }
}

const makeMove = (req, res)=>{
    if(!currentGame){
        res.status(400).send({message : "no game in progress"})
    }

    const {start , end } = req.body
    if(!start || !end){
        res.status(400).send({message : "start and end position is required"})
    }

    try {
        currentGame.makeMove(start , end);
        res.status(200).send({message :  "move made successfully" , game : currentGame.getGameState()})
        
    } catch (error) {

        res.status(400).send({message : error.message})


        
    }
}

const getGameState = (req, res)=>{
    if(!currentGame){
        return res.status(400).send({message : "no Game in progress"})
    }


    res.status(200).send(currentGame.getGameState())
}



module.exports = {
    addPlayer , 
    createGame , 
    makeMove , 
    getGameState

}