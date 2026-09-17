import Header from "../../component/header";
import {useState} from "react";
import {useInfoBox} from "../../hook/InfoBoxHook.tsx";
import Banner from "./banner";
import Info from "../../component/info";
import Loading from "../../component/loading";
import ServerTypeList from "./serverTypeList";
import type {ServerTypeEntity} from "../../entity/ServerTypeEntity.ts";

export default function ServerType() {
    const [keyWord, setKetWord] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const {infoBox, sendInfoBox} = useInfoBox();
    const [serverTypes, setServerTypes] = useState<Array<ServerTypeEntity> | null>(null)
    const [serverTypeSelected, setServerTypeSelected] = useState<Array<number>>([])
    const [reloadedKey, setReloadedKey] = useState(0)

    return (
        <>
            {infoBox !== null && <Info typeInfo={infoBox.type} title={infoBox.title} description={infoBox.description}/>}
            <Loading loading={loading}>
                <Header/>
                <Banner sendInfoBox={sendInfoBox} setLoading={setLoading} keyWord={keyWord} setKeyWord={setKetWord} serverTypeSelected={serverTypeSelected} onServersDeleted={() => {
                    setServerTypeSelected([])
                    setReloadedKey((current) => current + 1)
                }}/>
                <ServerTypeList keyWord={keyWord} setLoading={setLoading} reloadKey={reloadedKey} serverTypeSelected={serverTypeSelected}
                            sendInfoBox={sendInfoBox} setServerTypes={setServerTypes}
                            serverTypes={serverTypes} setServerTypesSelected={setServerTypeSelected}
                />
            </Loading>
        </>
    )
}