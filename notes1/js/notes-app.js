/**
 * ====================================
 * Notes Taking & Editing Application
 * ====================================
 * 
 * 'strict' mode and ES6
 * 
 * App Dependencies:
 * notes-functions.js   - for app class and functionality
 * notes-edit.js        - for editing individual notes
 * moment.js            - for date formatting
 * uuidv4.min.js        - for unique IDs
 */

'use strict'

// notes: check for and read from localStorage
let notes = NotesApp.checkForSavedNotes()

// object to store the filter results
const filters = {
    searchText: '',
    sortBy: 'newest'
}

// initial render of the notes
NotesApp.renderNotes(notes, filters)

// create new notes
document.getElementById('create-note').addEventListener('click', () => {
    const noteID    = uuidv4()
    const timestamp = moment().valueOf()

    notes.push({
        id: noteID,
        title:      '',
        body:       '',
        created:    timestamp,
        updated:    timestamp
    })
    NotesApp.saveNotes(notes)

    location.assign(`edit.html#${noteID}`)
})

// event handler for the text input for the filters
document.getElementById('search-text').addEventListener('input', e => {
    filters.searchText = e.target.value
    NotesApp.renderNotes(notes, filters)
})

document.getElementById('sort-order').addEventListener('change', e => {
    filters.sortBy = e.target.value
    NotesApp.renderNotes(notes, filters)
})

window.addEventListener('storage', e => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        NotesApp.renderNotes(notes, filters)
    }
})

