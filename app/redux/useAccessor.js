import { useSelector } from 'react-redux'
export default function useAccessor() {
    const session = useSelector((state) => {
        return state.session
    })
    const sessionData = useSelector((state) => {
        return state.data[session]
    })
    const state = useSelector((state) => {
        return state
    })
    return [sessionData, session, state]
}