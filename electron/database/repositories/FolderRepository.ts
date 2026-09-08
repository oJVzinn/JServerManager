import sqlite3 from "sqlite3";
import type { ServiceConfigEntity } from "../../entity/ServiceConfigEntity.js"

export function createFolderTable(db: sqlite3.Database): Promise<void> {
    return new Promise((resolve, reject) => {
        db.run("CREATE TABLE IF NOT EXISTS folderConfigs(service TEXT PRIMARY KEY, path TEXT NOT NULL)",
            (err) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve();
            });
    });
}
export function list(db: sqlite3.Database): Promise<Array<ServiceConfigEntity>> {
    return new Promise((resolve, reject) => {
        db.all<ServiceConfigEntity>("SELECT * FROM folderConfigs",
            (err, rows) => {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(rows);
            },
        );
    });
}

export function findByPath(db: sqlite3.Database, path: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
        db.get<ServiceConfigEntity>(
            "SELECT * FROM folderConfigs WHERE path = ?",
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

                resolve(row.path);
            },
        );
    });
}

export function findByService(db: sqlite3.Database, service: string): Promise<string | null> {
    return new Promise((resolve, reject) => {
        db.get<ServiceConfigEntity>(
            "SELECT * FROM folderConfigs WHERE service = ?",
            [service],
            (err, row) => {
                if (err) {
                    reject(err);
                    return;
                }

                if (!row) {
                    resolve(null);
                    return;
                }

                resolve(row.path);
            },
        );
    });
}

export async function insertServices(db: sqlite3.Database, services: ServiceConfigEntity[]) {
    for (const value of services) {
        await new Promise<void>((resolve, reject) => {
            db.run(
                "INSERT INTO folderConfigs(service, path) VALUES (?, ?)",
                [value.service, value.path],
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
}

export function updatePath(db: sqlite3.Database, service: string, path: string) {
    db.run("UPDATE folderConfigs SET path = ? WHERE service = ?",
        [path, service],
        (err) => {
            if (err) throw err
        },
    );
}
