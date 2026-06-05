import express from "express"

const router = express.Router()

const students = [
  { id: 1, name: "Alice Johnson", result: 88, passed: true },
  { id: 2, name: "Bob Smith",    result: 45, passed: false },
  { id: 3, name: "Carol White",  result: 72, passed: true }
];


router.get("/" ,(req,res)=>{
    res.json(students)
})

router.get("/search",(req,res)=>{
    const {name,passed} = req.query
    let result = students
    
    if(name){
     result = result.filter(student => student.name.toLowerCase() === name.toLowerCase())
    }
    if(passed){
     result = result.filter(student => student.passed === (passed === "true")) 
    }
    if(result.length === 0){
        return res.json("no student found")
    }
    res.json(result)
})

router.get("/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const idx = students.findIndex(student =>student.id === id)
    if(idx === -1){
       return res.status(400).json({message : "not found"})
    }
   res.json(students[idx])
})

router.get("/:id/result",(req,res)=>{
    const id = parseInt(req.params.id)
    const idx = students.findIndex(student =>student.id === id)
    if(idx === -1){
      return  res.status(400).json({message : "not found"})
    }
    res.json(students[idx].result)
})



export default router ;



