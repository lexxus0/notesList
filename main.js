document.addEventListener("DOMContentLoaded", function () {
  let notes = JSON.parse(localStorage.getItem("notes")) || [];

  const submitBtn = document.getElementById("sub_btn");
  const noteForm = document.getElementById("note-form");
  const taskList = document.getElementById("note-list");
  const noteTitle = document.getElementById("note-title");
  const noteDesc = document.getElementById("note_desc");
  let isEditing = false;
  let editIndex;

  function createNotes() {
    taskList.innerHTML = "";
    notes.forEach((note, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span>${note.title}: ${note.description}</span>
        <div>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      `;
      li.querySelector(".edit-btn").addEventListener("click", () =>
        editNote(index)
      );
      li.querySelector(".delete-btn").addEventListener("click", () =>
        deleteNote(index)
      );
      taskList.appendChild(li);
    });
  }

  noteForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const newNote = {
      title: noteTitle.value,
      description: noteDesc.value,
    };

    if (isEditing) {
      notes[editIndex] = newNote;
      isEditing = false;
      editIndex = null;
      submitBtn.textContent = "Add Note";
    } else {
      if (newNote.title.length >= 2 && newNote.description.length >= 2) {
        notes.push(newNote);
      } else {
        alert(
          "Please enter a title and description (at least 2 characters each)."
        );
        return;
      }
    }

    setLocalStorage();
    createNotes();
    noteForm.reset();
  });

  function setLocalStorage() {
    localStorage.setItem("notes", JSON.stringify(notes));
  }

  function editNote(index) {
    const note = notes[index];
    noteTitle.value = note.title;
    noteDesc.value = note.description;
    editIndex = index;
    isEditing = true;
    submitBtn.textContent = "Edit Note";
  }

  function deleteNote(index) {
    notes.splice(index, 1);
    setLocalStorage();
    createNotes();
  }

  // Ініціалізація
  createNotes();
});
