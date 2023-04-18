import { useSelector } from 'react-redux'
export default function useAccessor() {
    const session = useSelector((state) => {
        return state.session
    })
    const sessionData = useSelector((state) => {
        return state.data[session]
    })
    const data = useSelector((state) => {
        return state.data
    })
    return [session, sessionData, data]
}