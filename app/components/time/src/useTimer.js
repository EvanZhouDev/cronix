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
import { SCRAMBLE_UNAVAILABLE_MSG, SOLVING_MESSAGE } from '@app/utils/constants'
import { setPenalty } from '@redux/slices/sessions/operations'
import useNewScramble from '@app/utils/useNewScramble'
import { message } from '@app/utils/notify'
import calcTime from '@app/utils/calcTime'
import useSettings from '@redux/accessors/useSettings'

export default function useTimer(setIsExploding) {
    let settings = useSettings();
    let { status } = useTimerData()
    let [sessionData] = useSession()
    const dispatch = useDispatch()
    let genScramble = useNewScramble()

    const [primer, setPrimer] = useState(null);
    const [timer, setTimer] = useState(null);
    const [startTime, setStartTime] = useState(null);
    const [confettiTimeout, setConfettiTimeout] = useState(null);

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

    let stopTimer = (penalty = Penalty.OK) => {
        clearIntervals();
        let elapsed = updateTime();
        dispatch(pushTime({
            time: elapsed,
            date: Date.now(),
            penalty: penalty,
            scramble: sessionData.scramble === SCRAMBLE_UNAVAILABLE_MSG ? null : sessionData.scramble,
            uuid: uuidv4()
        }))
        if (Math.min(...sessionData.list.map(x => x.derived.mathematicalTime)) > elapsed) {
            message(`New single PB: ${calcTime(elapsed).formattedTime}`)
            if (settings.useConfetti) {
                setIsExploding(true)
                clearTimeout(confettiTimeout)
                setConfettiTimeout(
                    setTimeout(() => {
                        setIsExploding(false)
                    }, 2200)
                )
            }
        }

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
                    dispatch(setPenalty(Penalty.OK));
                }, settings.holdTime))
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
                genScramble(undefined)
                let time = Date.now();
                if (settings.hideTime) {
                    dispatch(setTime(SOLVING_MESSAGE));
                } else {
                    setTimer(setInterval(() => {
                        dispatch(setTime(Date.now() - time));
                    }, 10))
                }
                setStartTime(time);
                break;
        }
    }

    let escDown = (e) => {
        switch (status) {
            case TimerStatus.TIMING:
                stopTimer(Penalty.DNF)
                dispatch(setPenalty(Penalty.DNF))
                dispatch(setPhase(JudgingPhase.JUDGE))
                break;
            default:
                clearIntervals();
                dispatch(setStatus(TimerStatus.IDLE));
                dispatch(setPenalty(Penalty.OK));
                dispatch(resetTime())
                break;
        }
    }

    let anyDown = (e) => {
        if (status === TimerStatus.TIMING) {
            dispatch(setPhase(JudgingPhase.JUDGE))
            stopTimer()
        }
    }

    let timerRef = useEventListeners(timerTriggerActivated, timerTriggerDeactivated, escDown, anyDown)

    return timerRef
}