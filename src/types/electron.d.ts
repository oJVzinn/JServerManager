import type {ServerEntity} from "../entity/ServerEntity.ts";
import type {ServerTypeEntity} from "../entity/ServerTypeEntity.ts";

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

            countServerType: (keyWord: string) => Promise<number>

            findServerByPort: (port: number) => Promise<ServerEntity | null>

            findServerByPath: (serverPath: string) => Promise<ServerEntity | null>

            deleteFolderByPath: (path: string) => Promise<void>

            findDefaultFolderByService: (service: string) => Promise<string | null>

            listServerType: (maxServersType: number, page: number, keyWord: string) => Promise<Array<ServerTypeEntity>>

            processServerCreate: (server: ServerEntity) => Promise<void>

            processServerDeleteByID: (id: number) => Promise<void>

            selectFolder: () => Promise<{
                name: string;
                path: string;
            } | null>
        };
    }
}
