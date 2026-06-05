import notesController from "../CONTROLLERS/notesController.js";
import express from "express"
import schema from "../schema.js";

const router = express.Router()

router.get("/" ,notesController.getAllNotes)

router.get("/:id" , notesController.getNotesById)

router.post("/",schema.checkValidation(schema.createNoteSchema),notesController.createNotes)

router.put("/:id",notesController.updateNotesById)

router.delete("/:id",notesController.deleteNotes)

export default router
