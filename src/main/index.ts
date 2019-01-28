import { app, BrowserWindow } from 'electron';
import { format } from 'url';
import path from 'path';
import { ipcMain } from 'electron';

const isDev : boolean = true,
    EXTENSIONS_PATH : string = 'C:/Users/home/AppData/Local/Google/Chrome/User Data/Default/Extensions/fmkadmapgofadopljbjfkapdkoienihi/3.6.0_0';
let mainWindow : BrowserWindow;

const createWindow  = () : void => {
    let height : number = 0, width : number = 0;

    if(isDev) {
        height = 718;
        width = 1059;
    } else {
        height = 718;
        width = 500;
    }

    mainWindow = new BrowserWindow({ height, width, autoHideMenuBar : true, minHeight : height, minWidth : width, frame : false, backgroundColor : '#F4F5F9' });

    mainWindow.loadURL(format({
        pathname : path.join(__dirname, './index.html')
    }));

    BrowserWindow.addDevToolsExtension(EXTENSIONS_PATH);

    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.on('maximize', () => {
        mainWindow.maximize();
    });

    mainWindow.on('minimize', () => {
        mainWindow.minimize();
    });

    mainWindow.on('unmaximize', () => {
        mainWindow.unmaximize();
    });
};

ipcMain.on('window-close', () => {
    app.emit('window-all-closed');
});

ipcMain.on('window-maximize', () => {
    if(mainWindow.isMaximized()) {
        mainWindow.emit('unmaximize');
    } else {
        mainWindow.emit('maximize');
    }
});

ipcMain.on('window-minimize', () => {
    mainWindow.emit('minimize');
});

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