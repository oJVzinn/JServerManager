import styles from "./ServerSearch.module.css"

type Props = {
    keyWord: string;
    setKeyWord: (value: string) => void
}

export default function ServerSearch( {keyWord, setKeyWord}: Props ) {
    function updateKeyword() {
        const input = document.getElementById("keywordSearch") as HTMLInputElement | null;
        setKeyWord(input?.value ?? "")
    }

    return (
        <form
            className={styles.ServerSearch}
            onSubmit={(event) => {
                event.preventDefault();
                updateKeyword();
            }}
        >
            <input className={styles.searchInput} id="keywordSearch" defaultValue={keyWord}/>
            <button className={styles.searchButton} type="submit">
                <img alt="searchImage" src="./assets/search.svg" className={styles.searchIcon}/>
            </button>
        </form>
    )
}
