import { useDispatch } from 'react-redux'
import { setTime, resetTime, setPhase, pushTime } from '@redux/slices/sessions/operations'
import { setStatus } from '@redux/slices/timer'
import { useState } from "react"
import useEventListeners from './useEventListeners'
import { TimerStatus, JudgingPhase } from "@utils/enums.js"
import { useTimerData } from "@redux/accessors"
import { Penalty } from "@utils/enums.js"
import dev from "@utils/dev"
import { useSession } from '@redux/accessors'
import { v4 as uuidv4 } from 'uuid';
import { SCRAMBLE_UNAVAILABLE_MSG } from '@app/utils/constants'

export default function useTimer() {
    let { status } = useTimerData()
    let [sessionData] = useSession()
    const dispatch = useDispatch()

    const [primer, setPrimer] = useState(null);
    const [timer, setTimer] = useState(null);
    const [startTime, setStartTime] = useState(null);

    // Handles various situations where timer ends
    // Either actual timer stop, timer reset due to aborted time, and other scenarios
    let clearIntervals = () => {
        if (timer !== null) clearInterval(timer);
        if (primer !== null) clearInterval(primer);
    }

    let updateTime = () => {
        let elapsed = Date.now() - startTime
        dispatch(setTime(elapsed))
        return elapsed
    };

    let stopTimer = () => {
        clearIntervals();
        let elapsed = updateTime();

        // TODO: make this list exhaustive
        dispatch(pushTime({
            time: elapsed,
            date: Date.now(),
            penalty: Penalty.OK,
            scramble: sessionData.scramble === SCRAMBLE_UNAVAILABLE_MSG ? null : sessionData.scramble,
            uuid: uuidv4()
        }))
        dispatch(setStatus(TimerStatus.IDLE));
    }

    let timerTriggerActivated = (e) => {
        dev && console.warn(`TIMER TRIGGER ACTIVATED, status: ${status}`)
        switch (status) {
            case TimerStatus.IDLE:
                dispatch(setStatus(TimerStatus.UNREADY))
                setPrimer(setTimeout(() => {
                    dispatch(resetTime())
                    dispatch(setPhase(JudgingPhase.IDLE))
                    dispatch(setStatus(TimerStatus.READY));
                }, 400))
                break;
            case TimerStatus.TIMING:
                dispatch(setPhase(JudgingPhase.JUDGE))
                stopTimer()
                break;
        }
    }

    let timerTriggerDeactivated = (e) => {
        dev && console.warn(`TIMER TRIGGER DEACTIVATED, status: ${status}`)
        switch (status) {
            case TimerStatus.UNREADY:
                clearIntervals();
                dispatch(setStatus(TimerStatus.IDLE));
                break;
            case TimerStatus.READY:
                dispatch(setStatus(TimerStatus.TIMING));
                let time = Date.now();
                setTimer(setInterval(() => {
                    dispatch(setTime(Date.now() - time));
                }, 10))
                setStartTime(time);
                break;
        }
    }

    let escDown = (e) => stopTimer()

    let anyDown = (e) => {
        // Clear all timers, and reset to idle
        if (status === TimerStatus.TIMING) stopTimer()
    }

    let timerRef = useEventListeners(timerTriggerActivated, timerTriggerDeactivated, escDown, anyDown)

    return timerRef
}