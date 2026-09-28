import { ipcMain } from "electron";
import {deletePath, findDefaultFolderByService, openSelectFolderOnCreation} from "../../services/folderService.js"

export default function init() {
    ipcMain.handle("folder:select", async () => {
        return openSelectFolderOnCreation()
    })

    ipcMain.handle("folder:defaultByService", async (_event, service: string) => {
        return findDefaultFolderByService(service)
    })

    ipcMain.handle("folder:deleteByPath", async (_event, path: string) => {
        return deletePath(path)
    })
}