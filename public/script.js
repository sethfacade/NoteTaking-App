const addBtn = document.getElementById("addBtn");
let edit = false;
let selectedDiv = null;

// Add Note //
addBtn.addEventListener("click", function () {
  let addNote = document.getElementById("addNote");
  //Can only write up to 255 characters //
  if (addNote.value.length > 255) {
    alert("You can only enter up to 255 characters");
    return;
  }
  // Can only add up to 36 notes since its 6x6 grid //
  let notes = document.getElementById("notes").childNodes;
  if (notes.length >= 36) {
    alert(
      "You can only add up to 36 notes at a time, please delete some notes"
    );
    return;
  }

  //Add date //
  let now = new Date();
  let dateTime = `${now.getMonth() + 1}/${now.getDate()}/${now.getFullYear()}`;

  const html = `
    <div onclick= swapNotes(this) class="card-body">
      <h6>${dateTime} <h6>

      <p  class="card-text">${addNote.value}</p>
    </div>
    <span>
    <i id="pen" class="fas fa-pen-fancy fa-2x" onclick=editNote(this.parentNode.parentNode)></i>
    <i id="trash" class="fas fa-trash fa-2x" onclick= deleteNote(this.parentNode.parentNode)></i>
    </span>
`;
  let noteEle = document.getElementById("notes");
  let newDiv = document.createElement("div");
  newDiv.className = "card mx-4 my-2 text-black";
  newDiv.style = "width: 10rem;";
  newDiv.innerHTML = html;
  noteEle.appendChild(newDiv);
});

// Delete Note //
function deleteNote(note) {
  note.remove();
  // If note was selected during deletion, just to make sure when we swap, it doesn't cause a bug //
  selectedDiv = null;
}

// Edit Note //
function editNote(note) {
  const paragraphTag = note.querySelector("p");
  if (!edit) {
    paragraphTag.contentEditable = true;
    edit = true;
    paragraphTag.style.border = "ridge #0d6efd";
  } else {
    paragraphTag.contentEditable = false;
    edit = false;
    paragraphTag.style.border = "";
  }
}

// Select Note //
function swapNotes(curr) {
  if (selectedDiv && selectedDiv !== curr) {
    let prev1 = selectedDiv.previousSibling;
    let prev2 = curr.previousSibling;

    prev1.after(curr);
    prev2.after(selectedDiv);
    selectedDiv = null;
    curr.parentNode.style.border = "";
  } else if (curr === selectedDiv) {
    selectedDiv = null;
    curr.parentNode.style.border = "";
  } else {
    selectedDiv = curr;
    curr.parentNode.style.border = "solid orange";
  }
}
