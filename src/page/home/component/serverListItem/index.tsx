import styles from "./ServerListItem.module.css"

type props = {
    position: number
    id: number
    name: string
    type: string
    status: string
    port: number
}

export default function ServerListItem( {position, id, name, type, status, port}: props ) {
    return <tr className={(position % 2 == 0 ? styles.tableBackgroundPrimary : styles.tableBackgroundSecondary) }>
        <td className={`${styles.tableCell}`}>
            <input type={"checkbox"} className={styles.checkbox}/>
        </td>
        <td className={`${styles.tableCell} ${styles.columDesc}`}>{id}</td>
        <td className={`${styles.tableCell} ${styles.columDesc}`}>{name}</td>
        <td className={`${styles.tableCell} ${styles.columDesc}`}>{type}</td>
        <td className={`${styles.tableCell} ${styles.columDesc}`}>{status}</td>
        <td className={`${styles.tableCell} ${styles.columDesc}`}>{port}</td>
        <td className={styles.buttonCell}>
            <button className={styles.actionButton}><img className={styles.buttonIcon} alt="Editar servidor" src="./assets/edit.svg"/></button>
        </td>
        <td className={styles.buttonCell}>
            <button className={styles.actionButton}><img className={styles.buttonIcon} alt="Excluir servidor" src="./assets/delete.svg"/></button>
        </td>
    </tr>
}