// renderer.js

console.log('test test')

// const infomation = document.getElementById('info');
// infomation.innerText = `This app is using Chrome (v${window.versions.chrome()}), Node.js (v${window.versions.node()}), and Electron (v${window.versions.electron()})`;

const func = async () => {
    const response = await versions.ping();
    console.log(response);
}
func();

const opendFile = document.getElementById('open-file');
opendFile.addEventListener("click", async () => {
    console.log('test open file');
    const file = await window.versions.openFile();
    console.log(file);
});
