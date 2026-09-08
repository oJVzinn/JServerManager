import sqlite3 from "sqlite3";
import { ServerEntity } from "../../entity/ServerEntity.js";

type ServerRow = Omit<ServerEntity, "offlineMode" | "stats"> & {
    offlineMode: number;
};

export function createServerTable(db: sqlite3.Database): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run(`
        CREATE TABLE IF NOT EXISTS servers
        (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            path TEXT NOT NULL,
            type TEXT NOT NULL,
            port INT NOT NULL UNIQUE DEFAULT (25565),
            offlineMode BOOLEAN NOT NULL DEFAULT (TRUE)
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

export async function createServer(db: sqlite3.Database, server: ServerEntity) {
    await new Promise<void>((resolve, reject) => {
        db.run("INSERT INTO servers(name, path, type, port, offlineMode) VALUES (?, ?, ?, ?, ?)",
            [server.name, server.path, server.type, server.port, server.offlineMode],
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

export function list(db: sqlite3.Database, maxServers: number, page: number, keyWord: string): Promise<Array<ServerEntity>> {
    const limit = Math.max(1, Math.floor(maxServers));
    const currentPage = Math.max(1, Math.floor(page));
    const offset = (currentPage - 1) * limit;
    const search = keyWord.trim();
    const query = search === ""
        ? "SELECT * FROM servers ORDER BY id LIMIT ? OFFSET ?"
        : "SELECT * FROM servers WHERE name LIKE ? ORDER BY id LIMIT ? OFFSET ?";

    const parameters = search === ""
        ? [limit, offset]
        : [`%${search}%`, limit, offset];

    return new Promise((resolve, reject) => {
        db.all<ServerRow>(query, parameters, (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(rows.map((row) => ({
                    ...row,
                    offlineMode: Boolean(row.offlineMode),
                    stats: "RUNNING"
                })));
            },
        );
    });
}

export function countTotal(db: sqlite3.Database, keyWord: string): Promise<number> {
    const search = keyWord.trim();
    const query = search === ""
        ? "SELECT COUNT(id) AS total FROM servers"
        : "SELECT COUNT(id) AS total FROM servers WHERE name LIKE ?";
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

export function findByPort(db: sqlite3.Database, port: number): Promise<ServerEntity | null> {
    return new Promise((resolve, reject) => {
        db.get<ServerRow>(
            "SELECT * FROM servers WHERE port = ?",
            [port],
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
                    offlineMode: Boolean(row.offlineMode),
                    stats: "RUNNING"
                });
            },
        );
    });
}

export function findByPath(db: sqlite3.Database, path: string): Promise<ServerEntity | null> {
    return new Promise((resolve, reject) => {
        db.get<ServerRow>(
            "SELECT * FROM servers WHERE path = ?",
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
                    offlineMode: Boolean(row.offlineMode),
                    stats: "RUNNING"
                });
            },
        );
    });
}
