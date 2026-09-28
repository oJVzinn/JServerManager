import { ipcMain } from "electron";
import { ServerEntity } from "../../entity/ServerEntity.js";
import {
    countServers, findServerByPath,
    findServerByPort,
    listServers,
    processCreateServer,
    processDeleteServerByID
} from "../../services/serverService.js"

export default function init() {
    ipcMain.handle("server:list", async (_event, params: {maxServers: number, page: number, keyWord: string})=> {
        return listServers(params.maxServers, params.page, params.keyWord)
    })

    ipcMain.handle("server:count", async (_event, keyWord: string) => {
        return countServers(keyWord)
    })

    ipcMain.handle("server:findByPort", async (_event, port: number) => {
        return findServerByPort(port)
    })

    ipcMain.handle("server:findByPath", async (_event, path: string) => {
        return findServerByPath(path)
    })

    ipcMain.handle("server:processServerCreate", async (_event, server: ServerEntity) => {
        return processCreateServer(server)
    })

    ipcMain.handle("server:processServerDeleteByID", async (_event, id: number) => {
        return processDeleteServerByID(id)
    })

}