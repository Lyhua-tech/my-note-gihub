let form = document.getElementById('form');
let textInput = document.getElementById('textInput');
let dateInput = document.getElementById('dateInput');
let textArea = document.getElementById('textarea');
let msg = document.getElementById('msg');
let tasks = document.getElementById('tasks');
let add = document.getElementById('add');
let data = [];

form.addEventListener('submit', (event)=> {
    event.preventDefault();
    formValidation();
})

let formValidation = () => {
    if (textInput.value === ''){
        msg.innerHTML = 'please input value';
    }else {
        msg.innerHTML = '';
        acceptData();
        createTasks();
        add.setAttribute("data-bs-dismiss", 'modal');
        add.click();
        (() => {
            add.setAttribute("data-bs-dismiss", '')
        })
    }
}

let acceptData = () => {
    const newData = {"title": textInput.value, "date":dateInput.value, "text":textArea.value}
    data = [...data, newData];
    
    localStorage.setItem("data", JSON.stringify(data))
}

let createTasks = () => {
    tasks.innerHTML = '';
    data.map((x, y) => {
        return (
            tasks.innerHTML += `
            <div id='${y}'>
                <span class="fw-bold">
                    ${x.title}
                </span>
                <span class="small text-secondary">
                    ${x.date}
                </span>
                <p>${x.text}</p>
                <span>
                    <i class="fas fa-edit" onClick="editNote(this)" data-bs-toggle="modal" data-bs-target="#form"></i>
                    <i class="fas fa-trash-alt" onClick="deleteNote(this)"></i>
                </span>
            </div>
        `
        )
    })
    
    resetForm();
}

let resetForm = () => {
    textInput.value = '';
    dateInput.value = '';
    textArea.value = '';
}

let deleteNote = (note) => {
    note.parentElement.parentElement.remove();
    data.splice(note.parentElement.parentElement.id, 1)
    localStorage.setItem('data', JSON.stringify(data))
}
let editNote = (note) => {
    let selectedTask = note.parentElement.parentElement;
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textArea.value = selectedTask.children[2].innerHTML;
    deleteNote(note)
}

(()=>{
    data = JSON.parse(localStorage.getItem('data')) || [];
    createTasks(data);
})()