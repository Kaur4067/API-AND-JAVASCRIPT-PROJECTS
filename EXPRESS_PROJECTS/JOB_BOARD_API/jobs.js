import express from "express"
import dotenv from "dotenv"
dotenv.config()

const app = express()
app.use(express.json())

import jobRouter from "./jobRouter.js"

app.use("/jobs" ,jobRouter);



let port = process.env.PORT
app.listen(port,()=>{
   console.log(`server is running at ${port}`);
   
})