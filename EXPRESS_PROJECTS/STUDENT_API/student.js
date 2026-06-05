import express from "express"
import dotenv from "dotenv"
dotenv.config()

const app = express()
app.use(express.json())

import studentRouter from "./ROUTERS/studentRouter.js"

app.use("/students" ,studentRouter)



let port = process.env.PORT
app.listen(port,()=>{
   console.log(`server is running at ${port}`);
   
})