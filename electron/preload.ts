import {
    contextBridge,
    ipcRenderer,
} from "electron";

contextBridge.exposeInMainWorld("electronAPI", {
    platform: process.platform,

    getJavaVersion: () => {
        return ipcRenderer.invoke("java:version");
    },
});