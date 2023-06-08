import styles from "./bar.module.css"
import classNames from "classnames"
export default function Toggle({ onClick, icon, name, selected, updateEvents }) {
    return (
        <span onClick={() => {
            if (typeof onClick === "function") onClick()
        }} className={classNames(styles.toggle, {
            [styles.selected]: selected
        })}>
            {icon}
            <span className={styles.name}>{name}</span>
        </span>
    )
}