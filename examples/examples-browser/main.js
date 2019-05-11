const {app, BrowserWindow} = require('electron');
const express = require('./server');
console.log(express)
const path = require('path');
const url= require('url');
let win;
console.log('from main.js')
function createWindow(){
	
	win = new BrowserWindow({
		width:1000, 
		height:600,
		icon:__dirname+'/img/electron-icon.png'
	});
	
	//load index.html
	win.loadURL('http://localhost:3000/')
	// win.loadURL(url.format({
	// 	pathname: path.join(__dirname, '/views/webcamFaceDetection.html'),
	// 	protocol: 'file:',
	// 	slashes: true
	// }));

	// Open devtools
	win.webContents.openDevTools();

	win.on('closed', () => {
		win = null;
	})
}

app.on('ready', createWindow);

// Quit when all windows are closed
app.on('window-all-closed', () => {
	if(process.platform!=='darwin'){
		app.quit();
	}
})