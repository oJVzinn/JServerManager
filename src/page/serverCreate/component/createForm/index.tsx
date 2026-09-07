import styles from "./CreateForm.module.css"
import { useState } from "react";
import {useNavigate} from "react-router";
import type {InfoBoxEntity} from "../../../../entity/InfoBoxEntity"
import Info from "../../../../component/info";

type ServerCreateInfo = {
    name: string;
    port: number;
    serverType: string;
    serverPath: string;
    onlineMode: boolean;
}

export default function CreateForm() {
    const navigate = useNavigate();
    const [folderName, setFolderName] = useState("");
    const [folderPath, setFolderPath] = useState("");
    const [infoBox, setInfoBox] = useState<InfoBoxEntity | null>(null)
    const [serverCreateInfo, setServerCreateInfo] = useState<ServerCreateInfo>({
        name: "",
        port: 25565,
        onlineMode: true,
        serverPath: "",
        serverType: "BUKKIT"
    })

    async function handleFolderSelection() {
        const folder = await window.electronAPI.selectFolder();

        if (!folder) return;

        setFolderName(folder.name);
        setFolderPath(folder.path);
    }

    function processServerCreate() {
        if (serverCreateInfo.name === "") setInfoBox({title: "ERRO", description: "O título não pode ser vazio", type: "error"})
    }

    return (
        <div className={styles.CreateForm}>
            {infoBox !== null && <Info typeInfo={infoBox.type} title={infoBox.title} description={infoBox.description}/>}
            <span className={styles.title}>CRIAR UM NOVO SERVIDOR</span>
            <form className={styles.form}>
                <div className={styles.field}>
                    <span className={styles.titleField}>Nome do servidor</span>
                    <input className={styles.inputField} onChange={(event) => {
                        serverCreateInfo.name = event.currentTarget.value
                        setServerCreateInfo(serverCreateInfo)
                    }}/>
                </div>

                <div className={styles.field}>
                    <span className={styles.titleField}>Porta do servidor</span>
                    <input className={styles.inputField} type={"number"} defaultValue={25565} onChange={(event) => {
                        if (event.currentTarget.valueAsNumber <= 0) event.currentTarget.value = "25565"
                    }}/>
                </div>

                <div className={styles.field}>
                    <span className={styles.titleField}>Tipo do servidor</span>
                    <select className={styles.inputField}>
                        <option className={styles.option}>PROXY</option>
                        <option className={styles.option}>BUKKIT</option>
                    </select>
                </div>

                <div className={styles.field}>
                    <span className={styles.titleField}>Pasta do servidor</span>
                    <div className={styles.selectPath}>
                        <div className={styles.pathInfo}>
                            <button type="button" onClick={handleFolderSelection} className={styles.selectPathButton}>
                                Selecionar pasta
                            </button>
                            <span>{folderPath || folderName}</span>
                        </div>
                        <span>Caso não selecione nenhum, será criado automaticamente após a conclusão</span>
                    </div>
                </div>

                <div className={styles.field}>
                    <span className={styles.titleField}>Servidor Pirata?</span>
                    <input className={styles.checkbox} type={"checkbox"}/>
                </div>
            </form>
            <div className={styles.actions}>
                <button className={`${styles.actionButon} ${styles.finishCreation}`} onClick={processServerCreate}>FINALIZAR</button>
                <button className={`${styles.actionButon} ${styles.cancelCreation}`} onClick={()=> navigate("/")}>CANCELAR</button>
            </div>
        </div>
    )
}
