// define the all of the variable that get by id
let dataBox = [];
let form = document.getElementById('note-form');
let noteContainer = document.getElementById('container');
let inputTitle = document.getElementById('text-input');
let inputDate = document.getElementById('date-input');
let inputText = document.getElementById('text-area');
let warn = document.getElementById('warn');
let modal = document.getElementById('modal');

// function use for open and close the modal by toggle class open
function openModal() {
    modal.classList.add('open');
}
function closeModal() {
    modal.classList.remove('open');
    resetForm();
}

// function use for submit the form that in modal
form.addEventListener('submit', (event) => {
    event.preventDefault();
    submitConfirmation();
});

// function use for check wether the user input or not
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

// function use for add the value from form to array of object and store to local storage
let addInfo = () => {
    const newData = { 'title': inputTitle.value, 'date': inputDate.value, 'text': inputText.value };
    dataBox.push(newData);
    localStorage.setItem('dataBox', JSON.stringify(dataBox));
};

// function will take the array dataBox and map out as note on homepage
let createNote = () => {
    noteContainer.innerHTML = '';
    dataBox.forEach((note, index) => {
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

// function will reset the value in input form to empyty string for new input
let resetForm = () => {
    inputTitle.value = '';
    inputDate.value = '';
    inputText.value = '';
    warn.innerHTML = '';
};
// function will delete the note by using splice method .
let deleteNote = (index) => {
    dataBox.splice(index, 1);
    localStorage.setItem('dataBox', JSON.stringify(dataBox));
    createNote();
};
// function will call function above to operate delete
let deleteNoteById = (index) => {
    deleteNote(index);
};

// function will direct to edit html and can edit
let editNoteById = (index) => {
    window.location.href = `/public/edit.html?index=${index}`;
};

let viewNoteById = (index) => {
    window.location.href = `/public/view.html?index=${index}`;
};

// function imediately invoke will be re call immediately
(() => {
    const storeddataBox = JSON.parse(localStorage.getItem('dataBox')) || [];
    dataBox.push(...storeddataBox);
    createNote();
})();


