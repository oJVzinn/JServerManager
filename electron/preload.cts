import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
    listServers: (maxServers: number, page: number)=> ipcRenderer.invoke("server:list", { maxServers, page }),
    countServers: ()=> ipcRenderer.invoke("server:count")
});
