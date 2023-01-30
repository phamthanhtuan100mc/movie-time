// renderer.js

const opendFile = document.getElementById('open-file');
opendFile.addEventListener("click", async () => {
    console.log('test open file');
    const file = await window.versions.openFile();
    console.log(file);
});

document.getElementById('drag-drop-area').addEventListener('dragover', (e) => {
    e.preventDefault();
    e.stopPropagation();
});
    
document.getElementById('drag-drop-area').addEventListener('drop', async (e) => {
    e.preventDefault();
    e.stopPropagation();
    let fileToOpen = [];

    for (const f of e.dataTransfer.files) {
        console.log('File(s) you dragged here: ', f.path)
        fileToOpen.push(f.path);
    }

    await window.electron.dropFile(fileToOpen);
});