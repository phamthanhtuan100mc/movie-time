// main.js

const { app, dialog, globalShortcut, ipcMain, screen, BrowserWindow } = require('electron');
const WindowStateKeeper = require('electron-window-state');
const path = require('path')
const { Sleep } = require('./helper/helper')

// // Enable live reload for all the files inside your project directory
// require('electron-reload')(path.join(__dirname, 'screen'), {

// 	// Enable live reload for Electron too
// 	electron: require(`../node_modules/electron`),
// 	// hardResetMethod: 'exit',
// 	// forceHardReset: true
// });

let mainWindow = null;

const createWindow = async () => {

	let mainWindowState = WindowStateKeeper({
		defaultWidth: 800,
		defaultHeight: 600
	});
	
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		show: false,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		}
	})

	ipcMain.handle('open-file', () => {
		console.log('receive message open file')
		return dialog.showOpenDialogSync({
			properties: [
				'openFile', 
				// 'multiSelections'
			]
		})
	})

	Sleep(2000);

	ipcMain.handle('ping', () => {
		return 'pong';
	});

	mainWindow.loadFile(path.join(__dirname, 'screen', 'index.html'));

	mainWindow.once('ready-to-show', () => {
		// splashWindow.destroy();
		mainWindow.show();
		mainWindow.webContents.openDevTools();

		// mainWindow.center();
	})


}

const createWindowTest = () => {
	mainWindow = new BrowserWindow({
	  width: 800,
	  height: 600,
	  webPreferences: {
		preload: path.join(__dirname, 'preload.js'),
	  }
	})
  
	ipcMain.handle('ping', () => {
		return 'pong';
	});

	mainWindow.loadFile(path.join(__dirname, 'screen', 'test-index.html'));
}


app.whenReady().then(() => {
	createWindow();

	// Handle for mac
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	})



	// Open dev tools
	// globalShortcut.register('F12', () => {
	// 	mainWindow.webContents.openDevTools();
	// })
	// globalShortcut.register('CommandOrControl+Shift+C', () => {
	// 	mainWindow.webContents.openDevTools();
	// })

	
	
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})
