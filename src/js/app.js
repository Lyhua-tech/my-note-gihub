let dataBox = [];

let form = document.getElementById('note-form');
let noteContainer = document.getElementById('container');
let inputTitle = document.getElementById('text-input');
let inputDate = document.getElementById('date-input');
let inputText = document.getElementById('text-area');
let warn = document.getElementById('warn');
const modal = document.getElementById('modal');

function openModal() {
    modal.classList.add('open');
}

function closeModal() {
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
    dataBox.push(newData);
    localStorage.setItem('dataBox', JSON.stringify(dataBox));
};

let createNote = () => {
    noteContainer.innerHTML = '';
    dataBox.forEach((note, index) => {
        noteContainer.innerHTML += `
            <div class='note-box' id='${index}'>
                <h1>${note.title}</h1>
                <p>${note.text}</p>
                <h3>${note.date}</h3>
                <div class="title-box">
                    <i class="fa-solid fa-eye" onclick="viewNoteById(${index})"></i>
                    <i class="fa-solid fa-pen" onclick="editNoteById(${index})"></i>
                    <i class="fa-solid fa-minus" onclick="deleteNoteById(${index})"></i>
                </div>
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

let editNoteById = (index) => {
    window.location.href = `/public/pages/edit.html?index=${index}`;
};

let viewNoteById = (index) => {
    window.location.href = `/public/pages/view.html?index=${index}`;
};

(() => {
    const storedDataBox = JSON.parse(localStorage.getItem('dataBox')) || [];
    dataBox.push(...storedDataBox);
    createNote();
})();
