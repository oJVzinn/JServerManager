import styles from "./Banner.module.css"
import ServerCreatorButton from "../serverCreatorButton";
import ServerSearch from "../serverSearch";

type Props = {
    keyWord: string;
    setKeyWord: (value: string) => void
}

export default function Banner( {keyWord, setKeyWord}: Props ) {
    return (
        <div className={styles.Banner}>
            <ServerCreatorButton/>
            <ServerSearch keyWord={keyWord} setKeyWord={setKeyWord}/>
        </div>
    )
}