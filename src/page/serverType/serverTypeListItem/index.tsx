import styles from "./ServerListItem.module.css"
import serverListStyles from "../serverTypeList/ServerList.module.css"
import {type Dispatch, type SetStateAction, useEffect, useState} from "react";
import type {InfoBoxEntity} from "../../../entity/InfoBoxEntity.ts";
import type {ServerTypeEntity} from "../../../entity/ServerTypeEntity.ts";

type ServerTypeItemList = ServerTypeEntity & {
    position: number
    selected: boolean
}

type props = {
    serverTypeItemList: ServerTypeItemList;
    setServerTypesSelected: Dispatch<SetStateAction<Array<number>>>;
    sendInfoBox: (infoBox: InfoBoxEntity) => void
    processDeleteServer: (serverId: number) => void
}

export default function ServerTypeListItem( {serverTypeItemList, sendInfoBox, processDeleteServer, setServerTypesSelected}: props ) {
    const [serverTypeItem, setServerTypeItem] = useState<ServerTypeItemList>(serverTypeItemList)
    async function processDelete() {
        try {
            await window.electronAPI.processServerDeleteByID(serverTypeItem.id)
            processDeleteServer(serverTypeItem.id)
            sendInfoBox({title: "SUCESSO", description: `Servidor ${serverTypeItem.id} excluido com sucesso`, type: "sucess"})
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
        setServerTypeItem((current) => ({
            ...current,
            selected: serverTypeItem.selected
        }))

        setServerTypesSelected((current) => serverTypeItem.selected
            ? current.includes(serverTypeItem.id) ? current : [...current, serverTypeItem.id]
            : current.filter((id) => id !== serverTypeItem.id))
    }, [serverTypeItem.id, serverTypeItem.selected, setServerTypesSelected]);

    return <tr className={(serverTypeItem.position % 2 == 0 ? styles.tableBackgroundPrimary : styles.tableBackgroundSecondary) }>
        <td className={`${styles.tableCell}`}>
            <input type={"checkbox"} className={serverListStyles.checkbox} checked={serverTypeItem.selected} onChange={(event)=> {
                const checked = event.currentTarget.checked
                setServerTypeItem((current)=> ({
                    ...current,
                    selected: checked
                }))
                setServerTypesSelected((current) => checked
                    ? current.includes(serverTypeItem.id) ? current : [...current, serverTypeItem.id]
                    : current.filter((id) => id !== serverTypeItem.id))
             }}/>
        </td>
        <td className={`${styles.tableCell} ${styles.columDesc}`}>{serverTypeItem.id}</td>
        <td className={`${styles.tableCell} ${styles.columDesc}`}>{serverTypeItem.name}</td>
        <td className={`${styles.tableCell} ${styles.columDesc}`}>{String(serverTypeItem.autoAcceptEula).toUpperCase()}</td>
        <td className={`${styles.tableCell} ${styles.columDesc}`}>{serverTypeItem.path}</td>
        <td className={styles.buttonCell}>
            <button className={styles.actionButton}>
                <img className={styles.buttonIcon} alt="Editar servidor" src="./assets/edit.svg"/>
            </button>
        </td>
        <td className={styles.buttonCell}>
            <button className={styles.actionButton} onClick={processDelete}>
                <img className={styles.buttonIcon} alt="Excluir servidor" src="./assets/delete.svg"/>
            </button>
        </td>
    </tr>
}
