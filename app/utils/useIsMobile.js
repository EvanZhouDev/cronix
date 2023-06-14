
import { isMobile, isTablet } from "react-device-detect";
import { useState, useEffect } from "react"
import useSettings from "@redux/accessors/useSettings";
import { UiMode } from "./enums"

function useMobileOrientation() {
    const [orientation, setOrientation] = useState({
        isPortrait: false,
        isLandscape: true,
    });

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const handleOrientationChange = () => {
            setOrientation({
                isPortrait: window.matchMedia('(orientation: portrait)').matches,
                isLandscape: window.matchMedia('(orientation: landscape)').matches,
            });
        };

        handleOrientationChange();
        window.addEventListener('resize', handleOrientationChange);

        return () => {
            window.removeEventListener('resize', handleOrientationChange);
        };
    }, []);

    return orientation;
}


export default function useIsMobile() {
    let settings = useSettings();
    const [isMobileState, setIsMobile] = useState(false);
    let mobileOrientation = useMobileOrientation();
    console.log(mobileOrientation, isTablet)
    useEffect(() => {
        // if tablet and vertical, setIsMobile(false)
        // if tablet and horizontal, setIsMobile(true)
        // otherwise, use ifMobile
        if (isTablet && mobileOrientation.isLandscape) {
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