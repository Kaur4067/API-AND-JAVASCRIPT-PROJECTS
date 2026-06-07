
import { transactions } from "../fakeDatabse.js";

const addTransactions = async(newData) =>{
 
  newData.status = "complete"

  transactions.push(newData)

  return transactions

}
export  default addTransactions
