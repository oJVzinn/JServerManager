import {ServerEntity} from "../entity/ServerEntity.js";
import {createServer, deleteByID, findByID} from "../database/repositories/ServerRepository.js"
import { getDatabase } from "../database/database.js";
import { mkdir } from "node:fs/promises";
import {deletePath} from "./folderService.js";

export async function processCreateServer(server: ServerEntity) {
    try {
        await createServer(getDatabase(), server);
    } catch {
        throw new Error("Erro ao inserir o valor no database");
    }

    try {
        await mkdir(server.path, {recursive: true});
        // Após isso, irá consultar o serviço de repositorios (Tipos), irá mover o jar em questão e configurar automaticamente
    } catch {
        throw new Error("Erro ao criar a pasta do servidor");
    }
}

export async function processDeleteServerByID(id: number): Promise<void> {
    const db = getDatabase();
    const serverEntity = await findByID(db, id)

    if (serverEntity == null) throw new Error("Não existe nenhum servidor com esse ID para ser deletado")

    await deletePath(serverEntity.path)
    await deleteByID(getDatabase(), id)
}
