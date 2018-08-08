/**
 * ================
 * Notes Functions
 * ================
 * 
 * 'strict' mode and ES6
 * 
 * for use with notes-app.js
 */

'use strict'

// class for notes functionality
class NotesClass {

    // notes: check for and read from localStorage
    checkForSavedNotes() {
        // check from saved data
        const notesJSON = localStorage.getItem('notes')

        try {
            // convert to an object if valid data is found or store empty array
            return notesJSON ? JSON.parse(notesJSON) : []
        } catch (e) {
            // in event of corrupt data, store empty array
            console.log('there was a problem with the data, restarting notes storage')
            return []
        }
    }

    // save notes to localStorage
    saveNotes(notes) {
        localStorage.setItem('notes', JSON.stringify(notes))
    }

    // remove notes
    removeNote(noteID) {
        const noteIndex = notes.findIndex(note => note.id === noteID)

        if (noteIndex > -1) notes.splice(noteIndex, 1)
    }

    // generate DOM structure for individual note
    generateNoteDOM(note) {
        // create the note elements
        const createNoteP       = document.createElement('p')
        const createNoteLink    = document.createElement('a')
        const createNoteBtn     = document.createElement('span')
        const createNoteEdit    = document.createElement('ion-icon')

        // setup the link
        createNoteLink.setAttribute('href', `edit.html#${note.id}`)

        // add edit icon
        createNoteEdit.setAttribute('name', 'create')
        createNoteEdit.className = 'note-edit-icon'

        // setup the button content and classes for button and text
        createNoteLink.className    = 'note-text' 
        createNoteBtn.innerHTML     = '<ion-icon name="remove-circle-outline"></ion-icon>'
        createNoteBtn.className     = 'note-close-btn'

        // event handler for button
        createNoteBtn.addEventListener('click', () => {
            this.removeNote(note.id)
            this.saveNotes(notes)
            this.renderNotes(notes, filters)
        })

        createNoteP.appendChild(createNoteBtn)

        // set the note text
        createNoteLink.textContent = note.title.length > 0 ? note.title : 'Unnamed note'

        createNoteLink.appendChild(createNoteEdit)
        createNoteP.appendChild(createNoteLink)

        // return the final paragraph
        return createNoteP
    }

    // filter the notes via the dropdown
    sortNotes(notes, sortBy) {
        if (sortBy === 'edited') {
            return notes.sort((a, b) => {
                if (a.updated > b.updated) return -1
                else if (a.updated < b.updated) return 1
                else return 0
            })
        } else if (sortBy === 'newest') {
            return notes.sort((a, b) => {
                if (a.created > b.created) return -1
                else if (a.created < b.created) return 1
                else return 0
            })
        } else if (sortBy === 'oldest') {
            return notes.sort((a, b) => {
                if (a.created > b.created) return 1
                else if (a.created < b.created) return -1
                else return 0
            })
        } else if (sortBy === 'atoz') {
            return notes.sort((a, b) => {
                if (a.title.toLowerCase() < b.title.toLowerCase()) return -1
                else if (a.title.toLowerCase() > b.title.toLowerCase()) return 1
                else return 0
            })
        } else if (sortBy === 'ztoa') {
            return notes.sort((a, b) => {
                if (a.title.toLowerCase() < b.title.toLowerCase()) return 1
                else if (a.title.toLowerCase() > b.title.toLowerCase()) return -1
                else return 0
            })
        } else {
            return notes
        }
    }

    // render notes
    renderNotes(notes, filters) {
        notes = this.sortNotes(notes, filters.sortBy)
        // if input filter is used filter out the ones that don't match
        const filterdNotes = notes.filter(note => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))
        
        document.getElementById('list-notes').innerHTML = ''
        // generate notes based on the filtered list
        filterdNotes.forEach(note => {
            document.getElementById('list-notes').appendChild(this.generateNoteDOM(note))
        })
    }
    
    lastEdited(timestamp) {
        return `Last updated: ${moment(timestamp).fromNow()}`
    }

} // class ends

const NotesApp = new NotesClass()