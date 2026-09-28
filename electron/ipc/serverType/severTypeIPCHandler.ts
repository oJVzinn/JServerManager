import { ipcMain } from "electron";
import {
    countServersType,
    findServerTypeByName,
    listServersType,
    processCreateServer
} from "../../services/serverTypeService.js";
import {ServerTypeEntity} from "../../entity/ServerTypeEntity.js";

export default function init() {
    ipcMain.handle("serverType:list", async (_event, params: {maxServersType: number, page: number, keyWord: string})=> {
        return listServersType(params.maxServersType, params.page, params.keyWord)
    })

    ipcMain.handle("serverType:count", async (_event, keyWord: string) => {
        return countServersType(keyWord)
    })

    ipcMain.handle("serverType:findByName", async (_event, name: string) => {
        return findServerTypeByName(name)
    })

    ipcMain.handle("serverType:processServerTypeCreate", async (_event, server: ServerTypeEntity) => {
        return processCreateServer(server)
    })

}