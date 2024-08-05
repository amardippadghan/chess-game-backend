const express = require("express")
const cors = require("cors")
const gameRoutes = require("./routes/GameRoutes")


const app = express()
app.use(cors())

app.use(express.json())

app.use("/game" , gameRoutes)


app.get("/" , async(req, res)=>{
    res.send("application is running ")
})



app.listen(3000 , ()=>{
    console.log("application is running on port 3000")
})