import { useMediaQuery } from 'react-responsive'
export default function useIsMobile() {
    const isMobile = useMediaQuery({ maxWidth: 500 })
    const isPortrait = useMediaQuery({ orientation: 'portrait' })
    if (isPortrait && isMobile) return true;
    return false;
}