import express from "express"
import dotenv from "dotenv"
dotenv.config()
import morgan from "morgan"


import checkApikey from "./MIDDLEWARES/checkApikey.js"


const app = express()
app.use(morgan("dev"))
app.use(express.json())



app.use(checkApikey);

app.get("/users" ,(req,res)=>{
    res.send("welcome to our server")
})

let port = process.env.PORT
app.listen(port,()=>{
   console.log(`server is running at ${port}`);
   
})