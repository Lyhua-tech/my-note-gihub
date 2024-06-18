let form = document.getElementById('form');
let textInput = document.getElementById('textInput');
let dateInput = document.getElementById('dateInput');
let textArea = document.getElementById('textarea');
let msg = document.getElementById('msg');
let data = {};

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
    }
}

let acceptData = () => {
    data['title'] = textInput.value;
    data['date'] = dateInput.value;
    data['textArea'] = textArea.value;
    console.log(data)
}