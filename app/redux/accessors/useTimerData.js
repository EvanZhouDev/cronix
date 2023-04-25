import { useSelector } from 'react-redux'
export default function useTimerData() {
    const timer = useSelector((state) => {
        return state.timer
    })
    return timer
}