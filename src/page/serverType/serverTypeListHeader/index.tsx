import styles from "./ServerListHeader.module.css";
import serverListStyles from "../serverTypeList/ServerList.module.css"

type Props = {
    allSelect: boolean
    setAllSelect: (allSelect: boolean) => void
}

export default function ServerTypeListHeader( {allSelect, setAllSelect}: Props) {
    return (
        <thead>
        <tr>
            <th><input type={"checkbox"} className={serverListStyles.checkbox} checked={allSelect} onChange={(event) => {
                const checked = event.currentTarget.checked
                setAllSelect(checked)
            }}/></th>
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