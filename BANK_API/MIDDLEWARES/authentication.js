
import {users} from "../fakeDatabse.js"
import AppError from "../utils/AppError.js";


 const authentication = async(req,res,next) => {
 const senderID = req.body.senderId
 const receiverID =req.body.receiverId

 const idx1 =  await users.findIndex(user => user.id === senderID)
 const idx2 =  await users.findIndex(user => user.id === receiverID)


 //does both exists?
 if(idx1 === -1 || idx2 === -1){

 if(idx1 === -1){
   return res.status(401).json({error : "no such sender exists"})
 }
 if(idx2 === -1){
    return res.status(401).json({error : "no such receiver exists"})
 }

}


//self transfer
if(idx1 === idx2){
    return res.status(400).json(`${users[idx1].name} is self transferring.Cannot send to yourself`) 

}

 //suspended check
    if( await users[idx1].accountStatus === "suspended"){
     return res.status(403).json(`${users[idx1].name} status is suspended,hence unable to transfer`)

 }
 

 //amount check
  let amount = req.body.amount
  if(amount > users[idx1].balance){
    let error = new AppError(403,`transaction not possible as ${users[idx1].name} is running on low balance`)
    return res.status(403).json({
      statusCode : error.statusCode,
      error : error.message,
      availableBalance : `total balance of ${users[idx1].name} is ${users[idx1].balance}`
    })
  }

  //if all passed =>transaction =>possible
 next()

}

export default authentication

