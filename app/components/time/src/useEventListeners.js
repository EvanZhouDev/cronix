import { useState, useEffect, useRef } from "react"
import dev from "@utils/dev"
export default function useEventListeners(timerTriggerActivated, timerTriggerDeactivated, escDown, anyDown) {
    const [isMouseDown, setIsMouseDown] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const handleMouseDown = (e) => {
            if (e.target === elementRef.current) {
                setIsMouseDown(true);
                timerTriggerActivated(e);
                console.info('Mouse down on Timer element.');
            }
        };

        const handleMouseUp = (e) => {
            anyDown(e)
            if (isMouseDown) {
                setIsMouseDown(false);
                timerTriggerDeactivated(e);
                console.info('Mouse up after Timer element triggered.');
            }
        };

        const handleTouchDown = (e) => {
            setIsMouseDown(true);
            timerTriggerActivated(e);
            console.info('Touch down on Timer element.');
        };

        const handleTouchEnd = (e) => {
            anyDown(e)
            if (isMouseDown) {
                setIsMouseDown(false);
                timerTriggerDeactivated(e);
                console.info('Touch up after Timer element triggered.');
            }
        };

        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('touchstart', handleTouchDown, false);
        document.addEventListener('touchend', handleTouchEnd, false);

        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
            document.removeEventListener('touchstart', handleTouchDown);
            document.removeEventListener('touchend', handleTouchEnd);
        };
    }, [isMouseDown, timerTriggerActivated, timerTriggerDeactivated]);

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
    }, [timerTriggerActivated, timerTriggerDeactivated])

    return elementRef
}