/**
 * =============
 * Note Editing
 * =============
 * 
 * 'strict' mode and ES6
 * 
 * for use with the edit.html page
 */

'use strict'

let notes           = NotesApp.checkForSavedNotes()
const noteID        = location.hash.substring(1)
const noteTitle     = document.getElementById('note-title')
const noteBody      = document.getElementById('note-body')
const timestamp     = moment().valueOf()
const lastUpdated   = document.getElementById('last-updated')

let note = notes.find((note) => note.id === noteID)

if (!note) location.assign('index.html')

lastUpdated.textContent = NotesApp.lastEdited(note.updated)
noteTitle.value         = note.title
noteBody.value          = note.body

noteTitle.addEventListener('input', () => {
    note.title                  = noteTitle.value
    note.updated                = timestamp
    lastUpdated.textContent     = NotesApp.lastEdited(note.updated)

    NotesApp.saveNotes(notes)
})

noteBody.addEventListener('input', () => {
    note.body                   = noteBody.value
    note.updated                = timestamp
    lastUpdated.textContent     = NotesApp.lastEdited(note.updated)

    NotesApp.saveNotes(notes)
})

document.getElementById('remove-all').addEventListener('click', () => {
    NotesApp.removeNote(noteID)
    NotesApp.saveNotes(notes)

    location.assign('index.html')
})

window.addEventListener('storage', e => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)

        note = notes.find((note) => note.id === noteID)
        
        if (!note) location.assign('index.html')

        noteTitle.value         = note.title
        noteBody.value          = note.body
        note.updated            = timestamp  
        lastUpdated.textContent = NotesApp.lastEdited(note.updated)
    }
})


