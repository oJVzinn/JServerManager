import styles from "./ServerList.module.css"
import ServerListInfo from "../serverListInfo";
import {useEffect, useState} from "react";
import type {ServerEntity} from "../../../../entity/ServerEntity.ts";

export default function ServerList() {
    const pageSize = 11;
    const [server, setServers] = useState<Array<ServerEntity> | null>(null)
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalServers, setTotalServer] = useState<number>(0)
    const totalPages = Math.max(1, Math.ceil(totalServers / pageSize));
    const paginationStart = Math.floor((currentPage - 1) / 3) * 3 + 1;
    const paginationEnd = Math.min(paginationStart + 2, totalPages);

    useEffect(() => {
        setServers(null);

        Promise.all([
            window.electronAPI.countServers(),
            window.electronAPI.listServers(pageSize, currentPage),
        ]).then(([total, servers]) => {
            setTotalServer(total);
            setServers(servers);
        });
    }, [currentPage])

    function updateToPreviousPage() {
        if (currentPage <= 1) return
        setCurrentPage(currentPage - 1)
    }

    function updateToNextPage() {
        if (currentPage >= totalPages) return
        setCurrentPage(currentPage + 1)
    }

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
                {
                    server === null ?
                        <tr>
                            <td colSpan={8}>Carregando...</td>
                        </tr> :
                        server.length === 0 ?
                            <tr>
                                <td colSpan={8}>Nenhum item encontrado...</td>
                            </tr> :
                            server.map((value, index) => {
                                return <ServerListInfo id={value.id} name={value.name} type={value.type}
                                                       port={value.port}
                                                       status={value.offlineMode ? "OFFLINE" : "ONLINE"}
                                                       position={index} key={value.id}/>
                            })
                }
                </tbody>

                <tfoot>
                <tr>
                    <td colSpan={8}>
                        <div className={styles.footerPagination}>
                            {
                                currentPage !== 1 &&
                                <button className={styles.buttonPagination} onClick={() => updateToPreviousPage()}>
                                    <img src="./assets/arrowBack.svg" alt="backImg" className={styles.paginationImg}/>
                                </button>
                            }

                            <ul className={styles.paginationList}>
                                {
                                    Array.from(
                                        {length: paginationEnd - paginationStart + 1},
                                        (_, index) => paginationStart + index,
                                    ).map((page) => (
                                        <li key={page}>
                                            <button
                                                className={`${styles.buttonPagination} ${page === currentPage ? styles.activePage : ""}`}
                                                onClick={() => setCurrentPage(page)}
                                                disabled={page === currentPage}
                                            >
                                                {page}
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>

                            {
                                currentPage !== totalPages &&
                                <button className={styles.buttonPagination} onClick={() => updateToNextPage()}>
                                    <img src="./assets/arrowForward.svg" alt="forwardImg"
                                         className={styles.paginationImg}/>
                                </button>
                            }
                        </div>
                    </td>
                </tr>
                </tfoot>
            </table>
        </div>
    )
}
