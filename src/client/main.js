// main.js

const { app, dialog, globalShortcut, ipcMain, screen, BrowserWindow } = require('electron');
const WindowStateKeeper = require('electron-window-state');
const { Sleep } = require('./helper/helper')
const { systemPreferences } = require('electron')
const path = require('path')
const io = require('socket.io-client');
require('dotenv').config()

const url = process.env.URL;
const port = process.env.PORT || 3000;

let mainWindow = null;

const socket = io(url);

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
			webSecurity: true,
			preload: path.join(__dirname, 'preload.js')
		}
	})

	// await Sleep(2);

	mainWindow.loadFile(path.join(__dirname, 'screen', 'start_screen', 'index.html'));

	mainWindow.once('ready-to-show', () => {
		// registerLocalVideoProtocol();
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

	mainWindow.loadFile(path.join(__dirname, 'screen', 'test_screen', 'test-index.html'));
}

app.whenReady().then(() => {
	createWindow();

	// Handle open window for mac
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	})

	// Open dev tools
	globalShortcut.register('F12', () => {
		mainWindow.webContents.openDevTools();
	})

	socket.on('connect', () => {
		console.log("on connect: connected to server"); // displayed
		socket.emit('test connect');
	});

	socket.on('welcome', () => {
		console.log('on welcome: received message welcome from server');
		socket.emit('test')
	});
	socket.on('ok', () => {
		console.log("OK received renderer"); // not displayed
	});
})

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit()
	}
})

ipcMain.handle('ping', () => {
	app.dock.bounce();
	return 'pong';
});

ipcMain.handle('open-file', async () => {
	console.log('receive message open file')
	const fileName = dialog.showOpenDialogSync({
		title: 'Select Video to watch',
		filters: [
			{
				name: 'Movies',
				extensions: ['mp4', 'mkv', 'mov', 'ts', 'webm']
			}
		],
		properties: [
			'openFile',
			'createDirectory',
			'promptToCreate',
			'treatPackageAsDirectory'
		]
	})

	console.log(fileName)
	await openVideoScreen();
})

ipcMain.handle('drop-file', async (e, agrs) => {
	console.log(agrs[0]);
	await openVideoScreen();
})

const openVideoScreen = async () => {
	await mainWindow.loadFile(path.join(__dirname, 'screen', 'video_screen', 'index.html'));
}

// console.log(systemPreferences.isDarkMode())

// // Enable live reload for all the files inside your project directory
// require('electron-reload')(path.join(__dirname, 'screen'), {

// 	// Enable live reload for Electron too
// 	electron: require(`../node_modules/electron`),
// 	// hardResetMethod: 'exit',
// 	// forceHardReset: true
// });