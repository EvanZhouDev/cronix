import styles from "../widgets.module.css"
export default function WidgetText({ children }) {
    return (
        <div className={styles.widgetText}>
            {children}
        </div>
    )
}