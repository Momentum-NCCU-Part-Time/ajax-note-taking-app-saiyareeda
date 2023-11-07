const app = {
  data: {
    url: "http://localhost:3000/notes",
    notes: [],
  },

  /*methods*/

  getNotes: function () {
    fetch(this.data.url, {
      method: 'GET',
      headers: { "Content-Type": "application/json" }
    })
      .then(r => r.json())
      .then(response => {
        for (let note of response) {
          this.data.notes.push(note)
        };
        console.log(this.data.notes)
        this.generateNotesHTML()
      }
      )

  },

  createNote: function () {
    let newTitle = document.getElementById("newTitle").value;
    let newBody = document.getElementById("newBody").value;
    let newNote = {
      title: newTitle,
      body: newBody
    }
    console.log(newNote);
    fetch(this.data.url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newNote),
    })

      .then((r) => r.json())
      .then(response => {
        this.generateNotesHTML()
      })
  },


  addEventListeners: function () {

    let saveButton = document.querySelectorAll('.saveNote');
    for (let button of saveButton) {
      button.addEventListener('click', (event) => {
        event.preventDefault();
        this.createNote(button.dataset.id);
      });
    }
  },


  displayCreateForm: function () {
    /*displays form*/
  },

  deleteNote: function (noteId) {
    /*display confirm delete, delete request*/
  },

  confirmDelete: function () {
    /*display confirmation pop up, call deleteNote(noteId)*/
  },

  editNote: function () { },
  /*call displayEditForm(), saves/overwrites note(request)*/

  displayEditForm: function (note) {
    /*displays edit form with note's existing title and the body prepopulated*/
  },


  generateNotesHTML: function () {
    const container = document.getElementById('container');
    for (let note of this.data.notes) {
      // Create card element
      const card = document.createElement('div');
      card.classList = 'card-body';

      // Construct card content
      const content = `
      <div class="card">
      <div class="card-header" id="heading-${note}">
        <h5 class="mb-0">
          <button class="btn btn-link" data-toggle="collapse" data-target="#collapse-${note}" aria-expanded="true" aria-controls="collapse-${note}">
          </button>
        </h5>
      </div>

      <div id="collapse-${note}" class="collapse show" aria-labelledby="heading-${note}" data-parent="#accordion">
        <div class="card-body">
          <h5>${note.id}</h5>
          <p>${note.title}</p>
          <p>${note.body}</p>
        </div>
      </div>
    </div>
  `;

      // Append newyly created card element to the container
      container.innerHTML += content;
    }
  },


  main: function () {
    this.getNotes()
    /*call getNotes(), set up event listeners(willcontain if statments, or other code to call when a user clicks edit, delete, or create) for edit and delte buttons
    EVENT LISTENER:
      editNote(event.target.data-id)
      console.log(event.taret.data-id)
    */
  }
}

app.main()