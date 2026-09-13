import sqlite3 from "sqlite3";
import { ServerTypeEntity } from "../../entity/ServerTypeEntity.js";

type ServerTypeRow = Omit<ServerTypeEntity, "autoAcceptEula"> & {
    autoAcceptEula: number;
};

export function createServerTypeTable(db: sqlite3.Database): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(`
        CREATE TABLE IF NOT EXISTS serverType
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT UNIQUE NOT NULL,
            jarPath TEXT NOT NULL,
            onlineModeKey TEXT NOT NULL,
            onlineModeFile TEXT NOT NULL,
            serverPortKey TEXT NOT NULL,
            serverPortFile TEXT NOT NULL,
            autoAcceptEula BOOLEAN DEFAULT(FALSE)
        )
      `, (err) => {
            if (err) {
                reject(err);
                return;
            }

            resolve();
        });
    });
}

export async function createServerType(db: sqlite3.Database, serverType: ServerTypeEntity) {
    await new Promise<void>((resolve, reject) => {
        db.run("INSERT INTO serverType(name, jarPath, onlineModeKey, onlineModeFile, serverPortKey, serverPortFile, autoAcceptEula) VALUES (?, ?, ?, ?, ?, ?, ?)",
            [serverType.name, serverType.jarPath, serverType.onlineModeKey, serverType.onlineModeFile, serverType.serverPortKey, serverType.serverPortFile, serverType.autoAcceptEula],
            (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve();
            },
        );
    });
}

export function list(db: sqlite3.Database, maxServersType: number, page: number, keyWord: string): Promise<Array<ServerTypeEntity>> {
    const limit = Math.max(1, Math.floor(maxServersType));
    const currentPage = Math.max(1, Math.floor(page));
    const offset = (currentPage - 1) * limit;
    const search = keyWord.trim();
    const query = search === ""
        ? "SELECT * FROM serverType ORDER BY id LIMIT ? OFFSET ?"
        : "SELECT * FROM serverType WHERE name LIKE ? ORDER BY id LIMIT ? OFFSET ?";

    const parameters = search === ""
        ? [limit, offset]
        : [`%${search}%`, limit, offset];

    return new Promise((resolve, reject) => {
        db.all<ServerTypeRow>(query, parameters, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(rows.map((row) => ({
                    ...row,
                    autoAcceptEula: Boolean(row.autoAcceptEula)
                })));
            },
        );
    });
}

export function countTotal(db: sqlite3.Database, keyWord: string): Promise<number> {
    const search = keyWord.trim();
    const query = search === ""
        ? "SELECT COUNT(id) AS total FROM serverType"
        : "SELECT COUNT(id) AS total FROM serverType WHERE name LIKE ?";
    const parameters = search === "" ? [] : [`%${search}%`];

    return new Promise((resolve, reject) => {
        db.get(
            query,
            parameters,
            (err, row: { total: number }) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(row.total);
            },
        );
    });
}

export function findByJarPath(db: sqlite3.Database, path: string): Promise<ServerTypeEntity | null> {
    return new Promise((resolve, reject) => {
        db.get<ServerTypeRow>(
            "SELECT * FROM serverType WHERE path = ?",
            [path],
            (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (!row) {
                    resolve(null);
                    return;
                }

                resolve({
                    ...row,
                    autoAcceptEula: Boolean(row.autoAcceptEula)
                });
            },
        );
    });
}