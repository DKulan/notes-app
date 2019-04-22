// Check for existing saved data in local storage
const getSavedNotes = () => {
    const notesJSON = localStorage.getItem('notes')
    if (notesJSON !== null) {
        return JSON.parse(notesJSON)
    } else {
        return []
    }
}

// Save the notes to local storage
const saveNotes = notes => {
    localStorage.setItem('notes', JSON.stringify(notes))
}

// Generate the DOM structure for a note
const generateNoteDOM = note => {
    const noteEl = document.createElement('div')
    const textEl = document.createElement('span')
    const button = document.createElement('button')

    button.textContent = 'x'
    noteEl.appendChild(button)

    if (note.title.length > 0) {
        textEl.textContent = note.title
    } else {
        textEl.textContent = 'empty title'
    }

    noteEl.appendChild(textEl)

    return noteEl
}

// Render app notes
const renderNotes = (notes, filters) => {
    const filteredNotes = notes.filter(note => {
        return note.title.toLowerCase().includes(filters.searchText.toLowerCase())
    })

    document.querySelector('#notes').innerHTML = ''

    filteredNotes.forEach(note => {
        const noteEl = generateNoteDOM(note)
        document.querySelector('#notes').appendChild(noteEl)
    })
}