function createNote(event) {
    event.preventDefault();
    let textInput = document.getElementById('text-input').value;
    let card = document.createElement('my-card');
    card.setAttribute('text', textInput);
    document.getElementById('card-container').appendChild(card);
}

function deleteNote(event) {
    const card = event.target.closest('my-card');
    if (card) {
        document.getElementById('card-container').removeChild(card);
    }
}
function editNote() {
    const openEdit = document.getElementsByClassName('modal-note')
    openEdit.classList.remove('modal-note')
}

class CreateNote extends HTMLElement {
    constructor() {
        super();
    }
    
    connectedCallback() {
        let text = this.getAttribute('text');
        this.innerHTML = `
            <div class='note-container' onClick="editNote()">
                <div class="title-box">
                    <h1>${text}</h1>
                    <button class="remove-note">x</button>
                </div>
                <p>
                </p>
            </div>
        `;

        this.querySelector('.remove-note').addEventListener('click', deleteNote);
    }
}

customElements.define('my-card', CreateNote);
