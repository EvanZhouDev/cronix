
import { randomScrambleForEvent } from "cubing/scramble";
import { setScramble } from "@app/redux/slices/sessions/operations";
import { setDebug } from "cubing/search";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import useData from "@app/redux/accessors/useSessionData";
import { SCRAMBLE_LOADING_MSG } from "./constants";
export default function useNewScramble() {
    let [sessionData, sessionName] = useData()
    let dispatch = useDispatch()
    setDebug({
        logPerf: false, // Disable console info like scramble generation durations.
        scramblePrefetchLevel: "none", // Never prefetch scrambles.
        forceStringWorker: true // Workaround for bundlers that mangle worker instantiation.
    });
    return (
        async function (event = sessionData.event, currentSession = sessionName) {
            console.log("I HAVE BEEN CALLED")
            dispatch(setScramble(SCRAMBLE_LOADING_MSG))
            let scramble = await randomScrambleForEvent(event)
            if (currentSession === sessionName) {
                console.log(currentSession, sessionName)
                dispatch(setScramble(scramble.toString()))
            }
        }
    )
}