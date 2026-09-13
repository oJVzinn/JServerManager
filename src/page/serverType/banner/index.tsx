import styles from "./Banner.module.css"
import ServerActionButtons from "../serverTypeActionsButton";
import type {InfoBoxEntity} from "../../../entity/InfoBoxEntity.ts";
import Search from "../../../component/search";

type Props = {
    serversSelected: Array<number>;
    keyWord: string;
    setKeyWord: (value: string) => void
    setLoading: (loading: boolean)=> void
    sendInfoBox: (infoBox: InfoBoxEntity) => void
    onServersDeleted: () => void
}

export default function Banner( {serversSelected, keyWord, setKeyWord, sendInfoBox, setLoading, onServersDeleted}: Props ) {
    return (
        <div className={styles.Banner}>
            <ServerActionButtons serversSelected={serversSelected} sendInfoBox={sendInfoBox} setLoading={setLoading} onServersDeleted={onServersDeleted}/>
            <Search keyWord={keyWord} setKeyWord={setKeyWord}/>
        </div>
    )
}
