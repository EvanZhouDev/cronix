import styles from "./ministats.module.css"
import useData from '@app/redux/accessors/useSessionData'
import injectAverages from "@app/utils/injectAverages"
export default function Ministats() {
    let [{ list }] = useData()
    let newList = injectAverages(list)
    return (
        <div>
            {/* use styles.pb for PB colors! */}
            <span className={styles.stats}>mo3: {newList.length ? newList[newList.length - 1].mo3 : "..."}</span>
            <span className={styles.stats}>ao5: {newList.length ? newList[newList.length - 1].ao5 : "..."}</span>
            <span className={styles.stats}>ao12: {newList.length ? newList[newList.length - 1].ao12 : "..."}</span>
        </div>
    )
}