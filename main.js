const electron = require("electron"),
  app = electron.app,
  BrowserWindow = electron.BrowserWindow;

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    autoHideMenuBar: true,
    width: 1040,
    height: 700,
    minWidth: 640,
    minHeight: 480,
    // fullscreen: true,
    // icon?: NativeImage | string,
    // backgroundColor: "#444",
    // titleBarStyle?: ('default' | 'hidden' | 'hidden-inset');
    // titleBarStyle: 'hidden-inset',
    title: 'nConnect - Power of C3'
  });
  
  // mainWindow.loadURL(`file://${__dirname}/index.html`);
  // mainWindow.loadURL(__dirname + '/webApp/dist/index.html');
  mainWindow.loadURL('http://127.0.0.1:4000');

  mainWindow.webContents.openDevTools();
  
  mainWindow.on("closed", function() {
    mainWindow = null;
  });
}

app.on("ready", createWindow);
app.on("browser-window-created", function(e, window) {
  window.setMenu(null);
});

app.on("window-all-closed", function() {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", function() {
  if (mainWindow === null) {
    createWindow();
  }
});
