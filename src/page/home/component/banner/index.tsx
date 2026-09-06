import styles from "./Banner.module.css"
import ServerCreator from "../serverCreator";
import ServerSearch from "../serverSearch";

type Props = {
    keyWord: string;
    setKeyWord: (value: string) => void
}

export default function Banner( {keyWord, setKeyWord}: Props ) {
    return (
        <div className={styles.Banner}>
            <ServerCreator/>
            <ServerSearch keyWord={keyWord} setKeyWord={setKeyWord}/>
        </div>
    )
}