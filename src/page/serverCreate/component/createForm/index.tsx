import styles from "./CreateForm.module.css"
import { useState } from "react";
import {useNavigate} from "react-router";

export default function CreateForm() {
    const navigate = useNavigate();
    const [folderName, setFolderName] = useState("");
    const [folderPath, setFolderPath] = useState("");

    async function handleFolderSelection() {
        const folder = await window.electronAPI.selectFolder();

        if (!folder) return;

        setFolderName(folder.name);
        setFolderPath(folder.path);
    }

    function processServerCreate() {

    }

    return (
        <div className={styles.CreateForm}>
            <span className={styles.title}>CRIAR UM NOVO SERVIDOR</span>
            <form className={styles.form}>
                <div>
                    <span>Nome do servidor</span>
                    <input/>
                </div>

                <div>
                    <span>Porta do servidor</span>
                    <input type={"number"}/>
                </div>

                <div>
                    <span>Tipo do servidor</span>
                    <input/>
                </div>

                <div>
                    <span>Pasta do servidor</span>
                    <button type="button" onClick={handleFolderSelection}>
                        Selecionar pasta
                    </button>
                    <span>{folderPath || folderName}</span>
                </div>

                <div>
                    <span>Servidor Pirata?</span>
                    <input type={"button"}/>
                </div>
            </form>
            <div className={styles.actions}>
                <button className={`${styles.actionButon} ${styles.finishCreation}`} onClick={()=> processServerCreate()}>FINALIZAR</button>
                <button className={`${styles.actionButon} ${styles.cancelCreation}`} onClick={()=> navigate("/")}>CANCELAR</button>
            </div>
        </div>
    )
}
