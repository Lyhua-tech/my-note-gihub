let form = document.getElementById('modal');
let noteContainer = document.getElementById('container');
let inputTitle = document.getElementById('text-input');
let inputDate = document.getElementById('date-input');
let inputText = document.getElementById('text-area');
let warn = document.getElementById('warn');
let add = document.getElementById('add');
let dataBox = [];

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
        add.setAttribute('popovertarget', '');
        add.click();
        (() => {
            add.setAttribute('popovertarget', 'modal');
        })();
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
            <div class='note-container' id='${index}'>
                <div class="title-box">
                    <h1>${note.title}</h1>
                    <span>
                        <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
                        <button class="delete-btn"><i class="fa-solid fa-minus"></i></button>
                    </span>
                </div>
                <h3>${note.date}</h3>
                <p>${note.text}</p>
            </div>
            `
        );
    });
    document.querySelectorAll('.edit-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => editNote(index));
    });

    document.querySelectorAll('.delete-btn').forEach((btn, index) => {
        btn.addEventListener('click', () => deleteNote(index));
    });

    restartForm();
};

let deleteNote = (index) => {
    dataBox.splice(index, 1);
    localStorage.setItem('dataBox', JSON.stringify(dataBox));
    createNote(); 
};

let editNote = (index) => {
    let note = dataBox[index];
    inputTitle.value = note.title;
    inputDate.value = note.date;
    inputText.value = note.text;
    deleteNote(index); 
    add.setAttribute('popovertarget', 'modal');
    add.click();
};

let restartForm = () => {
    inputTitle.value = '';
    inputDate.value = '';
    inputText.value = '';
};

(() => {
    dataBox = JSON.parse(localStorage.getItem('dataBox')) || [];
    createNote();
})();
