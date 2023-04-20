import { useDispatch } from 'react-redux'
import useAccessor from '@/app/redux/useAccessor'
import { incrementTime, resetTime } from '@/app/redux/slices/rootSlice'
import { useState } from "react"
import useEventListeners from './useEventListeners'
import { TimerStatus } from "@/app/utils/enums.js"
import accurateInterval from 'accurate-interval'

export default function useTimer() {
    const dispatch = useDispatch()

    const [status, setStatus] = useState(TimerStatus.IDLE);
    const [primer, setPrimer] = useState(null);
    const [timer, setTimer] = useState(null);

    let timerTriggerActivated = (e) => {
        console.warn(`TIMER TRIGGER ACTIVATED, status: ${status}`)
        switch (status) {
            case TimerStatus.IDLE:
                setStatus(TimerStatus.UNREADY)
                setPrimer(setTimeout(() => {
                    dispatch(resetTime())
                    setStatus(TimerStatus.READY)
                }, 400))
                break;
            case TimerStatus.TIMING:
                timer.clear()
                setStatus(TimerStatus.IDLE)
                break;
        }
    }

    let timerTriggerDeactivated = (e) => {
        console.warn(`TIMER TRIGGER DEACTIVATED, status: ${status}`)
        switch (status) {
            case TimerStatus.UNREADY:
                setStatus(TimerStatus.IDLE);
                clearTimeout(primer);
                break;
            case TimerStatus.READY:
                setStatus(TimerStatus.TIMING);
                setTimer(accurateInterval(() => {
                    dispatch(incrementTime());
                }, 10, { aligned: true, immediate: true }))
                break;
        }
    }

    let escDown = (e) => {
        // Clear all timers, and reset to idle
        if (timer !== null) timer.clear();
        if (primer !== null) clearInterval(primer);
        setStatus(TimerStatus.IDLE);

        // If timing, ditch the time, but still show it at the end
        // Mimics CSTimer behavior
        if (status !== TimerStatus.TIMING) dispatch(resetTime())
    }

    let anyDown = (e) => {
        // Clear all timers, and reset to idle
        if (status === TimerStatus.TIMING) {
            timer.clear();
            setStatus(TimerStatus.IDLE);
        }
    }

    let timerRef = useEventListeners(timerTriggerActivated, timerTriggerDeactivated, escDown, anyDown)

    return [status, timerRef]
}