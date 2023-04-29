import styles from "./bar.module.css"
import classNames from "classnames"
import useNewScramble from "@app/utils/useNewScramble"
export default function dropdownToggle({ onClick, icon, name, selected }) {
    return (
        <span onClick={() => {
            onClick()
        }} className={classNames(styles.dropdownToggle, {
            [styles.dropdownToggleSelected]: selected
        })}>
            {icon}
            <span className={styles.name}>{name}</span>
        </span>
    )
}