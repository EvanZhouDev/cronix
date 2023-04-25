import { useSelector } from 'react-redux'
export default function useSettings() {
    const settings = useSelector((state) => {
        return state.settings
    })
    return settings
}