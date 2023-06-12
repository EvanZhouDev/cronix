
import { isMobile } from "react-device-detect";

export default function useIsMobile() {
    return isMobile;
}

export function RenderOnMobile({ children }) {
    return (
        <>{isMobile ? children : null}</>
    )
}

export function RenderOnDesktop({ children }) {
    return (
        <>{!isMobile ? children : null}</>
    )
}