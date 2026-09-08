import styles from "./ServerListItem.module.css"
import type {ServerEntity} from "../../../../entity/ServerEntity.ts";
import {useEffect, useState} from "react";

type ServerItemList = ServerEntity & {
    position: number
    selected: boolean
}

type props = {
    serverItemList: ServerItemList
}

export default function ServerListItem( {serverItemList}: props ) {
    const [serverItem, setServerItem] = useState<ServerItemList>(serverItemList)

    async function processDeleteServer() {

    }

    useEffect(() => {
        setServerItem((current)=> ({
            ...current,
            selected: serverItemList.selected
        }))
    }, [serverItemList]);

    return <tr className={(serverItem.position % 2 == 0 ? styles.tableBackgroundPrimary : styles.tableBackgroundSecondary) }>
        <td className={`${styles.tableCell}`}>
            <input type={"checkbox"} className={styles.checkbox} checked={serverItem.selected} onChange={(event)=> {
                const checked = event.currentTarget.checked
                setServerItem((current)=> ({
                    ...current,
                    selected: checked
                }))
            }}/>
        </td>
        <td className={`${styles.tableCell} ${styles.columDesc}`}>{serverItem.id}</td>
        <td className={`${styles.tableCell} ${styles.columDesc}`}>{serverItem.name}</td>
        <td className={`${styles.tableCell} ${styles.columDesc}`}>{serverItem.type}</td>
        <td className={`${styles.tableCell} ${styles.columDesc}`}>{serverItem.stats}</td>
        <td className={`${styles.tableCell} ${styles.columDesc}`}>{serverItem.port}</td>
        <td className={styles.buttonCell}>
            <button className={styles.actionButton}><img className={styles.buttonIcon} alt="Editar servidor" src="./assets/edit.svg"/></button>
        </td>
        <td className={styles.buttonCell}>
            <button className={styles.actionButton}><img className={styles.buttonIcon} alt="Excluir servidor" src="./assets/delete.svg"/></button>
        </td>
    </tr>
}