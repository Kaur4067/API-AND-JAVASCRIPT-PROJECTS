import express from "express"
import walletRouter from "./ROUETRS/walletRouter.js"

const app = express()
app.use(express.json())

app.use("/wallet",walletRouter)


let port = 3000
app.listen(port,()=>{
   console.log(`server is running at ${port}`);
   
})