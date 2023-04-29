import styles from "./bar.module.css"
import classNames from "classnames"
import useNewScramble from "@app/utils/useNewScramble"
export default function Toggle({ onClick, icon, name, selected, updateEvents }) {
    let generateNewScramble = useNewScramble()
    return (
        <span onClick={() => {
            onClick()
        }} className={classNames(styles.toggle, {
            [styles.selected]: selected
        })}>
            {icon}
            <span className={styles.name}>{name}</span>
        </span>
    )
}