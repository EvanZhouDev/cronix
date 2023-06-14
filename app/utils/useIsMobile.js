
import { isMobile, isTablet, useMobileOrientation } from "react-device-detect";
import { useState, useEffect } from "react"
import useSettings from "@redux/accessors/useSettings";
import { UiMode } from "./enums"

export default function useIsMobile() {
    let settings = useSettings();
    const [isMobileState, setIsMobile] = useState(false);
    let mobileOrientation = useMobileOrientation();
    useEffect(() => {
        // if tablet and vertical, setIsMobile(false)
        // if tablet and horizontal, setIsMobile(true)
        // otherwise, use ifMobile
        if (typeof window === "undefined") {
            setIsMobile(isMobile)
        } else if (isTablet && mobileOrientation.isLandscape) {
            setIsMobile(false)
        } else if (isTablet && mobileOrientation.isPortrait) {
            setIsMobile(true)
        } else {
            setIsMobile(isMobile)
        }
    }, [isMobile]);

    if (settings.uiMode === UiMode.AUTO) {
        return isMobileState;
    } else if (settings.uiMode === UiMode.MOBILE) {
        return true;
    } else if (settings.uiMode === UiMode.DESKTOP) {
        return false;
    }

    return false;
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