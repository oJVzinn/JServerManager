import styles from "./ServerList.module.css"
import ServerListInfo from "../serverListItem";
import {useEffect, useState} from "react";
import type {ServerEntity} from "../../../../entity/ServerEntity.ts";
import ServerListHeader from "../serverListHeader";
import ServerListFooter from "../serverListFooter";

type Props = {
    keyWord: string,
    setLoading: (isLoading: boolean) => void;
}

export default function ServerList({keyWord, setLoading}: Props) {
    const pageSize = 11;
    const [server, setServers] = useState<Array<ServerEntity> | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalServers, setTotalServer] = useState<number>(0)
    const [allSelect, setAllSelect] = useState<boolean>(false)

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
                    server !== null && (server.length === 0 ?
                        <tr>
                            <td colSpan={8}>Nenhum item encontrado...</td>
                        </tr> :
                        server.map((value, index) => {
                            const finalServerItem = {
                                ...value,
                                position: index,
                                selected: allSelect
                            }

                            return <ServerListInfo serverItemList={finalServerItem} key={index}/>
                        }))
                }
                </tbody>

                <ServerListFooter setCurrentPage={setCurrentPage} currentPage={currentPage} totalServers={totalServers} pageSize={pageSize}/>
            </table>
        </div>
    )
}
