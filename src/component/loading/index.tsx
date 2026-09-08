import type { PropsWithChildren } from "react";
import styles from "./Loading.module.css";

type LoadingProps = PropsWithChildren<{
    loading: boolean;
    label?: string;
    className?: string;
}>;

export default function Loading({
    children,
    loading,
    label = "Carregando",
    className,
}: LoadingProps) {
    return (
        <div className={`${styles.container} ${className ?? ""}`} aria-busy={loading}>
            {children}
            {loading && (
                <div className={styles.overlay} role="status" aria-label={label}>
                    <span className={styles.spinner} aria-hidden="true" />
                </div>
            )}
        </div>
    );
}
