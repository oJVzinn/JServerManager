import styles from "./CreateForm.module.css"
import {useState} from "react";
import {useNavigate} from "react-router";
import type {InfoBoxEntity} from "../../../../entity/InfoBoxEntity.ts";

type ServerTypeCreateInfo = {
    name: string;
    path: string;
    jarFile: string;
    onlineModeKey: string;
    onlineModeFile: string;
    serverPortKey: string;
    serverPortFile: string;
    autoAcceptEula: boolean;
}

type Props = {
    setLoading: (isLoading: boolean) => void;
    sendInfoBox: (infoBox: InfoBoxEntity) => void;
}

export default function CreateForm({setLoading, sendInfoBox}: Props) {
    const navigate = useNavigate();
    const [folderPath, setFolderPath] = useState("");

    const [serverTypeCreateInfo, setServerTypeCreateInfo] = useState<ServerTypeCreateInfo>({
        name: "",
        path: "",
        jarFile: "",
        onlineModeFile: "",
        onlineModeKey: "",
        serverPortFile: "",
        serverPortKey: "",
        autoAcceptEula: false
    })

    async function handleFolderSelection() {
        const folder = await window.electronAPI.selectFolder();

        if (!folder) return;

        setFolderPath(folder.path);
        setServerTypeCreateInfo((current) => ({
            ...current,
            path: folder.path
        }));
    }

    async function processServerCreate() {
        if (serverTypeCreateInfo.name.trim() === "") {
            sendInfoBox({title: "ERRO", description: "O título não pode ser vazio", type: "error"})
            return
        }

        if (await window.electronAPI.findServerTypeByName(serverTypeCreateInfo.name) !== null) {
            sendInfoBox({title: "ERRO", description: "Já existe um repositório com esse mesmo nome", type: "error"})
            return
        }

        if (serverTypeCreateInfo.onlineModeFile.trim() !== "" && serverTypeCreateInfo.onlineModeKey.trim() === "") {
            sendInfoBox({title: "ERRO", description: "A chave do online mode não pode ser vazia com um arquivo configurado", type: "error"})
            return
        }

        if (serverTypeCreateInfo.serverPortFile.trim() === "" || serverTypeCreateInfo.serverPortKey.trim() === "")  {
            sendInfoBox({title: "ERRO", description: "É necessário realizar todas as configurações de porta", type: "error"})
            return
        }

        if (serverTypeCreateInfo.path.trim() === "") {
            sendInfoBox({title: "ERRO", description: "Não é possível prosseguir com a finalização da config sem configurar uma pasta", type: "error"})
            return
        }

        setLoading(true)

        window.electronAPI.processServerTypeCreate({
            id: 0,
            name: serverTypeCreateInfo.name.toUpperCase(),
            jarFile: serverTypeCreateInfo.jarFile,
            path: serverTypeCreateInfo.path,
            autoAcceptEula: serverTypeCreateInfo.autoAcceptEula,
            serverPortFile: serverTypeCreateInfo.serverPortFile,
            serverPortKey: serverTypeCreateInfo.serverPortKey,
            onlineModeFile: serverTypeCreateInfo.onlineModeFile,
            onlineModeKey: serverTypeCreateInfo.onlineModeKey
        }).then(() => {
            navigate("/serverType")
        }).catch(reason => {
            const description = reason instanceof Error
                ? reason.message
                : typeof reason === "string"
                    ? reason
                    : JSON.stringify(reason) ?? String(reason)
            sendInfoBox({title: "ERRO", description, type: "error"})
        }).finally(() => {
            setLoading(false)
        })
    }

    return (
        <div className={styles.CreateForm}>

            <span className={styles.title}>CRIAR UM NOVO TIPO DE SERVIDOR</span>
            <form className={styles.form}>
                <div className={styles.field}>
                    <span className={styles.titleField}>Nome do repositório</span>
                    <input className={styles.inputField} value={serverTypeCreateInfo.name} onChange={async (event) => {
                        const name = event.currentTarget.value.toUpperCase().trim();
                        setServerTypeCreateInfo((current) => ({
                            ...current,
                            name,
                        }));
                    }}/>
                </div>

                <div className={styles.field}>
                    <span className={styles.titleField}>Nome do jar do repositório</span>
                    <input className={styles.inputField} value={serverTypeCreateInfo.jarFile} onChange={async (event) => {
                        const jarFile = event.currentTarget.value.trim();
                        setServerTypeCreateInfo((current) => ({
                            ...current,
                            jarFile,
                        }));
                    }}/>
                </div>

                <div className={styles.field}>
                    <span className={styles.titleField}>Arquivo de config do online mode</span>
                    <input className={styles.inputField} value={serverTypeCreateInfo.onlineModeFile} onChange={async (event) => {
                        const onlineModeFile = event.currentTarget.value.trim();
                        setServerTypeCreateInfo((current) => ({
                            ...current,
                            onlineModeFile,
                        }));
                    }}/>
                </div>

                <div className={styles.field}>
                    <span className={styles.titleField}>Chave de config do online mode</span>
                    <input className={styles.inputField} value={serverTypeCreateInfo.onlineModeKey} onChange={async (event) => {
                        const onlineModeKey = event.currentTarget.value.trim();
                        setServerTypeCreateInfo((current) => ({
                            ...current,
                            onlineModeKey,
                        }));
                    }}/>
                </div>

                <div className={styles.field}>
                    <span className={styles.titleField}>Arquivo de config da porta</span>
                    <input className={styles.inputField} value={serverTypeCreateInfo.serverPortFile} onChange={async (event) => {
                        const serverPortFile = event.currentTarget.value.trim();
                        setServerTypeCreateInfo((current) => ({
                            ...current,
                            serverPortFile,
                        }));
                    }}/>
                </div>

                <div className={styles.field}>
                    <span className={styles.titleField}>Chave de config da porta</span>
                    <input className={styles.inputField} value={serverTypeCreateInfo.serverPortKey} onChange={async (event) => {
                        const serverPortKey = event.currentTarget.value.trim();
                        setServerTypeCreateInfo((current) => ({
                            ...current,
                            serverPortKey,
                        }));
                    }}/>
                </div>

                <div className={styles.field}>
                    <span className={styles.titleField}>Pasta do repositório</span>
                    <div className={styles.selectPath}>
                        <div className={styles.pathInfo}>
                            <button type="button" onClick={handleFolderSelection} className={styles.selectPathButton}>
                                Selecionar pasta
                            </button>
                            <span>{folderPath}</span>
                        </div>
                    </div>
                </div>

                <div className={styles.field}>
                    <span className={styles.titleField}>Auto accept da EULA</span>
                    <input className={styles.checkbox} type={"checkbox"} onChange={(event) => {
                        const autoAcceptEula = event.currentTarget.checked;
                        setServerTypeCreateInfo((current) => ({
                            ...current,
                            autoAcceptEula: autoAcceptEula
                        }));
                    }}/>
                </div>
            </form>
            <div className={styles.actions}>
                <button className={`${styles.actionButon} ${styles.finishCreation}`}
                        onClick={processServerCreate}>FINALIZAR
                </button>
                <button className={`${styles.actionButon} ${styles.cancelCreation}`}
                        onClick={() => navigate("/serverType")}>CANCELAR
                </button>
            </div>
        </div>
    )
}
