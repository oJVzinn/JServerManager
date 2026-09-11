import styles from "./ServerList.module.css"
import ServerListInfo from "../serverListItem";
import {useEffect, useState} from "react";
import type {Dispatch, SetStateAction} from "react";
import type {ServerEntity} from "../../../../entity/ServerEntity.ts";
import ServerListHeader from "../serverListHeader";
import ServerListFooter from "../serverListFooter";
import type {InfoBoxEntity} from "../../../../entity/InfoBoxEntity.ts";

type Props = {
    keyWord: string,
    setLoading: (isLoading: boolean) => void;
    sendInfoBox: (infoBox: InfoBoxEntity) => void;
    servers: Array<ServerEntity> | null;
    setServers: Dispatch<SetStateAction<Array<ServerEntity> | null>>;
}

export default function ServerList({keyWord, setLoading, sendInfoBox, setServers, servers}: Props) {
    const pageSize = 11;

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalServers, setTotalServer] = useState<number>(0)
    const [allSelect, setAllSelect] = useState<boolean>(false)

    function processDeleteServer(serverId: number) {
        if (servers !== null) {
            setServers(current => current === null
                ? null
                : current.filter(server => server.id !== serverId))
            setTotalServer(current => Math.max(0, current - 1))
        }
    }

    useEffect(() => {
        setLoading(true);

        Promise.all([
            window.electronAPI.countServers(keyWord),
            window.electronAPI.listServers(pageSize, currentPage, keyWord),
        ]).then(([total, servers]) => {
            setTotalServer(total);
            setServers(servers);
        }).catch((error) => {
            console.error("Não foi possível carregar os servidores", error);
        }).finally(() => {
            setLoading(false);
        });
    }, [currentPage, keyWord, setLoading])

    return (
        <div className={styles.ServerList}>
            <table className={styles.serverTable}>
                <colgroup>
                    <col className={styles.checkboxColumn}/>
                    <col className={styles.idColumn}/>
                    <col/>
                    <col/>
                    <col/>
                    <col/>
                    <col className={styles.buttonColumn}/>
                    <col className={styles.buttonColumn}/>
                </colgroup>

                <ServerListHeader allSelect={allSelect} setAllSelect={setAllSelect}/>

                <tbody>
                {
                    servers !== null && (servers.length === 0 ?
                        <tr>
                            <td colSpan={8}>Nenhum item encontrado...</td>
                        </tr> :
                        servers.map((value, index) => {
                            const finalServerItem = {
                                ...value,
                                position: index,
                                selected: allSelect
                            }

                            return <ServerListInfo serverItemList={finalServerItem} sendInfoBox={sendInfoBox} processDeleteServer={processDeleteServer} key={value.id}/>
                        }))
                }
                </tbody>

                <ServerListFooter setCurrentPage={setCurrentPage} currentPage={currentPage} totalServers={totalServers} pageSize={pageSize} setServers={setServers}/>
            </table>
        </div>
    )
}
