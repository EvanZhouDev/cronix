import styles from "./footer.module.css"
import { FiGitMerge } from "react-icons/fi"
import version from "@app/version.json"

export default function Version() {
    let versionString = `v${version.major}.${version.minor}.${version.patch}${version.suffix ? ("(" + version.suffix + ")") : ""}`
    return (
        <span className={styles.version}>
            <FiGitMerge size={20} />
            <span className={styles.name}>{versionString}</span>
        </span>
    )
}

