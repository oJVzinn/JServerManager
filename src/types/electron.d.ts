import type {ServerEntity} from "../entity/ServerEntity.ts";

export {};

declare global {
    interface Window {
        electronAPI: {
            listServers: (
                maxServers: number,
                page: number,
                keyWord: string
            ) => Promise<ServerEntity[]>;

            countServers: (keyWord: string) => Promise<number>

            findServerByPort: (port: number) => Promise<ServerEntity | null>

            findServerByPath: (serverPath: string) => Promise<ServerEntity | null>

            deleteServerByID: (id: number) => Promise<void>

            deleteFolderByPath: (path: string) => Promise<void>

            findDefaultFolderByService: (service: string) => Promise<string | null>

            processServerCreate: (server: ServerEntity) => Promise<void>

            findServerPathByID: (id: number) => Promise<string | null>

            selectFolder: () => Promise<{
                name: string;
                path: string;
            } | null>
        };
    }
}
