import styles from "./ServerListHeader.module.css";

export default function ServerListHeader() {
    return (
        <thead>
        <tr>
            <th><input type={"checkbox"} className={styles.checkbox}/></th>
            <th className={styles.columnTitle}>ID</th>
            <th className={`${styles.columnTitle}`}>NOME</th>
            <th className={`${styles.columnTitle}`}>TIPO</th>
            <th className={`${styles.columnTitle}`}>STATUS</th>
            <th className={`${styles.columnTitle}`}>PORTA</th>
            <th aria-label="Editar"/>
            <th aria-label="Excluir"/>
        </tr>
        </thead>
    )
}