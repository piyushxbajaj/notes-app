const chalk = require('chalk')
const fs = require('fs')

const listNotes=()=>{
    console.log(chalk.green.inverse('Your Notes'))
    const notes = loadNotes()
    notes.forEach((note) =>{
            console.log(chalk.green(note.title))
    })
}   
const removeNote= (title) => {
    const notes = loadNotes()
    console.log(title)
    const notesToKeep = notes.filter((note)=>{return note.title !== title})
    if (notesToKeep.length === notes.length){
        console.log(chalk.red.inverse(title+": Cannot remove what doesn't exist"))
    }else{
        saveNotes(notesToKeep)
        console.log(chalk.green.inverse(title+": Note Deleted"))
    }
    
}
const addNote = (title,body) => {
    const notes = loadNotes()
    // const duplicateNotes = notes.filter((note)=> note.title===title)
    const duplicateNote = notes.find((note)=> note.title === title)

    debugger
    if (!duplicateNote){
        notes.push({
            title:title,
            body:body
        })
    
        saveNotes(notes)
        console.log(chalk.green.inverse("Note added"))
    } else{
        console.log(chalk.red.inverse("Duplicate Note!"))
    }
    
} 

const readNote = (title) =>{
    const notes = loadNotes()
    const selectedNote = notes.find((note)=> note.title === title)
    if (selectedNote){
        console.log(chalk.green.inverse(selectedNote.title))
        console.log(selectedNote.body)
    }else{
        console.log(chalk.red('Note not found!'))
    }
    

}
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}
const loadNotes = () =>{
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch (e){
        return []

    }
    
}

module.exports = {
    
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}