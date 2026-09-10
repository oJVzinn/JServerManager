import Header from "../../component/header";
import Banner from "./component/banner";
import ServerList from "./component/serverList";
import {useState} from "react";
import Loading from "../../component/loading";
import Info from "../../component/info";
import {useInfoBox} from "../../hook/InfoBoxHook.tsx";

export default function Home() {
    const [keyWord, setKetWord] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    const { infoBox, sendInfoBox } = useInfoBox();
    return (
        <>
            {infoBox !== null && <Info typeInfo={infoBox.type} title={infoBox.title} description={infoBox.description}/>}
            <Loading loading={loading}>
                <Header/>
                <Banner setKeyWord={setKetWord} keyWord={keyWord}/>
                <ServerList keyWord={keyWord} setLoading={setLoading} sendInfoBox={sendInfoBox}/>
            </Loading>
        </>
    )
}