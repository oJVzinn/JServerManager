import styles from "./ServerCreator.module.css"

export default function ServerCreator() {
    return (
        <button className={styles.ServerCreator}>
            <img alt="addImage" src="./assets/add.svg" className={styles.creatorImg}/>
            <span className={styles.creatorName}>Novo servidor</span>
        </button>
    )
}