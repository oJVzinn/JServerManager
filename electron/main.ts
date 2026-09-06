import { app, BrowserWindow } from "electron";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { init } from "./database/database.js";
import ipcHandler from "./ipc/ipcHandler.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function createWindow() {
    const window = new BrowserWindow({
        width: 1200,
        height: 800,
        autoHideMenuBar: false,
        webPreferences: {
            preload: path.join(__dirname, "preload.cjs"),
            contextIsolation: true,
            nodeIntegration: false,
        },
    });

    window.loadFile(path.join(__dirname, "../dist/index.html"));
}

app.whenReady().then(async () => {
    await init();
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
})

ipcHandler()
