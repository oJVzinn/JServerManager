import { contextBridge, ipcRenderer } from "electron";
import type { ServerEntity } from "./entity/ServerEntity.js"

contextBridge.exposeInMainWorld("electronAPI", {
    listServers: (maxServers: number, page: number, keyWord: string) => ipcRenderer.invoke("server:list", { maxServers, page, keyWord }),
    countServers: (keyWord: string) => ipcRenderer.invoke("server:count", keyWord),
    findServerByPort: (port: number) => ipcRenderer.invoke("server:findByPort", port),
    findServerByPath: (path: string) => ipcRenderer.invoke("server:findByPath", path),
    processServerCreate: (server: ServerEntity) => ipcRenderer.invoke("server:processServerCreate", server),
    processServerDeleteByID: (id: number) => ipcRenderer.invoke("server:processServerDeleteByID", id),

    listServerType: (maxServersType: number, page: number, keyWord: string) => ipcRenderer.invoke("serverType:list", {maxServersType, page, keyWord}),

    findDefaultFolderByService: (service: string) => ipcRenderer.invoke("folder:defaultByService", service),
    selectFolder: () => ipcRenderer.invoke("folder:select"),
    deleteFolderByPath: (path: string) => ipcRenderer.invoke("folder:deleteByPath", path)

});
