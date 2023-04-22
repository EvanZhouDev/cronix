import { useEffect } from "react"
import { useDispatch } from 'react-redux'
import useAccessor from '@/app/redux/useAccessor'
import { setTime, resetTime, setStatus } from '@/app/redux/slices/rootSlice'
import { useState } from "react"
import useEventListeners from './useEventListeners'
import { TimerStatus, JudgingPhase } from "@/app/utils/enums.js"

export default function useTimer() {
    let [, , , { status }] = useAccessor()
    const dispatch = useDispatch()
    const [primer, setPrimer] = useState(null);
    const [timer, setTimer] = useState(null);
    const [startTime, setStartTime] = useState(null);

    // Handles various situations where timer ends
    // Either actual timer stop, timer reset due to aborted time, and other scenarios
    let timerEnd = ({ clearTime = true, status = TimerStatus.IDLE, updateTime = false } = {}) => {
        if (timer !== null) clearInterval(timer);
        if (primer !== null) clearInterval(primer);
        if (clearTime) dispatch(resetTime())
        if (updateTime) dispatch(setTime(Date.now() - startTime));
        dispatch(setStatus(status));
    }

    let timerTriggerActivated = (e) => {
        console.warn(`TIMER TRIGGER ACTIVATED, status: ${status}`)
        switch (status) {
            case TimerStatus.IDLE:
                dispatch(setStatus(TimerStatus.UNREADY))
                setPrimer(setTimeout(() => {
                    timerEnd({ status: TimerStatus.READY })
                }, 400))
                break;
            case TimerStatus.TIMING:
                timerEnd({ clearTime: false, updateTime: true })
                break;
        }
    }

    let timerTriggerDeactivated = (e) => {
        console.warn(`TIMER TRIGGER DEACTIVATED, status: ${status}`)
        switch (status) {
            case TimerStatus.UNREADY:
                timerEnd({ clearTime: false })
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

    let escDown = (e) => {
        timerEnd({ clearTime: false })
        // // Clear all timers, and reset to idle
        // if (timer !== null) clearInterval(timer);
        // if (primer !== null) clearInterval(primer);
        // setStatus(TimerStatus.IDLE);

        // // If timing, ditch the time, but still show it at the end
        // // Mimics CSTimer behavior
        // if (status !== TimerStatus.TIMING) dispatch(resetTime())
    }

    let anyDown = (e) => {
        // Clear all timers, and reset to idle
        if (status === TimerStatus.TIMING) {
            timerEnd({ clearTime: false, updateTimer: true })
        }
    }

    let timerRef = useEventListeners(timerTriggerActivated, timerTriggerDeactivated, escDown, anyDown)

    return [timerRef]
}