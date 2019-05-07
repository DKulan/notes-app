import moment from 'moment'
import { getFilters } from "./filters"
import { sortNotes, getNotes } from "./base"

// Generate the DOM structure for a note
const generateNoteDOM = note => {
    const noteEl = document.createElement('a')
    const textEl = document.createElement('p')
    const statusEl = document.createElement('p')


    note.title.length > 0 ? textEl.textContent = note.title : textEl.textContent = 'Unnamed note'
    textEl.classList.add('list-item__title')
    noteEl.appendChild(textEl)

    noteEl.setAttribute('href', `/note.html#${note.id}`)
    noteEl.classList.add('list-item')

    statusEl.textContent = generateLastEdited(note.updatedAt)
    statusEl.classList.add('list-item__subtitle')
    noteEl.appendChild(statusEl)

    return noteEl
}

// Render app notes
const renderNotes = () => {
    const filters = getFilters()
    const notesEl = document.querySelector('#notes')
    const notes = sortNotes(notes, filters.sortBy)
    const filteredNotes = notes.filter(note => note.title.toLowerCase().includes(filters.searchText.toLowerCase()))

    notesEl.innerHTML = ''

    if (filteredNotes.length > 0) {
        filteredNotes.forEach(note => {
            const noteEl = generateNoteDOM(note)
            notesEl.appendChild(noteEl)
        })
    } else {
        const emptyMessage = document.createElement('p')
        emptyMessage.textContent = 'No notes to show'
        emptyMessage.classList.add('empty-message')
        notesEl.appendChild(emptyMessage)
    }
}

const initializeEditPage = (noteId) => {
    const titleElement = document.querySelector('#note-title')
    const dateElement = document.querySelector('#last-edited')
    const bodyElement = document.querySelector('#note-body')

    const notes = getNotes()
    const note = notes.find(note => {
        return note.id === noteId
    })

    if (!note) {
        location.assign('/index.html')
    }

    titleElement.value = note.title
    bodyElement.value = note.body
    dateElement.textContent = generateLastEdited(note.updatedAt)
}

// Generate the last edited message
const generateLastEdited = timestamp => `Last edited ${moment(timestamp).fromNow()}`

export { generateNoteDOM, renderNotes, generateLastEdited, initializeEditPage}