import { useEffect } from "react";
import useData from "@app/redux/accessors/useSessionData";
import { SCRAMBLE_LOADING_MSG, SCRAMBLE_UNAVAILABLE_MSG } from "@app/utils/constants";
import styles from "./scramble.module.css"
import useNewScramble from "@app/utils/useNewScramble";
let didInit = false;
import useStore from "@app/redux/accessors/useStore";
export default function Scramble() {
    let [sessionData, name] = useData()
    let store = useStore()
    let genScramble = useNewScramble()

    useEffect(() => {
        if (!didInit) {
            if (sessionData.scramble === SCRAMBLE_LOADING_MSG || sessionData.scramble === SCRAMBLE_UNAVAILABLE_MSG) genScramble(undefined, store)
            didInit = true;
        }
    }, [genScramble, sessionData.scramble, store])

    if (sessionData.scramble === SCRAMBLE_UNAVAILABLE_MSG) genScramble(undefined, store)

    return (
        <div className={styles.scramble}>{sessionData.scramble}</div>
    )
}