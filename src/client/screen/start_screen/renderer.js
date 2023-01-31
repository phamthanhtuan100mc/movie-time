// renderer.js
import io from 'socket.io-client';
 
const socket = io('http://localhost');

socket.on('connect', function(){
	console.log('connected to server')
});

socket.on('event', function(data){});

socket.on('disconnect', function() {
    console.log('disconnected with server')
});

const opendFile = document.getElementById('open-file');
opendFile.addEventListener("click", async () => {
    console.log('test open file');
    const file = await window.electron.openFile();
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