import styles from "./titlebar.module.css"
import { FiChevronDown } from "react-icons/fi"
export default function Session() {
    return (
        <div className={styles.sessionWrapper}>
            <div className={styles.session}>
                <span className={styles.sessionName}>Session 1</span>
                <span className={styles.chevronDown}>
                    <FiChevronDown />
                </span>
            </div>
            <div className={styles.sessionDropdown}>
                Session 1 <br/>
                Session 2 <br/>
                Session 3 <br/>
            </div>
        </div>
    )
}