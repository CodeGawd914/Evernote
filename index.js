
document.addEventListener('DOMContentLoaded',function() {
 displayUserName()
 getNotes()
 const noteFormArea = document.getElementById('note-form')
 noteFormArea.addEventListener('submit',newNote)

 const singleNoteArea = document.getElementById('comment-area')
 singleNoteArea.addEventListener('click',handleNoteClick)

 const editFormArea = document.getElementById('home')
 editFormArea.addEventListener('submit',inputEdit)

})

//*********** Start all the fetches*************\\


// fetch to display user names after names have been gotten i
function displayUserName() {
return fetch('http://localhost:3000/api/v1/users')
  .then(res => res.json())
  .then(users => {
    let usernameArea = document.getElementById('user-name')
    users.forEach(user => {
      usernameArea.innerHTML = user.name
    })

  })
}
function noteDelete(event) {
  let noteId = event.target.parentElement.id
  event.target.parentElement.remove()
  fetch(`http://localhost:3000/api/v1/notes/${noteId}`,{method: "DELETE"}

)}

function newNote(e) {
  e.preventDefault()
  let titleInfo = document.getElementById('title').value
  let bodyInfo = document.getElementById('new_note').value
  return fetch('http://localhost:3000/api/v1/notes',{
    method: "POST",
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "title": titleInfo,
      "body": bodyInfo
    })
  })
  .then(res => res.json()).then(singleNote)
  document.getElementById('note-form').reset()

}

function inputEdit(e){
  e.preventDefault()
  let editTitleInfo = document.getElementById('edit-title')
  let editBodyInfo = document.getElementById('edit-body')
  let quoteId = e.target.children[5].id
  fetch(`http://localhost:3000/api/v1/notes/${quoteId}`,{
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
        'Accept': 'application/json'
    },
    body: JSON.stringify({
      "title": editTitleInfo.value,
      "body": editBodyInfo.value
    })
  })
  .then(res => res.json()).then(updateScreen)
}

function getNotes() {
  fetch('http://localhost:3000/api/v1/notes')
  .then(res => res.json())
  .then(displayNote)

}

function displayNote(notes) {
  for (note of notes)
singleNote(note)
}

function updateScreen() {
  document.getElementById('new-edit-form').remove()
  let previousNoteArea = document.getElementById('comment-area')
  previousNoteArea.innerHTML = ""
  getNotes()

}

function updateNote(e) {
  let noteId = e.target.id
  let editForm = document.createElement('div')
  editForm.id = "new-edit-form"
  let areaOne = document.getElementById('home')

  let title = e.target.parentElement.children[0].innerText
  let body = e.target.parentElement.children[1].innerText

  editForm.innerHTML = `
  <h3> Edit Note </h3>
  <form id="edit-form">
    Title:<br>
    <input id="edit-title" type="text" name="title" value="${title}"><br>
    Body:<br>
    <input id="edit-body" type="text" name="body"  value="${body}">
    <input id="${noteId}" type="submit" value="submit">
  </form>`

areaOne.appendChild(editForm)
  // let titleOfNote = document.getElementById('edit-title')
  // let bodyOfNote = document.getElementById('edit-body')
  // titleOfNote.innerText = e.target.parentElement.children[0].innerText
  // bodyOfNote.innerText = e.target.parentElement.children[1].innerText

}

  function singleNote(note){
    let previousNoteArea = document.getElementById('comment-area')
    const newNotes = `
    <div id=${note.id} class="single_note">
    <h2 id="note-title">${note.title}</h2>
     </div>`
    previousNoteArea.innerHTML += newNotes
}

   function getNoteBody(e) {
     let noteId = e.target.parentElement.id
      fetch(`http://localhost:3000/api/v1/notes/${noteId}`)
      .then(res => res.json())
      .then(displayNoteBody)
   }

   function displayNoteBody(note) {
     let parentDivNote = document.getElementById(`${note.id}`)
     const noteBody = `<div id=${note.id} class="single_note">
     <h2 id="note-title">${note.title}</h2>
      </div><span>${note.body}</span>
     <button class="editButton" type="button" id="${note.id}">Edit Me!</button>
     <button class="delete-button" type="button" id="${note.id}"> biiyyyee</button></img>`
     parentDivNote.innerHTML = noteBody

   }
//*********************CLICK HANDELRS************************

function handleNoteClick(e){
  if(e.target.className === 'editButton'){
    updateNote(e)
  } else if (e.target.className === 'delete-button') {
    noteDelete(e)
  } else if (e.target.id === 'note-title' ){
    getNoteBody(e)
  }
}
