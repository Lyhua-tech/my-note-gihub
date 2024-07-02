// define all of the variable that get value from id
let inputTitle = document.getElementById('text-input');
let inputDate = document.getElementById('date-input');
let inputText = document.getElementById('text-area');

// function use to return back to homepage when click 
let returnToHome = () => {
    window.location.href = '../../index.html';
};

// immediately function use for linking to index which define which note card.
(() => {
    const params = new URLSearchParams(window.location.search);
    let viewIndex = params.get('index');
    let dataBox = JSON.parse(localStorage.getItem('dataBox')) || [];
    let selectedTask = dataBox[viewIndex];
    inputTitle.innerText = selectedTask.title;
    inputDate.innerText = selectedTask.date;
    inputText.innerText = selectedTask.text;
})();
