import { ipcMain } from "electron";
import { getDatabase } from "../database/database.js";
import { list, countTotal } from "../database/repositories/ServerRepository.js"

export default function init() {
    ipcMain.handle("server:list", async (_event, params: {maxServers: number, page: number})=> {
        return list(getDatabase(), params.maxServers, params.page)
    })

    ipcMain.handle("server:count", async (_event)=> {
        return countTotal(getDatabase())
    })
}
