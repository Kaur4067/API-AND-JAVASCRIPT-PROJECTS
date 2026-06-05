import express from"express"

import {z} from "zod"
const router = express.Router()

let jobs = [
  { id: 1, name: "Backend Developer",    location: "Bangalore, India", type: "Full-Time" },
  { id: 2, name: "UI/UX Designer",       location: "Remote",           type: "Freelance" },
  { id: 3, name: "Data Analyst",         location: "Mumbai, India",    type: "Part-Time" }
];


const jobsSchema = z.object({
  id:       z.number().positive(),
  name:     z.string().min(2).max(100),
  location: z.string().min(2),
  type:     z.enum(["Full-Time", "Part-Time", "Freelance", "Contract"])
});

const validation = (schema) => async (req,res,next)=>{
      const result =  await schema.safeParseAsync(req.body);
    if(!result.success){
       return  res.status(400).json({
        error : result.error.issues
       });
    }
    req.body = result.data  //cleaner body
    next()
}

//routes

router.get("/",(req,res)=>{
    res.json(jobs)
});

router.get("/search",(req,res)=>{
    const{location,type} = req.query

     let result = jobs

    if(location){
     result = result.filter(job => job.location === location)
    }

    if(type){
    result = result.filter(job => job.type === type)
    }

    if(result.length === 0){
       return res.json({error: "no such job is found in database"})
    }
    res.json(result)
    
})

router.get("/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const idx = jobs.findIndex(job =>job.id === id)

    if(idx === -1){
        return res.json("no such id exists")
    }
    res.json(jobs[idx])
})

router.post("/" ,validation(jobsSchema),(req,res)=>{
    jobs.push(req.body)
    res.status(201).json(jobs)
});

router.put("/:id" , (req,res)=>{
    const id = parseInt(req.params.id)
    const idx = jobs.findIndex(job =>job.id === id)

    if(idx === -1){
        return res.json("no such id exists")
    }
  const{name,location,type} = req.body

  if(name){
    jobs[idx].name = name
  }
  if(location){
    jobs[idx].location = location
  }
  if(type){
    jobs[idx].type = type
  }
  res.json(jobs)

});

router.delete("/:id" , (req,res)=>{
    const id = parseInt(req.params.id)
    const idx = jobs.findIndex(job =>job.id === id)

    if(idx === -1){
        return res.json("no such id exists")
    }

    jobs = jobs.filter(job => job.id !== id)
   res.json(jobs)
})

export default router

