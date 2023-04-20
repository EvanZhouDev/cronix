import useAccessor from '@/app/redux/useAccessor'
import useTimer from './src/useTimer'
export default function Time() {
    const [sessionData] = useAccessor()
    let [status, timerRef] = useTimer()
    return (
        <div>
            <div ref={timerRef}>{sessionData.time}</div>
            <div>{status}</div>
        </div>
    )
}