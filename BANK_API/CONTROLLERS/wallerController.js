import addTransaction from "../MODELS/walletModel.js"

const transaction = async(req,res) =>{
    let result =  await addTransaction(req.body)
    res.json(result)
}

export default transaction