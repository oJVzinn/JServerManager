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
        db.all(
            query,
            parameters,
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
