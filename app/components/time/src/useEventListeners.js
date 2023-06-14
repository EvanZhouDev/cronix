import { useState, useEffect, useRef } from "react"
import dev from "@utils/dev"
import { useSettings } from "@app/redux/accessors";

export default function useEventListeners(timerTriggerActivated, timerTriggerDeactivated, escDown, anyDown) {
    let settings = useSettings()
    const [isMouseDown, setIsMouseDown] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const handleMouseDown = (e) => {
            if (settings.mouseTimer) {
                anyDown(e)
                if (e.target === document.getElementById('timerSection') || e.target === elementRef.current) {
                    setIsMouseDown(true);
                    timerTriggerActivated(e);
                    dev && console.info('Mouse down on Timer element.');
                }
            }
        };

        const handleMouseUp = (e) => {
            if (settings.mouseTimer) {
                if (isMouseDown) {
                    setIsMouseDown(false);
                    timerTriggerDeactivated(e);
                    dev && console.info('Mouse up after Timer element triggered.');
                }
            }
        };

        const handleTouchDown = (e) => {
            if (e.target === document.getElementById('timerSection') || e.target === elementRef.current) {
                timerTriggerActivated(e);
                dev && console.info('Touch down on Timer element.');
            }
        };

        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchstart', handleTouchDown, false);

        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchstart', handleTouchDown);
        };
    }, [isMouseDown, timerTriggerActivated, timerTriggerDeactivated, anyDown]);

    useEffect(() => {
        let handleKeyDown = (e) => {
            if (e.repeat) return;
            switch (e.key) {
                case " ":
                    e.preventDefault();
                    dev && console.log("Space key down")
                    timerTriggerActivated(e);
                    break;
                case "Escape":
                    escDown(e);
                    break;
                default:
                    anyDown(e)
            }
        }

        let handleKeyUp = (e) => {
            if (e.repeat) return;
            if (e.key === " ") {
                dev && console.log("Space key released")
                timerTriggerDeactivated(e)
            };
        }

        document.addEventListener('keydown', handleKeyDown)
        document.addEventListener('keyup', handleKeyUp)

        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.removeEventListener('keyup', handleKeyUp)
        }
    }, [timerTriggerActivated, timerTriggerDeactivated, anyDown, escDown])

    return elementRef
}