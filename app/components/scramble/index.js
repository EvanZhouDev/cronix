import useData from "@app/redux/accessors/useSessionData";
import { SCRAMBLE_LOADING_MSG, SCRAMBLE_UNAVAILABLE_MSG } from "@app/utils/constants";
import useNewScramble from "@app/utils/useNewScramble";
import styles from "./scramble.module.css"
import { useEffect } from "react"
export default function Scramble() {
    let generateNewScramble = useNewScramble();
    let [sessionData] = useData()
    useEffect(() => {
        console.log("AHHH")
        // if (sessionData.scramble === SCRAMBLE_LOADING_MSG) {
        //     generateNewScramble()
        // }
        // if (sessionData.scramble === SCRAMBLE_UNAVAILABLE_MSG) {
        //     generateNewScramble()
        // }
    }, [])
    // if (typeof window !== 'undefined') { // Check if we're running in the browser.
    // }
    return (
        <div className={styles.scramble}>{sessionData.scramble}</div>
    )
}