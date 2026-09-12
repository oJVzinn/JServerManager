import { ipcMain } from "electron";
import { getDatabase } from "../../database/database.js";
import {
    list,
    countTotal,
    findByPort,
    findByPath,
    deleteByID,
    findServerPathByID
} from "../../database/repositories/ServerRepository.js"
import { ServerEntity } from "../../entity/ServerEntity.js";
import { processCreateServer } from "../../services/serverService.js"

export default function init() {
    ipcMain.handle("server:list", async (_event, params: {maxServers: number, page: number, keyWord: string})=> {
        return list(getDatabase(), params.maxServers, params.page, params.keyWord)
    })

    ipcMain.handle("server:deleteByID", async (_event, id: number)=> {
        return deleteByID(getDatabase(), id)
    })

    ipcMain.handle("server:count", async (_event, keyWord: string) => {
        return countTotal(getDatabase(), keyWord)
    })

    ipcMain.handle("server:findByPort", async (_event, port: number) => {
        return findByPort(getDatabase(), port)
    })

    ipcMain.handle("server:findByPath", async (_event, path: string) => {
        return findByPath(getDatabase(), path)
    })

    ipcMain.handle("server:processServerCreate", async (_event, server: ServerEntity) => {
        return processCreateServer(server)
    })

    ipcMain.handle("server:findServerPathByID", async (_event, serverID: number) => {
        return findServerPathByID(getDatabase(), serverID)
    })
}