import Header from "../../component/header";
import CreateForm from "./component/createForm";
import {useState} from "react";
import Loading from "../../component/loading";

export default function ServerCreate() {
    const [loading, setLoading] = useState<boolean>(false)
    return (
        <>
            <Loading loading={loading}>
                <Header/>
                <CreateForm setLoading={setLoading}/>
            </Loading>
        </>
    )
}