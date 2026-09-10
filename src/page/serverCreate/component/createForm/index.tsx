import styles from "./CreateForm.module.css"
import {useState} from "react";
import {useNavigate} from "react-router";
import Info from "../../../../component/info";
import {useInfoBox} from "../../../../hook/InfoBoxHook.tsx";

type ServerCreateInfo = {
    name: string;
    port: number;
    serverType: string;
    serverPath: string;
    onlineMode: boolean;
}

type Props = {
    setLoading: (isLoading: boolean) => void;
}

export default function CreateForm( {setLoading}: Props ) {
    const navigate = useNavigate();
    const [folderPath, setFolderPath] = useState("");
    const { infoBox, sendInfoBox } = useInfoBox();
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

        setFolderPath(folder.path);
        setServerCreateInfo((current) => ({
            ...current,
            serverPath: folder.path
        }));
    }

    async function processServerCreate() {
        if (serverCreateInfo.name.trim() === "") {
            sendInfoBox({title: "ERRO", description: "O título não pode ser vazio", type: "error"})
            return
        }

        if (await window.electronAPI.findServerByPort(serverCreateInfo.port) !== null) {
            sendInfoBox({title: "ERRO", description: "Já existe um servidor criado com essa porta", type: "error"})
            return
        }

        if (await window.electronAPI.findServerByPath(serverCreateInfo.serverPath) !== null) {
            sendInfoBox({title: "ERRO", description: "Já existe um servidor criado com essa pasta raiz", type: "error"})
            return
        }

        setLoading(true)

        window.electronAPI.processServerCreate({
            id: 0,
            name: serverCreateInfo.name,
            offlineMode: serverCreateInfo.onlineMode,
            port: serverCreateInfo.port,
            type: serverCreateInfo.serverType,
            path: serverCreateInfo.serverPath,
            stats: ""
        }).then(()=> {
            navigate("/")
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
            {infoBox !== null && <Info typeInfo={infoBox.type} title={infoBox.title} description={infoBox.description}/>}
            <span className={styles.title}>CRIAR UM NOVO SERVIDOR</span>
            <form className={styles.form}>
                <div className={styles.field}>
                    <span className={styles.titleField}>Nome do servidor</span>
                    <input className={styles.inputField} onChange={async (event) => {
                        const name = event.currentTarget.value.trim();
                        const basePath = await window.electronAPI.findDefaultFolderByService("ServerConfig");
                        const finalPath = basePath ? `${basePath}/${name.trim()}` : "";

                        setServerCreateInfo((current) => ({
                            ...current,
                            name,
                            serverPath: finalPath,
                        }));
                    }}/>
                </div>

                <div className={styles.field}>
                    <span className={styles.titleField}>Porta do servidor</span>
                    <input className={styles.inputField} type="number" value={serverCreateInfo.port}
                           min={1} onChange={(event) => {
                            const value = event.currentTarget.valueAsNumber;
                            setServerCreateInfo((current) => ({
                                ...current,
                                port: Number.isNaN(value) || value <= 0 ? 25565 : value,
                            }));
                        }}
                    />
                </div>

                <div className={styles.field}>
                    <span className={styles.titleField}>Tipo do servidor</span>
                    <select className={styles.inputField} onChange={(event) => {
                        const serverType = event.currentTarget.value;
                        setServerCreateInfo((current) => ({
                            ...current,
                            serverType,
                        }));
                    }}>
                        <option value="PROXY" className={styles.option}>PROXY</option>
                        <option value="BUKKIT" className={styles.option}>BUKKIT</option>
                    </select>
                </div>

                <div className={styles.field}>
                    <span className={styles.titleField}>Pasta do servidor</span>
                    <div className={styles.selectPath}>
                        <div className={styles.pathInfo}>
                            <button type="button" onClick={handleFolderSelection} className={styles.selectPathButton}>
                                Selecionar pasta
                            </button>
                            <span>{folderPath}</span>
                        </div>
                        <span>Caso não selecione nenhum, será criado automaticamente com base no nome após a conclusão</span>
                    </div>
                </div>

                <div className={styles.field}>
                    <span className={styles.titleField}>Servidor Pirata?</span>
                    <input className={styles.checkbox} type={"checkbox"} onChange={(event) => {
                        const onlineMode = event.currentTarget.checked;
                        setServerCreateInfo((current) => ({
                            ...current,
                            onlineMode: !onlineMode
                        }));
                    }}/>
                </div>
            </form>
            <div className={styles.actions}>
                <button className={`${styles.actionButon} ${styles.finishCreation}`} onClick={processServerCreate}>FINALIZAR</button>
                <button className={`${styles.actionButon} ${styles.cancelCreation}`} onClick={()=> navigate("/")}>CANCELAR</button>
            </div>
        </div>
    )
}
