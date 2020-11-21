const validator = require('validator')
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')
const { listNotes } = require('./notes.js')



// add
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder:{
        title:{
            describe:'Note title',
            demandOption:true,
            type:'string',
        },
        body:{
            describe:'Body',
            demandOption:true,
            type:'string',
        }

        
    },
    handler(argv){
        notes.addNote(argv.title,argv.body)
    }
})
// remove
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
        title: {
            describe: 'Note Title',
            demandOption:'true',
            type:'string'
        }
    },
    handler(argv){
        notes.removeNote(argv.title)
    }
})
// read
yargs.command({
    command: 'read',
    describe: 'Read the note',
    builder: {
        title:{
            describe: 'Note Title',
            demandOption:'true',
            type:'string'
        }
    },
    handler(argv){
        notes.readNote(argv.title)
    }
})
// list
yargs.command({
    command: 'list',
    describe:'To list all the notes',
    handler(){
        notes.listNotes()
        
    }
})
yargs.parse()
