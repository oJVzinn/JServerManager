import { ipcMain } from "electron";
import { exec } from "node:child_process";

ipcMain.handle("java:version", async () => {
    return new Promise((resolve, reject) => {
        exec("java -version", (error, stdout, stderr) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(stderr || stdout);
        });
    });
});