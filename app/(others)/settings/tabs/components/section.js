import classNames from "classnames";
import styles from "../../settings.module.css";
import useIsMobile from "@app/utils/useIsMobile";

export default function Section({ title, description, input }) {
    return (
        <div className={classNames(styles.settingsSection, { [styles.settingsSectionMobile]: useIsMobile() })}>
            <div className={styles.settingsLabel}>
                {title}
                <br />
                <span className={styles.settingDescription}>{description}</span>
            </div>
            {input}
        </div>
    )
}