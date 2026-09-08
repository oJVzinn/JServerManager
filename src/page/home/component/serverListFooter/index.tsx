import styles from "./ServerListFooter.module.css";

type Props = {
    currentPage: number;
    totalServers: number;
    pageSize: number;
    setCurrentPage: (currentPage: number) => void
}

export default function ServerListFooter( {currentPage, totalServers, pageSize, setCurrentPage}: Props ) {
    const totalPages = Math.max(1, Math.ceil(totalServers / pageSize));
    const paginationStart = Math.floor((currentPage - 1) / 3) * 3 + 1;
    const paginationEnd = Math.min(paginationStart + 2, totalPages);

    function updateToPreviousPage() {
        if (currentPage <= 1) return
        setCurrentPage(currentPage - 1)
    }

    function updateToNextPage() {
        if (currentPage >= totalPages) return
        setCurrentPage(currentPage + 1)
    }

    return (
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
    )
}