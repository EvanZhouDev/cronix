import styles from "./ministats.module.css"
import useData from '@app/redux/accessors/useSessionData'
import injectAverages from "@app/utils/injectAverages"
import useIsMobile from "@app/utils/useIsMobile"
import classNames from "classnames"
export default function Ministats() {
    let isMobile = useIsMobile();
    let [{ list }] = useData();
    let newList = injectAverages(list)
    return (
        <div className={styles.statsContainer}>
            <span className={classNames(styles.stats, {[styles.statsMobile]: isMobile})}>mo3: {newList.length ? newList[newList.length - 1].mo3 : "..."}</span>
            <span className={classNames(styles.stats, {[styles.statsMobile]: isMobile})}>ao5: {newList.length ? newList[newList.length - 1].ao5 : "..."}</span>
            <span className={classNames(styles.stats, {[styles.statsMobile]: isMobile})}>ao12: {newList.length ? newList[newList.length - 1].ao12 : "..."}</span>
        </div>
    )
}