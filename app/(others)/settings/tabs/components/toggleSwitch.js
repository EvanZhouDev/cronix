import styles from "../../settings.module.css";

export default function ToggleSwitch({ value, onToggle }) {
    return (
        <span className={styles.checkbox}>
            <input type="checkbox" checked={value} />
            <span className={styles.wrapper} onClick={(e) => { onToggle(e) }}>
                <span className={styles.knob}></span>
            </span>
        </span>
    )
}