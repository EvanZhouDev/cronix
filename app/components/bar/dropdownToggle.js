import styles from "./bar.module.css"
import classNames from "classnames"
export default function dropdownToggle({ onClick, icon, name, selected }) {
    return (
        <span onClick={() => {
            if (typeof onClick === "function") onClick()
        }} className={classNames(styles.dropdownToggle, {
            [styles.dropdownToggleSelected]: selected
        })}>
            {icon}
            <span className={styles.name}>{name}</span>
        </span>
    )
}