import styles from "./ServerList.module.css"

export default function ServerList() {
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
                <thead>
                <tr className={styles.tableRow}>
                    <th className={`${styles.tableCell} ${styles.checkboxCell}`} scope="col"><input type={"checkbox"}/></th>
                    <th className={`${styles.tableCell} ${styles.idCell}`} scope="col">ID</th>
                    <th className={styles.tableCell} scope="col">NOME</th>
                    <th className={styles.tableCell} scope="col">TIPO</th>
                    <th className={styles.tableCell} scope="col">STATUS</th>
                    <th className={styles.buttonCell} scope="col" aria-label="Editar" />
                    <th className={styles.buttonCell} scope="col" aria-label="Excluir" />
                </tr>
                </thead>

                <tbody>
                <tr className={styles.tableRow}>
                    <td className={`${styles.tableCell} ${styles.checkboxCell}`}><input type={"checkbox"}/></td>
                    <td className={`${styles.tableCell} ${styles.idCell}`}>1</td>
                    <td className={styles.tableCell}>Proxy</td>
                    <td className={styles.tableCell}>PROXY</td>
                    <td className={styles.tableCell}>LIGADO</td>
                    <td className={styles.buttonCell}><img className={styles.buttonIcon} alt="Editar servidor" src="/assets/edit.svg"/></td>
                    <td className={styles.buttonCell}><img className={styles.buttonIcon} alt="Excluir servidor" src="/assets/delete.svg"/></td>
                </tr>
                </tbody>

                <tfoot>
                <tr className={styles.tableRow}>
                    <td className={styles.tableCell} colSpan={7}>1 2 3 ...</td>
                </tr>
                </tfoot>
            </table>
        </div>
    )
}
