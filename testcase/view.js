import { dataNote, loadDataNote } from "./data.js";

let noteContainer = document.getElementById('note-container');

window.onload = () => {
    loadDataNote();
    const params = new URLSearchParams(window.location.search);
    const index = params.get('index');
    if (index !== null && dataNote[index]) {
        const note = dataNote[index];
        noteContainer.innerHTML = `
            <div class='note-box'>
                <h1>${note.title}</h1>
                <p>${note.text}</p>
                <h3>${note.date}</h3>
            </div>
        `;
    } else {
        noteContainer.innerHTML = '<p>Note not found.</p>';
    }
};
