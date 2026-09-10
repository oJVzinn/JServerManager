import { useEffect, useState } from "react";
import type {InfoBoxEntity} from "../entity/InfoBoxEntity.ts";

export function useInfoBox(duration = 3000) {
    const [infoBox, setInfoBox] = useState<InfoBoxEntity | null>(null);

    function sendInfoBox(newInfoBox: InfoBoxEntity) {
        setInfoBox(newInfoBox);
    }

    function clearInfoBox() {
        setInfoBox(null);
    }

    useEffect(() => {
        if (infoBox === null) return;

        const id = setTimeout(() => {
            setInfoBox(null);
        }, duration);

        return () => clearTimeout(id);
    }, [infoBox, duration]);

    return {
        infoBox,
        sendInfoBox,
        clearInfoBox,
    };
}