import "reflect-metadata";
import { join } from "path";
import { app, BrowserWindow } from "electron";
import { bootstrap, destroy } from "./bootstrap";
import { windowConfig } from "./config";
import { showLoading, loading, loadingStatus } from "./loading";
import "./express";
const isDev = !app.isPackaged;

process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
let mainWindow: BrowserWindow;
async function createWindow() {
  try {
    mainWindow = new BrowserWindow({
      webPreferences: {
        nodeIntegration: true,
        webSecurity: false,
        contextIsolation: false,
        devTools: isDev,
      },
      show: false, // 先隐藏
      ...windowConfig,
    });

    // win.maximize();
    // console.log("await bootstrap");
    await bootstrap(mainWindow.webContents);

    const URL = isDev
      ? `http://localhost:${process.env.PORT}`
      : `file://${join(app.getAppPath(), "dist/render/index.html")}`;

    mainWindow.loadURL(URL);

    if (isDev) {
      // mainWindow.webContents.openDevTools();
    } else {
      mainWindow.removeMenu();
    }
    mainWindow.on("ready-to-show", () => {
      if (loadingStatus.cmdCheck) {
        if (!loading.isDestroyed()) {
          loading.hide();
          loading.close();
          loading.destroy();
        }
        mainWindow.show();
      } else {
        destroy();
        mainWindow.destroy();
        loading.webContents.send("check-cmd", loadingStatus);
      }
    });
    mainWindow.on("closed", () => {
      console.log("mainWindow closed");
      destroy();
      mainWindow.destroy();
    });
  } catch (error) {
    console.log(error);
    app.quit();
  }
}

app.on("activate", () => {
  if (!mainWindow.isDestroyed()) {
    console.log(mainWindow.isVisible(), mainWindow.isEnabled());
    if (!mainWindow.isVisible() && !mainWindow.isEnabled()) {
      mainWindow.show();
    }
  }
});

app.on("ready", async () => {
  showLoading(createWindow);
});

app.on("before-quit", (e) => {
  e.preventDefault();
  app.exit(0);
  process.exit(0);
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
