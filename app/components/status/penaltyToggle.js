import styles from "./status.module.css"
import classNames from "classnames"
export default function PenaltyToggle({ type, selected, onClick }) {
    return (
        <span className={classNames(styles.penaltyToggle, {
            [styles.selected]: selected
        })} onClick={onClick}>{type}</span>
    )
}