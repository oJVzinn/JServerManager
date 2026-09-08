import styles from "./ServerCreatorButton.module.css"
import {useNavigate} from "react-router";

export default function ServerCreatorButton() {
    const navigate = useNavigate();
    return (
        <button className={styles.ServerCreatorButton} onClick={() => {
            navigate("/serverCreate")
        }}>
            <img alt="addImage" src="./assets/add.svg" className={styles.creatorImg}/>
            <span className={styles.creatorName}>NOVO SERVIDOR</span>
        </button>
    )
}