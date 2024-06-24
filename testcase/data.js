export let dataNote = [];

export function loadDataNote() {
    const storedDataNote = JSON.parse(localStorage.getItem('dataNote')) || [];
    dataNote.length = 0; 
    dataNote.push(...storedDataNote);
}

export function saveDataNote() {
    localStorage.setItem('dataNote', JSON.stringify(dataNote));
}
