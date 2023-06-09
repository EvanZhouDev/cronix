// import useTimer from './src/useTimer'
import { useTimerData, useSession } from "@redux/accessors"
import styles from "./stackmat.module.css"
import calcTime from '@app/utils/calcTime'
import StackmatSignalProcessor from 'stackmat-signal-processor'
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setTime } from "@app/redux/slices/sessions/operations"
import { setPhase } from "@app/redux/slices/sessions/operations"
import { JudgingPhase } from "@app/utils/enums"
import { setStatus } from "@app/redux/slices/timer"
import { TimerStatus } from "@app/utils/enums"
import useStore from '@app/redux/accessors/useStore'
import { useEffect } from "react"
export default function Stackmat() {
    let dispatch = useDispatch()
    let [running, setRunning] = useState(false)
    const [sessionData] = useSession()
    let store = useStore()
    const timerData = useTimerData()
    let derivedTime = calcTime(sessionData.time, sessionData.penalty)
    let useMilli = false
    if (useMilli) derivedTime = derivedTime.formattedTimePrecise
    else derivedTime = derivedTime.formattedTime

    let handle = (arg) => {
        dispatch(setStatus(TimerStatus.TIMING))
    }

    async function connect() {
        // Connect to media device
        let stream = await navigator.mediaDevices.getUserMedia({
            "audio": { "optional": [{ "echoCancellation": false }] }
        })

        // Get the Audio Context
        const audioContext = new AudioContext({
            "echoCancellation": false,
            "noiseSuppression": false
        })

        // Create relevant Audio Nodes
        const microphone = audioContext.createMediaStreamSource(stream)

        // Connecting the StackmatSignalProcessor
        await audioContext.audioWorklet.addModule(StackmatSignalProcessor)

        // Create an Audio Node for the Stackmat Signal Processor
        const stackmatSignal = new AudioWorkletNode(audioContext, 'StackmatSignalProcessor')

        microphone.connect(stackmatSignal)
        stackmatSignal.connect(audioContext.destination)
        console.log(stackmatSignal)
        stackmatSignal.port.onmessage = event => {
            handle(event.data)
        }
    }

    return (
        <div>
            <div className={styles.time}>Stackmat in-dev</div>
        </div>
    )
}