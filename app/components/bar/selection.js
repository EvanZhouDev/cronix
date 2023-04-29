"use client"
import styles from "./bar.module.css"

export default function Selection({ children }) {
    return (
        <div className={styles.selection}>
            {children}
        </div>
    )
}