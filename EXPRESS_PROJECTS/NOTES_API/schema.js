
import { z } from 'zod';

const createNoteSchema = z.object({
  id: z.number("ID is required").min(1, "ID cannot be empty"),
  
  title: z.string("Title is required").min(3, "Title must be at least 3 characters long")
    .max(100, "Title cannot exceed 100 characters"),
  
  content: z.string("Content is required").min(1, "Content cannot be empty"),
  
  status: z.enum(['pending', 'in-progress', 'completed'])
});




const checkValidation = (schema)=> async(req,res,next)=>{
    const result = await schema.safeParse(req.body)

    if(!result.success){
        return res.json({error : result.error.issues})
    }
    req.body = result.data  //cleaner body
    next()
}

export default {checkValidation,createNoteSchema}