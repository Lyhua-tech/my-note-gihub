// define all of the variable that get value from id
const inputTitle = document.getElementById('text-input');
const inputDate = document.getElementById('date-input');
const inputText = document.getElementById('text-area');

// function use to return back to homepage when click 
const returnToHome = () => {
    window.location.href = '../../index.html';
};

// immediately function use for linking to index which define which note card.
(() => {
    const params = new URLSearchParams(window.location.search);
    let viewIndex = params.get('index');
    let dataNote = JSON.parse(localStorage.getItem('dataNote')) || [];
    let selectedTask = dataNote[viewIndex];
    inputTitle.innerText = selectedTask.title;
    inputDate.innerText = selectedTask.date;
    inputText.innerText = selectedTask.text;
})();
