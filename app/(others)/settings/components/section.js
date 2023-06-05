import styles from '../settings.module.css';

export default function Section({ title, description, input }) {
    return (
        <div className={styles.settingsSection}>
            <div className={styles.settingsLabel}>
                {title}
                <br />
                <span className={styles.settingDescription}>{description}</span>
            </div>
            {input}
        </div>
    )
}