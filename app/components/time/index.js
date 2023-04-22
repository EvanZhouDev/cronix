import useAccessor from '@/app/redux/useAccessor'
import useTimer from './src/useTimer'
export default function Time() {
    const [sessionData, , , timerData] = useAccessor()
    let [timerRef] = useTimer()
    return (
        <div>
            <div ref={timerRef}>{""+sessionData.time}</div>
            <div>{timerData.status}</div>
        </div>
    )
}