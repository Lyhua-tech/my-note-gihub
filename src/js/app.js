let form = document.getElementById('form');
let noteContainer = document.getElementById('container');
let input = document.getElementById('text-input');
let warn = document.getElementById('warn');
let dataBox = [];

form.addEventListener('submit', (event) => {
    event.preventDefault();
    submitConfirmation();
});

let submitConfirmation = () => {
    if (input.value === '') {
        warn.innerHTML = 'Please input your note';
    } else {
        warn.innerHTML = '';
        addInfo(input.value);
        createNote();
        console.log(dataBox);
        input.value = '';
    }
};

let addInfo = (data) => {
    let itemId = Math.floor(Math.random() * 9191) + 1
    let newData = { id: itemId, title: data };
    dataBox = [...dataBox, newData]; 
}

let createNote = () => {
    noteContainer.innerHTML = ''; 
    dataBox.map((note, index) => {
        noteContainer.innerHTML += `
            <div class='note-container' id='note-${index}'>
                <div class="title-box">
                    
                    <h1>${note.title}</h1>
                    <span>
                        <i class="fa-solid fa-pen" onClick="editNote(this)"></i>
                        <i class="fa-solid fa-minus" onClick="deleteNote()"></i>
                    </span>
                </div>
                <p>
                </p>
            </div>
        `;
    });
};
let deleteNote = (index) => {
    dataBox.splice(index, 1);
    createNote();
};

let editNote = (values) => {
    input.value = values.parentElement.previousElementSibling.innerHTML;
    dataBox.splice(values, 1);
    createNote();
}