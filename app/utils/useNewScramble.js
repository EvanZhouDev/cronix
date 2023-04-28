
import { randomScrambleForEvent } from "cubing/scramble";
import { setScramble } from "@app/redux/slices/sessions/operations";
import { setDebug } from "cubing/search";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
export default function useNewScramble() {
    useEffect(() => {
        async function dryRun() {
            await randomScrambleForEvent("333")
        }
        dryRun()
    }, [])
    let dispatch = useDispatch()
    setDebug({
        logPerf: false, // Disable console info like scramble generation durations.
        scramblePrefetchLevel: "none", // Never prefetch scrambles.
        forceStringWorker: true // Workaround for bundlers that mangle worker instantiation.
    });
    return (
        async function () {
            dispatch(setScramble("Scramble is loading"))
            let scramble = await randomScrambleForEvent("333")
            dispatch(setScramble(scramble.toString()))
        }
    )
}