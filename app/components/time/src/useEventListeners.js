import { useState, useEffect, useRef } from "react"
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

        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isMouseDown, timerTriggerActivated, timerTriggerDeactivated]);

    useEffect(() => {
        let handleKeyDown = (e) => {
            if (e.repeat) return;
            if (e.key === " ") {
                timerTriggerActivated(e);
                console.info('Timer trigger key down.')
            } else if (e.key === "Escape") {
                escDown(e);
            }
        }
        let handleKeyUp = (e) => {
            if (e.repeat) return;
            if (e.key === " ") {
                timerTriggerDeactivated(e);
                console.info('Timer trigger key up.')
            } else { 
                anyDown(e)
            }
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