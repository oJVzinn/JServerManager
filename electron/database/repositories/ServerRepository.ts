import sqlite3 from "sqlite3";
import { ServerEntity } from "../entity/ServerEntity.js";

type ServerRow = Omit<ServerEntity, "offlineMode"> & {
    offlineMode: number;
};

export async function createTable(db: sqlite3.Database) {
    db.run(`
    CREATE TABLE IF NOT EXISTS servers
    (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        path TEXT NOT NULL,
        type TEXT NOT NULL DEFAULT ('BUKKIT'),
        port INT NOT NULL DEFAULT (25565),
        offlineMode BOOLEAN NOT NULL DEFAULT (TRUE)
    )
  `);
}

export function list(db: sqlite3.Database, maxServers: number, page: number): Promise<Array<ServerEntity>> {
    const limit = Math.max(1, Math.floor(maxServers));
    const currentPage = Math.max(1, Math.floor(page));
    const offset = (currentPage - 1) * limit;

    return new Promise((resolve, reject) => {
        db.all(
            "SELECT * FROM servers ORDER BY id LIMIT ? OFFSET ?",
            [limit, offset],
            (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve((rows as Array<ServerRow>).map((row) => ({
                    ...row,
                    offlineMode: Boolean(row.offlineMode),
                    stats: "RUNNING"
                })));
            },
        );
    });
}

export function countTotal(db: sqlite3.Database): Promise<number> {
    return new Promise((resolve, reject) => {
        db.get(
            "SELECT COUNT(id) AS total FROM servers",
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
