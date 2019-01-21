import { app, BrowserWindow } from 'electron';
import { format } from 'url';
import path from 'path';

let mainWindow : BrowserWindow;

const createWindow = () => {
    mainWindow = new BrowserWindow({ height : 600, width : 800 });

    mainWindow.loadURL(format({
        pathname : path.join(__dirname, './public/index.html')
    }));

    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });
};

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if(mainWindow === null) {
        createWindow();
    }
});