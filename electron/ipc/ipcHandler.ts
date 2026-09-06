import { dialog, ipcMain } from "electron";
import path from "node:path";
import { getDatabase } from "../database/database.js";
import { list, countTotal } from "../database/repositories/ServerRepository.js"

export default function init() {
    ipcMain.handle("server:list", async (_event, params: {maxServers: number, page: number, keyWord: string})=> {
        return list(getDatabase(), params.maxServers, params.page, params.keyWord)
    })

    ipcMain.handle("server:count", async (_event, keyWord: string) => {
        return countTotal(getDatabase(), keyWord)
    })

    ipcMain.handle("folder:select", async () => {
        const result = await dialog.showOpenDialog({
            properties: ["openDirectory"]
        });

        if (result.canceled || result.filePaths.length === 0) return null;

        const folderPath = result.filePaths[0];

        return {
            name: path.basename(folderPath),
            path: folderPath
        };
    })

}
