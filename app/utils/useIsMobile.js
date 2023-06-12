
import { isMobile } from "react-device-detect";
import { useState, useEffect } from "react"
import useSettings from "@redux/accessors/useSettings";
import { UiMode } from "./enums"

export default function useIsMobile() {
    let settings = useSettings();
    const [isMobileState, setIsMobile] = useState(false);

    useEffect(() => {
        setIsMobile(isMobile)
    }, [isMobile]);

    if (settings.uiMode === UiMode.AUTO) {
        return isMobileState;
    } else if (settings.uiMode === UiMode.MOBILE) {
        return true;
    } else if (settings.uiMode === UiMode.DESKTOP) {
        return false;
    }

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