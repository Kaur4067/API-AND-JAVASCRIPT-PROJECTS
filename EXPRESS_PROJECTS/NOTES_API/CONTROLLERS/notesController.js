import notesModel from "../MODELS/notesModel.js";

const getAllNotes = async(req,res)=>{
    let result = await notesModel.getAllNotes()
    res.json(result)
}

const getNotesById =  async(req,res)=>{
const id = parseInt(req.params.id)
 let result = await notesModel.getNotesById(id)
 res.json(result)
}

const createNotes = async(req,res)=>{
    let result = await notesModel.createNotes(req)
    res.json(result)
}

const updateNotesById = async(req,res) =>{
    const id  = parseInt(req.params.id)
    let result = await notesModel.updateNotesById(id,req.body)
    res.json(result)
}

const deleteNotes = async(req,res)=>{
    const id  = parseInt(req.params.id)
    let result = await notesModel.deleteNote(id)
    res.json(result)
}

export default {getAllNotes,getNotesById,createNotes,updateNotesById,deleteNotes}