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
    modal.classList.add('open')
}
function closeModal(){
    modal.classList.remove('open')
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
    dataBox = [...dataBox, newData];
    localStorage.setItem('dataBox', JSON.stringify(dataBox));
};

let createNote = () => {
    noteContainer.innerHTML = '';
    dataBox.map((note, index) => {
        return (
            noteContainer.innerHTML += `
            <div class='note-box' id='${index}'>
                <div class="title-box">
                    <button class="edit-btn" onClick="editNote(this)"><i class="fa-solid fa-pen"></i></button>
                    <i class="fa-solid fa-minus" onClick="deleteNote(this)"></i>
                </div>
                <h1>${note.title}</h1>
                <h3>${note.date}</h3>
                <p>${note.text}</p>
            </div>
            `
        );
    });    
    restartForm();
};

let restartForm = () => {
    inputTitle.value = '';
    inputDate.value = '';
    inputText.value = '';
};
let deleteNote = (index) => {
    dataBox.splice(index.parentElement.parentElement.parentElement.id, 1);
    localStorage.setItem('dataBox', JSON.stringify(dataBox));
    createNote();
};

let editNote = (values) => {
    let note = values.parentElement.parentElement;
    inputTitle.value = note.children[1].innerHTML;
    inputDate.value = note.children[2].innerHTML;
    inputText.value = note.children[3].innerHTML;
    openModal();
    deleteNote(values);
};

(() => {
    dataBox = JSON.parse(localStorage.getItem('dataBox')) || [];
    createNote(dataBox);
})();
