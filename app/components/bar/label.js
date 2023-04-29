import styles from "./bar.module.css"
export default function Label({ name }) {
    return (
        <span className={styles.label}>{name}</span>
    )
}