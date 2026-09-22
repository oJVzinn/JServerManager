import styles from "./ServerList.module.css"
import {useEffect, useState} from "react";
import type {Dispatch, SetStateAction} from "react";
import type {InfoBoxEntity} from "../../../entity/InfoBoxEntity.ts";
import ServerTypeListHeader from "../serverTypeListHeader";
import ServerTypeListFooter from "../serverTypeListFooter";
import ServerTypeListItem from "../serverTypeListItem";
import type {ServerTypeEntity} from "../../../entity/ServerTypeEntity.ts";

type Props = {
    keyWord: string,
    setLoading: (isLoading: boolean) => void;
    sendInfoBox: (infoBox: InfoBoxEntity) => void;
    serverTypes: Array<ServerTypeEntity> | null;
    serverTypeSelected: Array<number>;
    setServerTypesSelected: Dispatch<SetStateAction<Array<number>>>;
    setServerTypes: Dispatch<SetStateAction<Array<ServerTypeEntity> | null>>;
    reloadKey: number;
}

export default function ServerTypeList({keyWord, setLoading, sendInfoBox, setServerTypes, serverTypes, serverTypeSelected, setServerTypesSelected, reloadKey}: Props) {
    const pageSize = 11;

    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalServerType, setTotalServerType] = useState<number>(0)

    const allSelect = serverTypes !== null
        && serverTypes.length > 0
        && serverTypes.every((serverType) => serverTypeSelected.includes(serverType.id))

    function setAllSelect(checked: boolean) {
        if (serverTypes === null) return

        const pageServerTypeIds = serverTypes.map((server) => server.id)

        setServerTypesSelected((current) => checked
            ? [...new Set([...current, ...pageServerTypeIds])]
            : current.filter((serverTypeId) => !pageServerTypeIds.includes(serverTypeId)))
    }

    function processDeleteServer(serverId: number) {
        if (serverTypes !== null) {
            setServerTypes(current => current === null
                ? null
                : current.filter(server => server.id !== serverId))
            setTotalServerType(current => Math.max(0, current - 1))
        }
    }

    useEffect(() => {
        setLoading(true);

        Promise.all([
            window.electronAPI.countServerType(keyWord),
            window.electronAPI.listServerType(pageSize, currentPage, keyWord),
        ]).then(([total, serverTypes]) => {
            setTotalServerType(total);

            const lastPage = Math.max(1, Math.ceil(total / pageSize));
            if (currentPage > lastPage) {
                setCurrentPage(lastPage);
                return;
            }

            setServerTypes(serverTypes);
        }).catch((error) => {
            sendInfoBox({type: "error", description: "Não foi possível carregar os servidores", title: "ERRO"})
            console.error(error)
        }).finally(() => {
            setLoading(false);
        });
    }, [currentPage, keyWord, reloadKey, setLoading])

    return (
        <div className={styles.ServerList}>
            <table className={styles.serverTable}>
                <colgroup>
                    <col className={styles.checkboxColumn}/>
                    <col className={styles.idColumn}/>
                    <col/>
                    <col/>
                    <col/>
                    <col className={styles.buttonColumn}/>
                    <col className={styles.buttonColumn}/>
                </colgroup>

                <ServerTypeListHeader allSelect={allSelect} setAllSelect={setAllSelect}/>

                <tbody>
                {
                    serverTypes !== null && (serverTypes.length === 0 ?
                        <tr>
                            <td colSpan={8}>Nenhum item encontrado...</td>
                        </tr> :
                        serverTypes.map((value, index) => {
                            const finalServerItem = {
                                ...value,
                                position: index,
                                selected: serverTypeSelected.includes(value.id)
                            }

                            return <ServerTypeListItem serverTypeItemList={finalServerItem} sendInfoBox={sendInfoBox} processDeleteServer={processDeleteServer} key={value.id} setServerTypesSelected={setServerTypesSelected}/>
                        }))
                }
                </tbody>

                <ServerTypeListFooter setCurrentPage={setCurrentPage} currentPage={currentPage} totalServerType={totalServerType} pageSize={pageSize}/>
            </table>
        </div>
    )
}
