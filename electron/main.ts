import {app, BrowserWindow} from "electron";
import path from "node:path";
import {fileURLToPath} from "node:url";
import database from "./database/database.js";
import folderManager from "./services/folderService.js";
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

app.whenReady().then(async ()=> {
    await database();
    await folderManager();
    createWindow();

    app.on("activate", () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
}).catch((error) => {
    console.error("Falha ao inicializar a aplicação:", error);
    app.quit();
});

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") app.quit();
})

ipcHandler()
