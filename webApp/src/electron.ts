// Instantiate server app
import 'ts-helpers';

import {app, BrowserWindow} from 'electron';
import * as http from 'http';
import * as debug from 'debug';

import { expressApp } from './backend/config/express.config';

export default class Main {
  static application;
  static browserWindow;
  static mainWindow: Electron.BrowserWindow;
  static port;
  static server;

  static main (app, browserWindow: typeof BrowserWindow) {
    Main.browserWindow = browserWindow;
    Main.application = app;
    
    // Quit when all windows are closed.
    Main.application.on('window-all-closed', Main.onWindowAllClosed);
    
    // This method will be called when Electron has finished
    // initialization and is ready to create browser windows.
    // Some APIs can only be used after this event occurs.
    Main.application.on('ready', Main.onReady);
    Main.application.on('activate', Main.onActivate);
    Main.bootServer();
  }

  private static onReady() {
    
    // Create the browser window.
    Main.mainWindow = new Main.browserWindow({
        width: 800, 
        height: 600,
        icon: __dirname + '/dist/assets/images/avatar.jpg',
        autoHideMenuBar: false,
    });
    Main.mainWindow.loadURL('http://http://127.0.0.1/:' + Main.port);
    
    // and load the index.html of the app.
    // Main.mainWindow.loadURL('file://' + __dirname + '/index.html');
    
    // Open the DevTools.
    Main.mainWindow.webContents.openDevTools();
    
    // Emitted when the window is closed.
    Main.mainWindow.on('closed', Main.onClose);
  }

  private static onWindowAllClosed() {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
       Main.application.quit();
    }   
  }

  private static onActivate() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (Main.mainWindow === null) {
         Main.onReady();
    }
  }

  private static onClose() {
    // Dereference the window object.
    Main.mainWindow = null;
  }

  private static bootServer() {
    // debug('ts-express:server');

    Main.port = Main.normalizePort(process.env.PORT || 5000);
    expressApp.set('port', Main.port);

    Main.server = http.createServer(expressApp);
    Main.server.listen(Main.port);
    Main.server.on('error', Main.onError);
    Main.server.on('listening', Main.onListening);
  }

  private static normalizePort(val: number|string): number|string|boolean {
    let port: number = (typeof val === 'string') ? parseInt(val, 10) : val;
    if (isNaN(port)) return val;
    else if (port >= 0) return port;
    else return false;
  }

  private static onError(error: NodeJS.ErrnoException): void {
    if (error.syscall !== 'listen') throw error;
    let bind = (typeof Main.port === 'string') ? 'Pipe ' + Main.port : 'Port ' + Main.port;
    switch(error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`);
        process.exit(1);
        break;
      default:
        throw error;
      }
  }

  private static onListening(): void {
    let addr = Main.server.address();
    let bind = (typeof addr === 'string') ? `pipe ${addr}` : `port ${addr.port}`;
    debug(`Listening on ${bind}`);
  }
}

Main.main(app, BrowserWindow);

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.