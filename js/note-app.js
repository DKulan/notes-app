// DOM - Document Object Model


let notes = getSavedNotes()

const filters = {
    searchText: ''
}

renderNotes(notes, filters)

document.querySelector('#create-note').addEventListener('click', e => {
    const id = uuidv4()
    const timestamp = moment().valueOf()

    notes.push({
        id,
        title: '',
        body: '',
        createdAt: timestamp,
        updatedAt: timestamp
    })
    saveNotes(notes)
    location.assign(`/note.html#${id}`)
})

document.querySelector('#search-text').addEventListener('input', e => {
    filters.searchText = e.target.value
    renderNotes(notes, filters)
})

// document.querySelector('#filters-by').addEventListener('change', e => {
//
// })

window.addEventListener('storage', e => {
    if (e.key === 'notes') {
        notes = JSON.parse(e.newValue)
        renderNotes(notes, filters)
    }
})

/*
    Challenge
    1. Add createdAt and updatedAt to the new notes (store timestamp)
    2. Update updatedAt when someone edits a title or body
    3. Delete all old notes before testing
 */