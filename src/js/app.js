let form = document.getElementById('modal');
let noteContainer = document.getElementById('container');
let inputTitle = document.getElementById('text-input');
let inputDate = document.getElementById('date-input');
let inputText = document.getElementById('text-area');
let warn = document.getElementById('warn');
let add = document.getElementById('add');
let dataBox = [];
const modal = document.getElementById('modal');

function openModal(){
    modal.classList.add('open');
}

function closeModal(){
    modal.classList.remove('open');
}

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
        createNote();
        closeModal();
    }
};

let addInfo = () => {
    const newData = { 'title': inputTitle.value, 'date': inputDate.value, 'text': inputText.value };
    dataBox.push(newData);
    localStorage.setItem('dataBox', JSON.stringify(dataBox));
};

let createNote = () => {
    noteContainer.innerHTML = '';
    dataBox.map((note, index) => {
        noteContainer.innerHTML += `
            <div class='note-box' id='${index}'>
                <span>${note.title}</span>
                <span>${note.date}</span>
                <span>${note.text}</span>
                <div class="title-box">
                    <i class="fa-solid fa-pen" onClick="editNoteById(${index})"></i>
                    <i class="fa-solid fa-minus" onClick="deleteNoteById(${index})"></i>
                </div>
            </div>
        `;
    });
    restartForm();
};

let restartForm = () => {
    inputTitle.value = '';
    inputDate.value = '';
    inputText.value = '';
};

let deleteNote = (index) => {
    dataBox.splice(index, 1);
    localStorage.setItem('dataBox', JSON.stringify(dataBox));
    createNote();
};

let deleteNoteById = (index) => {
    deleteNote(index);
};

let editNote = (note) => {
    let selectedTask = note.parentElement.parentElement;
    let index = selectedTask.id; 
    
    // Set input fields with the selected note's values
    inputTitle.value = selectedTask.children[0].innerHTML;
    inputDate.value = selectedTask.children[1].innerHTML;
    inputText.value = selectedTask.children[2].innerHTML;
    
    // Remove the selected note from dataBox and update localStorage
    dataBox.splice(index, 1);
    localStorage.setItem('dataBox', JSON.stringify(dataBox));
    
    // Recreate the notes list
    createNote();
    
    // Open the modal for editing
    openModal();
};

let editNoteById = (index) => {
    let note = document.getElementById(index).querySelector('.fa-pen');
    editNote(note);
};

(() => {
    dataBox = JSON.parse(localStorage.getItem('dataBox')) || [];
    createNote(dataBox); // Ensure this initializes correctly
})();
