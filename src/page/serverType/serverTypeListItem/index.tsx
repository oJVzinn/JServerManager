import styles from "./ServerListItem.module.css"
import serverListStyles from "../serverTypeList/ServerList.module.css"
import {type Dispatch, type SetStateAction, useEffect, useState} from "react";
import type {InfoBoxEntity} from "../../../entity/InfoBoxEntity.ts";
import type {ServerEntity} from "../../../entity/ServerEntity.ts";

type ServerTypeItemList = ServerEntity & {
    position: number
    selected: boolean
}

type props = {
    serverItemList: ServerTypeItemList;
    setServersSelected: Dispatch<SetStateAction<Array<number>>>;
    sendInfoBox: (infoBox: InfoBoxEntity) => void
    processDeleteServer: (serverId: number) => void
}

export default function ServerTypeListItem( {serverItemList, sendInfoBox, processDeleteServer, setServersSelected}: props ) {
    const [serverItem, setServerItem] = useState<ServerTypeItemList>(serverItemList)
    async function processDelete() {
        try {
            await window.electronAPI.processServerDeleteByID(serverItemList.id)
            processDeleteServer(serverItemList.id)
            sendInfoBox({title: "SUCESSO", description: `Servidor ${serverItem.id} excluido com sucesso`, type: "sucess"})
        } catch (reason) {
            const description = reason instanceof Error
                ? reason.message
                : typeof reason === "string"
                    ? reason
                    : JSON.stringify(reason) ?? String(reason)

            sendInfoBox({title: "ERRO", description: description, type: "error"})
        }
    }

    useEffect(() => {
        setServerItem((current) => ({
            ...current,
            selected: serverItemList.selected
        }))

        setServersSelected((current) => serverItemList.selected
            ? current.includes(serverItemList.id) ? current : [...current, serverItemList.id]
            : current.filter((id) => id !== serverItemList.id))
    }, [serverItemList.id, serverItemList.selected, setServersSelected]);

    return <tr className={(serverItem.position % 2 == 0 ? styles.tableBackgroundPrimary : styles.tableBackgroundSecondary) }>
        <td className={`${styles.tableCell}`}>
            <input type={"checkbox"} className={serverListStyles.checkbox} checked={serverItem.selected} onChange={(event)=> {
                 const checked = event.currentTarget.checked
                 setServerItem((current)=> ({
                     ...current,
                     selected: checked
                 }))
                 setServersSelected((current) => checked
                     ? current.includes(serverItem.id) ? current : [...current, serverItem.id]
                     : current.filter((id) => id !== serverItem.id))
             }}/>
        </td>
        <td className={`${styles.tableCell} ${styles.columDesc}`}>{serverItem.id}</td>
        <td className={`${styles.tableCell} ${styles.columDesc}`}>{serverItem.name}</td>
        <td className={`${styles.tableCell} ${styles.columDesc}`}>{serverItem.serverTypeName}</td>
        <td className={`${styles.tableCell} ${styles.columDesc}`}>{serverItem.stats}</td>
        <td className={`${styles.tableCell} ${styles.columDesc}`}>{serverItem.port}</td>
        <td className={styles.buttonCell}>
            <button className={styles.actionButton}><img className={styles.buttonIcon} alt="Editar servidor" src="./assets/edit.svg"/></button>
        </td>
        <td className={styles.buttonCell}>
            <button className={styles.actionButton} onClick={processDelete}>
                <img className={styles.buttonIcon} alt="Excluir servidor" src="./assets/delete.svg"/>
            </button>
        </td>
    </tr>
}
