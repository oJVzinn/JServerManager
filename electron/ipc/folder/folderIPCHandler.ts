import { ipcMain } from "electron";
import {deletePath, openSelectFolderOnCreation} from "../../services/folderService.js"
import { getDatabase } from "../../database/database.js";
import { findByService } from "../../database/repositories/FolderRepository.js"

export default function init() {
    ipcMain.handle("folder:select", async () => {
        return openSelectFolderOnCreation()
    })

    ipcMain.handle("folder:defaultByService", async (_event, service: string) => {
        return findByService(getDatabase(), service)
    })

    ipcMain.handle("folder:deleteByPath", async (_event, path: string) => {
        return deletePath(path)
    })
}