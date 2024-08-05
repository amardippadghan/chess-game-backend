const express = require("express")
const router = express.Router()

const gameController = require("../controllers/gameController")

router.post("/create" , gameController.createGame)

router.post("/addPlayer" , gameController.addPlayer)

router.post("/move" , gameController.makeMove)

router.get("/state" , gameController.getGameState)


module.exports = router