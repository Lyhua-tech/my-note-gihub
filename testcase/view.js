import { dataNote, loadDataNote } from "./data.js";

let getNoteIndexFromURL = () => {
    let params = new URLSearchParams(window.location.search);
    return params.get('index');
};

window.onload = () => {
    loadDataNote();
    let noteIndex = getNoteIndexFromURL();
    if (noteIndex !== null) {
        let note = dataNote[noteIndex];
        document.getElementById('note-title').innerText = note.title;
        document.getElementById('note-text').innerText = note.text;
        document.getElementById('note-date').innerText = note.date;
    } else {
        document.getElementById('note-details').innerText = "Note not found";
    }
};
