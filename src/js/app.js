let form = document.getElementById('modal');
let noteContainer = document.getElementById('container');
let inputTitle = document.getElementById('text-input');
let inputDate = document.getElementById('date-input')
let inputText = document.getElementById('text-area')
let warn = document.getElementById('warn');
let add = document.getElementById('add')
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
        add.setAttribute('popovertarget', '')
        add.click();
        (() => {
            add.setAttribute('popovertarget', 'modal')
        })
    }
};

let addInfo = () => {
    let newData = {'title': inputTitle.value, 'date': inputDate.value, 'text': inputText.value}
    dataBox = [...dataBox, newData]; 

    localStorage.setItem('data', JSON.stringify(dataBox))
}

let createNote = () => {
    noteContainer.innerHTML = ''; 
    dataBox.map((note, index) => {
        return (
            noteContainer.innerHTML += `
            <div class='note-container' id='${index}'>
                <div class="title-box">
                    
                    <h1>${note.title}</h1>
                    <span>
                        <button><i class="fa-solid fa-pen" onClick="editNote(this)"></i></button>
                        <i class="fa-solid fa-minus" onClick="deleteNote(this)"></i>
                    </span>
                </div>
                <h3>${note.date}</h3>
                <p>
                    ${note.text}
                </p>
            </div>
        `
        )
    });
    restartForm();
};
let deleteNote = (index) => {
    dataBox.splice(index.parentElement.parentElement.parentElement.id, 1);
    localStorage.setItem('data', JSON.stringify(dataBox))
};

let editNote = (values) => {
    let note = values.parentElement.parentElement.parentElement;
    values.parentElement.setAttribute('popovertarget', 'modal')
    inputTitle.value = note.children[0].innerHTML;
    inputDate.value = note.children[1].innerHTML;
    inputText.value = note.children[2].innerHTML;
    deleteNote(values)
}

let restartForm = () => {
    inputTitle.value = '';
    inputDate.value = '';
    inputText.value = '';
}

(() => {
    dataBox = JSON.parse(localStorage.getItem('data')) || [];
    createNote(dataBox)
})