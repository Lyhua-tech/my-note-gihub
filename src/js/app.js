let dataBox = [];

let form = document.getElementById('note-form');
let noteContainer = document.getElementById('container');
let inputTitle = document.getElementById('text-input');
let inputDate = document.getElementById('date-input');
let inputText = document.getElementById('text-area');
let warn = document.getElementById('warn');
const modal = document.getElementById('modal');
let editIndex = null;

function openModal(){
    modal.classList.add('open');
}

function closeModal(){
    modal.classList.remove('open');
    resetForm(); 
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
    if (editIndex !== null) {
        dataBox[editIndex] = newData;
        editIndex = null;
    } else {
        dataBox.push(newData);
    }
    localStorage.setItem('dataBox', JSON.stringify(dataBox));
};

let createNote = () => {
    noteContainer.innerHTML = '';
    dataBox.forEach((note, index) => {
        noteContainer.innerHTML += `
            <div class='note-box' id='${index}'>
                <h1>${note.title}</h1>
                <p>${note.text}</p>
                <div class="title-box">
                    <i class="fa-solid fa-pen" onClick="editNoteById(${index})"></i>
                    <i class="fa-solid fa-minus" onClick="deleteNoteById(${index})"></i>
                </div>
                <h3>${note.date}</h3>
            </div>
        `;
    });
};

let resetForm = () => {
    inputTitle.value = '';
    inputDate.value = '';
    inputText.value = '';
    warn.innerHTML = '';
};

let deleteNote = (index) => {
    dataBox.splice(index, 1);
    localStorage.setItem('dataBox', JSON.stringify(dataBox));
    createNote();
};

let deleteNoteById = (index) => {
    deleteNote(index);
};

let editNote = (index) => {
    let selectedTask = dataBox[index];
    inputTitle.value = selectedTask.title;
    inputDate.value = selectedTask.date;
    inputText.value = selectedTask.text;
    editIndex = index;
    openModal();
};

let editNoteById = (index) => {
    editNote(index);
};

(() => {
    const storedDataBox = JSON.parse(localStorage.getItem('dataBox')) || [];
    dataBox.push(...storedDataBox);
    createNote();
})();
