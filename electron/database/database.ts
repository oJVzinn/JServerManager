import sqlite3 from "sqlite3";
import path from "node:path";
import { app } from "electron";
import { createServerTable } from "./repositories/ServerRepository.js"
import { createFolderTable } from "./repositories/FolderRepository.js"
import { createServerTypeTable } from "./repositories/ServerTypeRepository.js";

let db: sqlite3.Database;

export default async function init() {
    const databasePath = path.join(app.getPath("userData"), "jservermanager.db");
    db = new sqlite3.Database(databasePath);
    await createServerTable(db)
    await createFolderTable(db)
    await createServerTypeTable(db)
}

export function getDatabase() {
    if (!db) throw new Error("Banco de dados não inicializado");
    return db;
}