import Header from "../../component/header";
import Banner from "./component/banner";
import ServerList from "./component/serverList";
import {useState} from "react";
import Loading from "../../component/loading";

export default function Home() {
    const [keyWord, setKetWord] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)
    return (
        <>
            <Loading loading={loading}>
                <Header/>
                <Banner setKeyWord={setKetWord} keyWord={keyWord}/>
                <ServerList keyWord={keyWord} setLoading={setLoading}/>
            </Loading>
        </>
    )
}