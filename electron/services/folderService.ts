import {app, dialog} from "electron";
import path from "node:path";
import { mkdir, rm } from "node:fs/promises";
import { list, insertServices } from "../database/repositories/FolderRepository.js"
import { getDatabase } from "../database/database.js";
import type { ServiceConfigEntity } from "../entity/ServiceConfigEntity.js"

export default async function init() {
    const services = await list(getDatabase());
    if (services.length === 0) await setupDefaultConfigs();
}

export async function deletePath(pathLocation: string): Promise<void> {
    return new Promise(async (resolve, reject) => {
        await rm(pathLocation, {
            recursive: true,
            force: true
        }).catch((err) => {
            reject(new Error(`Erro ao tentar excluir a pasta ${pathLocation}`, err))
        })

        resolve()
    })
}

export async function openSelectFolderOnCreation(): Promise<{name: string, path: string} | null> {
    const result = await dialog.showOpenDialog({
        properties: ["openDirectory"]
    });

    if (result.canceled || result.filePaths.length === 0) return null;

    const folderPath = result.filePaths[0];

    return {
        name: path.basename(folderPath),
        path: folderPath
    };
}

async function setupDefaultConfigs() {
    const serverPath = path.join(app.getPath("userData"), "servers")
    const serverConfig: ServiceConfigEntity = { service: "ServerConfig", path:  serverPath}
    await mkdir(serverPath, { recursive: true });

    const databasePath = path.join(app.getPath("userData"), "database")
    const databaseConfig: ServiceConfigEntity = { service: "DatabaseConfig", path:  databasePath}
    await mkdir(databasePath, { recursive: true });

    await insertServices(getDatabase(), [serverConfig, databaseConfig])
}
