import styles from "./Banner.module.css"
import ServerSearch from "../serverSearch";
import ServerActionButtons from "../serverActionsButton";
import type {InfoBoxEntity} from "../../../../entity/InfoBoxEntity.ts";

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
            <ServerSearch keyWord={keyWord} setKeyWord={setKeyWord}/>
        </div>
    )
}
