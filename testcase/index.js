import { dataNote, loadDataNote, saveDataNote } from "./data.js";

let noteContainer = document.getElementById('container');

let createNote = () => {
    noteContainer.innerHTML = '';
    dataNote.forEach((note, index) => {
        noteContainer.innerHTML += `
            <div class='note-box' id='${index}'>
                <h1>${note.title}</h1>
                <p>${note.text}</p>
                <div class="title-box">
                    <i class="fa-solid fa-eye" onclick="viewNoteById(${index})"></i>
                    <i class="fa-solid fa-pen" onclick="editNoteById(${index})"></i>
                    <i class="fa-solid fa-minus" onclick="deleteNoteById(${index})"></i>
                </div>
                <h3>${note.date}</h3>
            </div>
        `;
    });
};

let deleteNoteById = (index) => {
    dataNote.splice(index, 1);
    saveDataNote();
    createNote();
};

let editNoteById = (index) => {
    setTimeout(() => {
        window.location.href = `edit.html?index=${index}`;
    }, 100);
};

let viewNoteById = (index) => {
    setTimeout(() => {
        window.location.href = `view.html?index=${index}`;
    }, 100);
};

window.onload = () => {
    loadDataNote();
    createNote();
};
