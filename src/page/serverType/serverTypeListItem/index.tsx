import styles from "./ServerListItem.module.css"
import serverListStyles from "../serverTypeList/ServerList.module.css"
import {type Dispatch, type SetStateAction} from "react";
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
    async function processDelete() {
        try {
            await window.electronAPI.processServerDeleteByID(serverTypeItemList.id)
            processDeleteServer(serverTypeItemList.id)
            sendInfoBox({title: "SUCESSO", description: `Servidor ${serverTypeItemList.id} excluido com sucesso`, type: "sucess"})
        } catch (reason) {
            const description = reason instanceof Error
                ? reason.message
                : typeof reason === "string"
                    ? reason
                    : JSON.stringify(reason) ?? String(reason)

            sendInfoBox({title: "ERRO", description: description, type: "error"})
        }
    }

    return <tr className={(serverTypeItemList.position % 2 == 0 ? styles.tableBackgroundPrimary : styles.tableBackgroundSecondary) }>
        <td className={`${styles.tableCell}`}>
            <input type={"checkbox"} className={serverListStyles.checkbox} checked={serverTypeItemList.selected} onChange={(event)=> {
                const checked = event.currentTarget.checked
                setServerTypesSelected((current) => checked
                    ? current.includes(serverTypeItemList.id) ? current : [...current, serverTypeItemList.id]
                    : current.filter((id) => id !== serverTypeItemList.id))
             }}/>
        </td>
        <td className={`${styles.tableCell} ${styles.columDesc}`}>{serverTypeItemList.id}</td>
        <td className={`${styles.tableCell} ${styles.columDesc}`}>{serverTypeItemList.name}</td>
        <td className={`${styles.tableCell} ${styles.columDesc}`}>{String(serverTypeItemList.autoAcceptEula).toUpperCase()}</td>
        <td className={`${styles.tableCell} ${styles.columDesc}`}>{serverTypeItemList.path}</td>
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
