import useData from "@app/redux/accessors/useSessionData";
import { SCRAMBLE_UNAVAILABLE_MSG } from "@app/utils/constants";
import useNewScramble from "@app/utils/useNewScramble";
import styles from "./scramble.module.css"
export default function Scramble() {
    let generateNewScramble = useNewScramble();
    let [sessionData] = useData()
    if (sessionData.scramble === SCRAMBLE_UNAVAILABLE_MSG) {
        generateNewScramble()
    }
    return (
        <div className={styles.scramble}>{sessionData.scramble}</div>
    )
}