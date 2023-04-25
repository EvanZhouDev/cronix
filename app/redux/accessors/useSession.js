import { useSelector } from 'react-redux'
export default function useData() {
    const session = useSelector((state) => {
        return state.sessions.current
    })
    const sessionData = useSelector((state) => {
        return state.sessions.data[session]
    })
    return [sessionData, session]
}