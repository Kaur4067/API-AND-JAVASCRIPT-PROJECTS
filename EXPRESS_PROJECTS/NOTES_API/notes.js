import express from "express"
import dotenv from "dotenv"
dotenv.config()
import notesRouter from "./ROUTERS/notesRouter.js"

const app = express()
app.use(express.json())

app.use("/notes",notesRouter)


let port = process.env.PORT
app.listen(port,()=>{
   console.log(`server is running at ${port}`);
   
})