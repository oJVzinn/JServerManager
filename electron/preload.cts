import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
    listServers: (maxServers: number, page: number, keyWord: string) =>
        ipcRenderer.invoke("server:list", { maxServers, page, keyWord }),
    countServers: (keyWord: string) => ipcRenderer.invoke("server:count", keyWord)
});
