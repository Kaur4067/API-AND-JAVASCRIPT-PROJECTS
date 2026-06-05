
//FAKE DATABASE

let notes = [
  {
    id: 1,
    title: "Updated Shopping List",
    content: "Purchase server racks, 5 CAT6 cables, and a backup UPS.",
    status: "pending"
  },
  {
    id: 2,
    title: "API Authentication Fix",
    content: "Resolve the token expiration bug causing intermittent 401 errors.",
    status: "in-progress"
  },
  {
    id: 3,
    title: "Database Backup Schema",
    content: "Review and approve the new automated daily backup strategy.",
    status: "completed"
  }
];


const getAllNotes = ()=>{
    return notes
};


const getNotesById = (id) =>{
    const idx = notes.findIndex(note =>note.id === id)

    if(idx === -1){
        return "no such id exists"
    }

   let result = notes
   result = result.filter(note => note.id === id)
   return result
}


const createNotes = (req)=>{
   notes.push(req.body)
   return notes
}


const updateNotesById = (id,updateData) => {
 const idx = notes.findIndex(note =>note.id === id)

    if(idx === -1){
        return "no such id exists"
    }
  const{content,title,status} = updateData

  if(content){
    notes[idx].content = content
  }
  if(title){
    notes[idx].title = title
  }
  if(status){
    notes[idx].status = status
  }
return notes

};


const deleteNote = (id)=>{
    const idx = notes.findIndex(note =>note.id === id)

    if(idx === -1){
        return "no such id exists"
    }

    notes =notes.filter(note => note.id !== id)
    return notes

}

export default{getAllNotes,getNotesById,createNotes,updateNotesById,deleteNote}


