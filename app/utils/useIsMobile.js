
import { isMobile } from "react-device-detect";
import { useState, useEffect } from "react"

export default function useIsMobile() {
    const [isMobileState, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(isMobile)
    }, [isMobile]);

    return isMobileState;
}

export function RenderOnMobile({ children }) {
    return (
        <>{useIsMobile() ? children : null}</>
    )
}

export function RenderOnDesktop({ children }) {
    return (
        <>{useIsMobile() ? null : children}</>
    )
}