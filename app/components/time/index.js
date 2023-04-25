import useData from '@redux/accessors/useSession'
import useTimer from './src/useTimer'
import { useTimerData, useSession } from "@redux/accessors"
export default function Time() {
    const timerRef = useTimer()

    const [sessionData] = useSession()
    const timerData = useTimerData()

    return (
        <div>
            <div ref={timerRef}>{"" + sessionData.time}</div>
            <div>{timerData.status}</div>
        </div>
    )
}