import "reflect-metadata";
import { join } from "path";
import { app, BrowserWindow } from "electron";
import { bootstrap, destroy } from "./bootstrap";

const isDev = !app.isPackaged;

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
let mainWindow = null;
async function createWindow() {
  try {
    mainWindow = new BrowserWindow({
      width: 1200,
      minWidth: 1200,
      height: 800,
      minHeight: 800,
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
        contextIsolation: false,
        devTools: true,
        // devTools: false,
      },
      center: true,
      autoHideMenuBar: false,
    });

    // win.maximize();
    mainWindow.webContents.openDevTools();

    await bootstrap(mainWindow.webContents);

    const URL = isDev
      ? `http://localhost:${process.env.PORT}`
      : `file://${join(app.getAppPath(), "dist/render/index.html")}`;

    mainWindow.loadURL(URL);

    if (isDev) {
      mainWindow.webContents.openDevTools();
    } else {
      mainWindow.removeMenu();
    }

    mainWindow.on("closed", () => {
      destroy();
      mainWindow.destroy();
    });
  } catch (error) {
    console.log(error);
    app.quit();
  }
}

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on("ready", async () => {
  createWindow();
});

if (isDev) {
  if (process.platform === "win32") {
    process.on("message", (data) => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}

export { mainWindow };
