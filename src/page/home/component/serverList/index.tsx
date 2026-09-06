import styles from "./ServerList.module.css"
import ServerListInfo from "../serverListInfo";

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
                    <col/>
                    <col className={styles.buttonColumn}/>
                    <col className={styles.buttonColumn}/>
                </colgroup>
                <thead>
                <tr>
                    <th><input type={"checkbox"}/></th>
                    <th className={styles.columnTitle}>ID</th>
                    <th className={`${styles.columnTitle}`}>NOME</th>
                    <th className={`${styles.columnTitle}`}>TIPO</th>
                    <th className={`${styles.columnTitle}`}>STATUS</th>
                    <th className={`${styles.columnTitle}`}>PORTA</th>
                    <th aria-label="Editar"/>
                    <th aria-label="Excluir"/>
                </tr>
                </thead>

                <tbody>
                <ServerListInfo position={1} id={1} name={"Proxy 01"} type={"PROXY"} status={"RUNNING"} port={25565}/>
                <ServerListInfo position={2} id={1} name={"Lobby 01"} type={"BUKKIT"} status={"RUNNING"} port={25565}/>
                <ServerListInfo position={3} id={1} name={"Lobby 02"} type={"BUKKIT"} status={"STOPPED"} port={25565}/>
                <ServerListInfo position={4} id={1} name={"BedWars Lobby 01"} type={"BUKKIT"} status={"RUNNING"} port={25565}/>
                <ServerListInfo position={5} id={1} name={"BedWars Lobby 02"} type={"BUKKIT"} status={"STOPPED"} port={25565}/>
                <ServerListInfo position={6} id={1} name={"BedWars Solo 01"} type={"BUKKIT"} status={"RUNNING"} port={25565}/>
                <ServerListInfo position={7} id={1} name={"BedWars Solo 02"} type={"BUKKIT"} status={"STOPPED"} port={25565}/>
                <ServerListInfo position={8} id={1} name={"BedWars Solo 03"} type={"BUKKIT"} status={"STOPPED"} port={25565}/>
                <ServerListInfo position={9} id={1} name={"BedWars Duplas 01"} type={"BUKKIT"} status={"RUNNING"} port={25565}/>
                <ServerListInfo position={10} id={1} name={"BedWars Duplas 02"} type={"BUKKIT"} status={"STOPPED"} port={25565}/>
                <ServerListInfo position={11} id={1} name={"BedWars Duplas 03"} type={"BUKKIT"} status={"STOPPED"} port={25565}/>
                </tbody>

                <tfoot>
                <tr>
                    <td colSpan={7}>
                        <div className={styles.footerPagination} >
                            <button className={styles.buttonPagination}>
                                <img src="/assets/arrowBack.svg" alt="backImg" className={styles.paginationImg}/>
                            </button>
                            <ul className={styles.paginationList}>
                                <li>
                                    <button className={styles.buttonPagination}>1</button>
                                </li>
                            </ul>
                            <button className={styles.buttonPagination}>
                                <img src="/assets/arrowForward.svg" alt="forwardImg" className={styles.paginationImg}/>
                            </button>
                        </div>
                    </td>
                </tr>
                </tfoot>
            </table>
        </div>
    )
}
