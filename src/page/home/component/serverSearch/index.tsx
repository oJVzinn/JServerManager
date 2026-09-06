import styles from "./ServerSearch.module.css"

export default function ServerSearch() {
    return (
        <form className={styles.ServerSearch}>
            <input className={styles.searchInput}/>
            <button className={styles.searchButton}><img alt="searchImage" src="./assets/search.svg" className={styles.searchIcon}/></button>
        </form>
    )
}
