let inputTitle = document.getElementById('text-input');
let inputDate = document.getElementById('date-input');
let inputText = document.getElementById('text-area');

let returnToHome = () => {
    window.location.href = '../../index.html';
};

(() => {
    const params = new URLSearchParams(window.location.search);
    let viewIndex = params.get('index');
    let dataBox = JSON.parse(localStorage.getItem('dataBox')) || [];
    let selectedTask = dataBox[viewIndex];
    inputTitle.innerText = selectedTask.title;
    inputDate.innerText = selectedTask.date;
    inputText.innerText = selectedTask.text;
})();
