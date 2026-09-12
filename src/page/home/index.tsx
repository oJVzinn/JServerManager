import Header from "../../component/header";
import Banner from "./component/banner";
import ServerList from "./component/serverList";
import {useState} from "react";
import Loading from "../../component/loading";
import Info from "../../component/info";
import {useInfoBox} from "../../hook/InfoBoxHook.tsx";
import type {ServerEntity} from "../../entity/ServerEntity.ts";

export default function Home() {
    const [keyWord, setKetWord] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const { infoBox, sendInfoBox } = useInfoBox();
    const [servers, setServers] = useState<Array<ServerEntity> | null>(null)
    const [serversSelected, setServersSelected] = useState<Array<number>>([])
    const [serversReloadKey, setServersReloadKey] = useState(0)

    return (
        <>
            {infoBox !== null && <Info typeInfo={infoBox.type} title={infoBox.title} description={infoBox.description}/>}
            <Loading loading={loading}>
                <Header/>
                <Banner setKeyWord={setKetWord} keyWord={keyWord} serversSelected={serversSelected} setLoading={setLoading} sendInfoBox={sendInfoBox}
                        onServersDeleted={() => {
                            setServersSelected([])
                            setServersReloadKey((current) => current + 1)
                        }}/>
                <ServerList keyWord={keyWord} setLoading={setLoading} reloadKey={serversReloadKey} serversSelected={serversSelected}
                            sendInfoBox={sendInfoBox} setServers={setServers}
                            servers={servers} setServersSelected={setServersSelected}
                />
            </Loading>
        </>
    )
}
