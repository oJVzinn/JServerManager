import { ipcMain } from "electron";
import { getDatabase } from "../../database/database.js";
import {
    list,
    countTotal, findByName,
} from "../../database/repositories/ServerTypeRepository.js"
import {processCreateServer} from "../../services/serverTypeService.js";
import {ServerTypeEntity} from "../../entity/ServerTypeEntity.js";

export default function init() {
    ipcMain.handle("serverType:list", async (_event, params: {maxServersType: number, page: number, keyWord: string})=> {
        return list(getDatabase(), params.maxServersType, params.page, params.keyWord)
    })

    ipcMain.handle("serverType:count", async (_event, keyWord: string) => {
        return countTotal(getDatabase(), keyWord)
    })

    ipcMain.handle("serverType:findByName", async (_event, name: string) => {
        return findByName(getDatabase(), name)
    })

    ipcMain.handle("serverType:processServerTypeCreate", async (_event, server: ServerTypeEntity) => {
        return processCreateServer(server)
    })

}