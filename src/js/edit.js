let inputTitle = document.getElementById('text-input');
let inputDate = document.getElementById('date-input');
let inputText = document.getElementById('text-area');
let warn = document.getElementById('warn');
let form = document.getElementById('note-form');
let editIndex = null;

form.addEventListener('submit', (event) => {
    event.preventDefault();
    updateNote();
});

let updateNote = () => {
    if (inputTitle.value === '') {
        warn.innerHTML = 'Please input your note';
    } else {
        warn.innerHTML = '';
        const newData = { 'title': inputTitle.value, 'date': inputDate.value, 'text': inputText.value };
        let dataBox = JSON.parse(localStorage.getItem('dataBox')) || [];
        dataBox[editIndex] = newData;
        localStorage.setItem('dataBox', JSON.stringify(dataBox));
        window.location.href = '../../index.html';
    }
};

let cancelEdit = () => {
    window.location.href = '../index.html';
};

(() => {
    const params = new URLSearchParams(window.location.search);
    editIndex = params.get('index');
    let dataBox = JSON.parse(localStorage.getItem('dataBox')) || [];
    let selectedTask = dataBox[editIndex];
    inputTitle.value = selectedTask.title;
    inputDate.value = selectedTask.date;
    inputText.value = selectedTask.text;
})();
