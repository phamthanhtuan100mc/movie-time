// preload.js

const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('versions', {
    node: () => process.versions.node,
    chrome: () => process.versions.chrome,
    electron: () => process.versions.electron,
    
    // we can also expose variables, not just functions
})

contextBridge.exposeInMainWorld('electron', {
    ping: () => ipcRenderer.invoke('ping'),
    openFile: () => ipcRenderer.invoke('open-file'),
    dropFile: (fileName) => ipcRenderer.invoke('drop-file', fileName)
})