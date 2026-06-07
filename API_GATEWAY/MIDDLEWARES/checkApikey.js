
import data from "../fakeDatabse.js"

const checkApikey = async (req,res,next) =>{
    
   let apikey = req.headers["authorization"]

   if(!apikey){
    return res.status(403).json({
        success : false,
        message : "missing apikey "

    });
   }

   let idx = data.findIndex(obj => obj.apiKeyName === apikey)

   if(idx === -1){
    return res.status(403).json({message : "blocked,no such apikey exists!!"})
   }

   //if the key exists check it plan 
   let checkType = data[idx].planType

   if(checkType === "Free"){
    return res.status(403).json({message : "blocked,free tiers no allowed!!"})
   }

   //premium planned user => get through this
   
    next()
   }

   export default checkApikey