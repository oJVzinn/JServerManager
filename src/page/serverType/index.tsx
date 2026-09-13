import Header from "../../component/header";
import {useState} from "react";
import {useInfoBox} from "../../hook/InfoBoxHook.tsx";
import Banner from "./banner";
import Info from "../../component/info";
import Loading from "../../component/loading";
import type {ServerEntity} from "../../entity/ServerEntity.ts";
import ServerTypeList from "./serverTypeList";

export default function ServerType() {
    const [keyWord, setKetWord] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const {infoBox, sendInfoBox} = useInfoBox();
    const [servers, setServers] = useState<Array<ServerEntity> | null>(null)
    const [serversSelected, setServersSelected] = useState<Array<number>>([])
    const [serversReloadKey, setServersReloadKey] = useState(0)

    return (
        <>
            {infoBox !== null && <Info typeInfo={infoBox.type} title={infoBox.title} description={infoBox.description}/>}
            <Loading loading={loading}>
                <Header/>
                <Banner sendInfoBox={sendInfoBox} setLoading={setLoading} keyWord={keyWord} setKeyWord={setKetWord} serversSelected={serversSelected} onServersDeleted={() => {
                    setServersSelected([])
                    setServersReloadKey((current) => current + 1)
                }}/>
                <ServerTypeList keyWord={keyWord} setLoading={setLoading} reloadKey={serversReloadKey} serversSelected={serversSelected}
                            sendInfoBox={sendInfoBox} setServers={setServers}
                            servers={servers} setServersSelected={setServersSelected}
                />
            </Loading>
        </>
    )
}