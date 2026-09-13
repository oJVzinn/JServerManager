import { ipcMain } from "electron";
import { getDatabase } from "../../database/database.js";
import {
    list,
    countTotal,
} from "../../database/repositories/ServerTypeRepository.js"

export default function init() {
    ipcMain.handle("serverType:list", async (_event, params: {maxServersType: number, page: number, keyWord: string})=> {
        return list(getDatabase(), params.maxServersType, params.page, params.keyWord)
    })

    ipcMain.handle("serverType:count", async (_event, keyWord: string) => {
        return countTotal(getDatabase(), keyWord)
    })

}