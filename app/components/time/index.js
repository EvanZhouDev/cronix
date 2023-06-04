import useData from '@app/redux/accessors/useSessionData'
import useTimer from './src/useTimer'
import { useTimerData, useSession } from "@redux/accessors"
import styles from "./time.module.css"
import classNames from 'classnames'
import { TimerStatus } from '@app/utils/enums'
import calcTime from '@app/utils/calcTime'
import { useState } from 'react'
import ConfettiExplosion from 'react-confetti-explosion'
export default function Time() {
    const [isExploding, setIsExploding] = useState(false);
    const timerRef = useTimer(setIsExploding, isExploding)

    const [sessionData] = useSession()
    const timerData = useTimerData()
    let derivedTime = calcTime(sessionData.time, sessionData.penalty)
    let useMilli = false
    if (useMilli) derivedTime = derivedTime.formattedTimePrecise
    else derivedTime = derivedTime.formattedTime
    return (
        <div>
            <div className={styles.confetti}>
                {isExploding && <ConfettiExplosion {...{
                    force: 0.4,
                    duration: 2200,
                    particleCount: 30,
                    width: 1000,
                }} />}
            </div>
            <div className={classNames(styles.time, {
                [styles.ready]: timerData.status === TimerStatus.READY,
                [styles.unready]: timerData.status === TimerStatus.UNREADY,
            })} ref={timerRef}>
                {"" + derivedTime}
            </div>
        </div>
    )
}