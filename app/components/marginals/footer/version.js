import styles from "./footer.module.css"
import { FiGitMerge } from "react-icons/fi"

export default function Version() {
    return (
        <span className={styles.version}>
            <FiGitMerge size={20} />
            <span className={styles.name}>0.2.1</span>
        </span>
    )
}

