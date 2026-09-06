import type {ServerEntity} from "../entity/ServerEntity.ts";

export {};

declare global {
    interface Window {
        electronAPI: {
            listServers: (
                maxServers: number,
                page: number
            ) => Promise<ServerEntity[]>;

            countServers: () => Promise<number>
        };
    }
}

