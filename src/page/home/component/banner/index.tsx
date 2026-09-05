import styles from "./Banner.module.css"
import ServerCreator from "../serverCreator";
import ServerSearch from "../serverSearch";

export default function Banner() {
    return (
        <div className={styles.Banner}>
            <ServerCreator/>
            <ServerSearch/>
        </div>
    )
}