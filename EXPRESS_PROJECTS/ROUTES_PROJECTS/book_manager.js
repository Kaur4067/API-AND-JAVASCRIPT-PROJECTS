import dotenv from "dotenv"
dotenv.config()

import {z} from "zod"

import express from "express"

const app = express()
app.use(express.json())

//fake database

let books = [
  {
    id: 1,
    title: "The Alchemist",
    available: true,
    rating: 4.8
  },
  {
    id: 2,
    title: "Atomic Habits",
    available: false,
    rating: 4.7
  },
  {
    id: 3,
    title: "Deep Work",
    available: true,
    rating: 4.6
  }
];

const createSchema = z.object({
    id: z.number().positive(),
    title: z.string().min(3).max(10),
    available:z.boolean(),
    rating:z.number()
})

const checkValidation = (schema) => (req,res,next) =>{
    const result = schema.safeParse(req.body);
    if(!result.success){
       return  res.status(400).json({
        error : result.error.issues
       });
    }
    req.body = result.data  //cleaner body
    next()
}


//send all books
app.get("/books" ,(req,res)=>{
    res.status(200).json(books)
})

//create a new book_data in db
app.post("/books",checkValidation(createSchema),(req,res)=>{
    books.push(req.body)
    res.status(201).json({
        message : `created successfully .The updated db is ${JSON.stringify(books)}`
       }
   )
})

//update a books title
app.put("/books/:id",(req,res)=>{
    const id = parseInt(req.params.id)
    const idx = books.findIndex(book => book.id === id)
    if(idx === -1){
       return res.send(`book of id ${id} doesnot exists`)
    }
    books[idx].title = req.body.title
    res.status(200).json({message : `updated successfully.The updated db is ${JSON.stringify(books)}`})
})

//delete a book data
app.delete("/books/:id" , (req,res)=>{
    const id = parseInt(req.params.id)
    const idx = books.findIndex(book => book.id === id)
    if(idx === -1){
       return res.send(`book of id ${id} doesnot exists`)
    }
    books = books.filter(book => book.id !== id)
    res.status(200).json({
        message: `deleted successfully .The updated db is ${JSON.stringify(books)}`
    })

})


let port = process.env.PORT
app.listen(port,()=>{
    console.log(`server is running at ${port}`);
    
})