import { z } from 'zod';

const walletSchema = z.object({
  // Must be a string
  id: z.string("ID is required ,ID must be a string"),

  // Must be a string
  senderId: z.string("Sender ID is required,Sender ID must be a string"),

  // Must be a string
  receiverId: z.string("Receiver ID is required,Receiver ID must be a string"),

  // Must be a positive whole number (no decimals)
  amount: z.number( "Amount is required")
    .int({ message: "Amount must be a whole number (no decimals)" })
    .positive({ message: "Amount must be a positive number" }),
});


const checkWalletValidation = async(req,res,next) =>{
    let result = walletSchema.safeParse(req.body)

    if(!result.success){
        return res.status(400).json({error : result.error.issues})
    }
    req.body = result.data  //clean body
    next()
}

export default checkWalletValidation