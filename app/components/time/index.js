import useData from '@redux/accessors/useSession'
import useTimer from './src/useTimer'
import { useTimerData, useSession } from "@redux/accessors"
import styles from "./time.module.css"
import classNames from 'classnames'
import { TimerStatus } from '@app/utils/enums'
import calcTime from '@app/utils/calcTime'
export default function Time() {
    const timerRef = useTimer()

    const [sessionData] = useSession()
    const timerData = useTimerData()
    let derivedTime = calcTime(sessionData.time, sessionData.penalty)
    let useMilli = false
    if (useMilli) derivedTime = derivedTime.formattedTimePrecise
    else derivedTime = derivedTime.formattedTime
    return (
        <div>
            <div className={classNames(styles.time, {
                [styles.ready]: timerData.status === TimerStatus.READY,
                [styles.unready]: timerData.status === TimerStatus.UNREADY,
            })} ref={timerRef}>{"" + derivedTime}</div>
        </div>
    )
}