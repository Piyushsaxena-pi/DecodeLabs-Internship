const noteInput = document.querySelector(".noteInput");
const addBtn = document.querySelector(".addBtn");
const notesContainer = document.querySelector(".notesContainer");
let notes = JSON.parse(localStorage.getItem("myNotes")) || [];

function displayNotes() {
  notesContainer.innerHTML = "";
  notes.forEach((noteText, index) => {
    const card = document.createElement("div");
    card.className = "note-card";
    card.innerHTML = `<p>${noteText}</p><button class="deletebutton" onclick="deleteNote(${index})">Delete</button>`;
    notesContainer.appendChild(card);
  });
}

function addNote() {
  const text = noteInput.value.trim();
  if (text) {
    notes.push(text);
    localStorage.setItem("myNotes", JSON.stringify(notes));
    noteInput.value = "";
    displayNotes();
  }
}

function deleteNote(index) {
  notes.splice(index, 1);
  localStorage.setItem("myNotes", JSON.stringify(notes));
  displayNotes();
}

addBtn.addEventListener("click", addNote);
displayNotes();
