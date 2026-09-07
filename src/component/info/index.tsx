import styles from "./Info.module.css"

type Props = {
    typeInfo: string;
    title: string;
    description: string
}

export default function Info( {typeInfo, title, description}: Props ) {
    return (
        <div className={`${styles.Info} 
        ${typeInfo === "error" ? styles.infoNegative : typeInfo === "warning" ? styles.infoWarning : styles.infoPositive}`
        }>
            <img src="./assets/info.svg" alt="infoImg" className={styles.infoImg}/>
            <ul className={styles.infos}>
                <li className={styles.infoTitle}>{title}</li>
                <li className={styles.infoDesc}>{description}</li>
            </ul>
        </div>
    )
}