import Header from "../../component/header";
import CreateForm from "./component/createForm";
import {useState} from "react";
import Loading from "../../component/loading";
import {useInfoBox} from "../../hook/InfoBoxHook.tsx";
import Info from "../../component/info";

export default function ServerCreate() {
    const [loading, setLoading] = useState<boolean>(false)
    const { infoBox, sendInfoBox } = useInfoBox();
    return (
        <>
            {infoBox !== null && <Info typeInfo={infoBox.type} title={infoBox.title} description={infoBox.description}/>}
            <Loading loading={loading}>
                <Header/>
                <CreateForm setLoading={setLoading} sendInfoBox={sendInfoBox}/>
            </Loading>
        </>
    )
}