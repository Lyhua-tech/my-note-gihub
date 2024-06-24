import { dataNote, loadDataNote, saveDataNote } from "./data.js";

let form = document.getElementById('note-form');
let inputTitle = document.getElementById('text-input');
let inputDate = document.getElementById('date-input');
let inputText = document.getElementById('text-area');
let warn = document.getElementById('warn');
let editIndex = null;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    submitConfirmation();
});

let submitConfirmation = () => {
    if (inputTitle.value === '') {
        warn.innerHTML = 'Please input your note';
    } else {
        warn.innerHTML = '';
        addInfo();
        saveDataNote();
        window.location.href = 'index.html';
    }
};

let addInfo = () => {
    const newData = { 'title': inputTitle.value, 'date': inputDate.value, 'text': inputText.value };
    if (editIndex !== null) {
        dataNote[editIndex] = newData;
        editIndex = null;
    } else {
        dataNote.push(newData);
    }
};

window.onload = () => {
    loadDataNote();
    const params = new URLSearchParams(window.location.search);
    const index = params.get('index');
    if (index !== null) {
        editIndex = index;
        let selectedNote = dataNote[index];
        inputTitle.value = selectedNote.title;
        inputDate.value = selectedNote.date;
        inputText.value = selectedNote.text;
    }
};
