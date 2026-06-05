import dotenv from "dotenv"
dotenv.config()

import {z} from "zod"

import express from "express"

const app = express()
app.use(express.json())

//health check up of server

app.get("/health" , (req,res) =>{
    res.status(200).json({
       status : "ok",
       uptime : process.uptime()
    })
});

app.get("/ping",(req,res)=>{
    res.send("pong")
})

app.post("/echo",(req,res)=>{
    res.json(req.body)
})


let port = process.env.PORT

app.listen(port,()=>{
    console.log(`server is running at ${port}`);
    
})