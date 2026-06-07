import express from "express"
import transaction from "../CONTROLLERS/wallerController.js";

import checkWalletValidation from "../SCHEMAS/walletSchema.js";
import authentication from "../MIDDLEWARES/authentication.js";
const router = express.Router()

router.post("/transfer",checkWalletValidation,authentication,transaction)

export default router