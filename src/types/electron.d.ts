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

            selectFolder: () => Promise<{
                name: string;
                path: string;
            } | null>
        };
    }
}
