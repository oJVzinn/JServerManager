import styles from "./Header.module.css"
import {Link} from "react-router";

export default function Header() {
    return (
        <header className={styles.Header}>
            <nav className={styles.manu}>
                <span className={styles.title}>JServerManager - 0.1 ALPHA</span>
                <ul className={styles.itens}>
                    <li>
                        <Link to="/" className={styles.item}><span>Servidores</span></Link>
                    </li>

                    <li>
                        <Link to="/" className={styles.item}><span>Databases</span></Link>
                    </li>

                    <li>
                        <Link to="/" className={styles.item}><span>Documentação</span></Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}