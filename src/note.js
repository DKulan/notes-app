import { initializeEditPage, generateLastEdited } from './views'
import { updateNote, removeNote } from "./base"

const noteId = location.hash.substring(1)
const titleElement = document.querySelector('#note-title')
const dateElement = document.querySelector('#last-edited')
const bodyElement = document.querySelector('#note-body')

initializeEditPage(noteId)

titleElement.addEventListener('input', e => {
    const note = updateNote(noteId, {
        title: e.target.value
    })
    dateElement.textContent = generateLastEdited(note.updatedAt)
})

bodyElement.addEventListener('input', e => {
    const note = updateNote(noteId, {
        body: e.target.value
    })
    dateElement.textContent = generateLastEdited(note.updatedAt)
})

document.querySelector('#remove-note').addEventListener('click', () => {
    removeNote(noteId)
    location.assign('/index.html')
})

// Ensure data change is reflected in other open browser windows
window.addEventListener('storage', e => {
    if (e.key === 'notes') {
        initializeEditPage(noteId)
    }
})