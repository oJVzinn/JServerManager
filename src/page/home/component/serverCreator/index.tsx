import styles from "./ServerCreator.module.css"
import {useNavigate} from "react-router";

export default function ServerCreator() {
    const navigate = useNavigate();
    return (
        <button className={styles.ServerCreator} onClick={() => {
            navigate("/serverCreate")
        }}>
            <img alt="addImage" src="./assets/add.svg" className={styles.creatorImg}/>
            <span className={styles.creatorName}>NOVO SERVIDOR</span>
        </button>
    )
}