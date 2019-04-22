const noteId = location.hash.substring(1)
const titleElement = document.querySelector('#note-title')
const bodyElement = document.querySelector('#note-body')
let notes = getSavedNotes()
let note = notes.find(note => {
    return note.id === noteId
})

if (note === undefined) {
    location.assign('/index.html')
}

titleElement.value = note.title
bodyElement.value = note.body

titleElement.addEventListener('input', e => {
    note.title = e.target.value
    note.updatedAt = moment().valueOf()
    saveNotes(notes)
})

bodyElement.addEventListener('input', e => {
    note.body = e.target.value
    note.updatedAt = moment().valueOf()
    saveNotes(notes)
})

document.querySelector('#remove-note').addEventListener('click', () => {
    removeNote(note.id)
    saveNotes(notes)
    location.assign('/index.html')
})

// Ensure data change is reflected in other open browser windows
window.addEventListener('storage', e => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        note = notes.find(note => {
            return note.id === noteId
        })

        if (note === undefined) {
            location.assign('/index.html')
        }

        titleElement.value = note.title
        bodyElement.value = note.body
    }
})