import { useSelector } from 'react-redux'
export default function useStore() {
    const state = useSelector((state) => {
        return state
    })
    return state
}