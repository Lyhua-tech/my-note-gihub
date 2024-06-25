export let dataNote = [];

export const loadDataNote = () => {
    let notes = localStorage.getItem('dataNote');
    if (notes) {
        dataNote = JSON.parse(notes);
    }
};

export const saveDataNote = () => {
    localStorage.setItem('dataNote', JSON.stringify(dataNote));
};
