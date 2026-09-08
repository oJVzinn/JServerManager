import {app, dialog} from "electron";
import path from "node:path";
import { mkdir } from "node:fs/promises";
import { list, insertServices } from "../database/repositories/FolderRepository.js"
import { getDatabase } from "../database/database.js";
import type { ServiceConfigEntity } from "../entity/ServiceConfigEntity.js"

export default async function init() {
    const services = await list(getDatabase());
    if (services.length === 0) {
        await setupDefaultConfigs();
    }
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
