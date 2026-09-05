import styles from "./ServerListInfo.module.css"

type props = {
    position: number
    id: number
    name: string
    type: string
    status: string
}

export default function ServerListInfo( {position, id, name, type, status}: props ) {
    return <tr className={(position % 2 == 0 ? styles.tableBackgroundSecondary : styles.tableBackgroundPrimary) }>
        <td className={`${styles.tableCell} ${styles.checkboxCell}`}>
            <input type={"checkbox"}/>
        </td>
        <td className={`${styles.tableCell} ${styles.idCell} ${styles.columDesc}`}>{id}</td>
        <td className={`${styles.tableCell} ${styles.columDesc}`}>{name}</td>
        <td className={`${styles.tableCell} ${styles.columDesc}`}>{type}</td>
        <td className={`${styles.tableCell} ${styles.columDesc}`}>{status}</td>
        <td className={styles.buttonCell}>
            <button className={styles.actionButton}><img className={styles.buttonIcon} alt="Editar servidor" src="/assets/edit.svg"/></button>
        </td>
        <td className={styles.buttonCell}>
            <button className={styles.actionButton}><img className={styles.buttonIcon} alt="Excluir servidor" src="/assets/delete.svg"/></button>
        </td>
    </tr>
}