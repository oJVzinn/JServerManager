import { ipcMain } from "electron";
import { getDatabase } from "../database/database.js";
import { list, countTotal } from "../database/repositories/ServerRepository.js"

export default function init() {
    ipcMain.handle("server:list", async (_event, params: {maxServers: number, page: number, keyWord: string})=> {
        return list(getDatabase(), params.maxServers, params.page, params.keyWord)
    })

    ipcMain.handle("server:count", async (_event, keyWord: string) => {
        return countTotal(getDatabase(), keyWord)
    })
}
