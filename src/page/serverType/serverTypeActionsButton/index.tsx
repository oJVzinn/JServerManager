import styles from "./ServerActionButton.module.css"
import {useNavigate} from "react-router";
import type {InfoBoxEntity} from "../../../entity/InfoBoxEntity.ts";

type Props = {
    serverTypeSelected: Array<number>
    sendInfoBox: (infoBox: InfoBoxEntity) => void
    setLoading: (loading: boolean) => void
    onServersDeleted: () => void
}

export default function ServerActionButtons({serverTypeSelected, sendInfoBox, setLoading, onServersDeleted}: Props) {
    const navigate = useNavigate();

    async function processDelete() {
        setLoading(true);

        try {
            serverTypeSelected.map(async (serverID) => {
                await window.electronAPI.processServerDeleteByID(serverID)
            })

            onServersDeleted()

            sendInfoBox({
                title: "SUCESSO",
                description: "Todos os servidores selecionados foram excluídos",
                type: "sucess",
            });
        } catch (reason) {
            const description = reason instanceof Error
                ? reason.message
                : typeof reason === "string"
                    ? reason
                    : JSON.stringify(reason) ?? String(reason);

            sendInfoBox({
                title: "ERRO",
                description,
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <ul className={styles.ServerActionButtons}>
            <li>
                <button className={`${styles.actionButton} ${styles.createBg}`} onClick={() => {
                    navigate("/serverCreate")
                }}>
                    <img alt="addImage" src="./assets/add.svg" className={styles.actionImg}/>
                </button>
            </li>
            {
                serverTypeSelected.length > 0 && <li>
                    <button className={`${styles.actionButton} ${styles.deleteBg}`} onClick={processDelete}>
                        <img alt="deleteImage" src="./assets/delete.svg" className={styles.actionImg}/>
                    </button>
                </li>
            }
        </ul>
    )
}
