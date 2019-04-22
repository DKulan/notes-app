const noteId = location.hash.substring(1)
const notes = getSavedNotes()
const note = notes.find(note => {
    return note.id === noteId
})

if (note === undefined) {
    location.assign('/index.html')
}

const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')

titleElement.value = note.title
bodyElement.value = note.body

titleElement.addEventListener('input', e => {
    note.title = e.target.value
    saveNotes(notes)
})

bodyElement.addEventListener('input', e => {
    note.body = e.target.value
    saveNotes(notes)
})

document.querySelector('#remove-note').addEventListener('click', () => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')
})

/*
    Challenge
    1. Setup input event for title
    2. Update note object and save notes list
    3. Repeat steps 1-2 for body
    4. Setup a remove button that removes notes and sends users back to the home page
 */