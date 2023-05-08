import PenaltyToggle from "./penaltyToggle"
import { FiTrash } from "react-icons/fi"
import styles from "./status.module.css"
import useData from "@app/redux/accessors/useSessionData"
import { Penalty } from "@app/utils/enums"
import { useDispatch } from 'react-redux'
import { setPenalty, modifyTime, deleteTime } from "@app/redux/slices/sessions/operations"
import useNewScramble from "@app/utils/useNewScramble"
import { useStore } from "@app/redux/accessors"
export default function Status() {
    let [sessionData, sessionName] = useData()
    let dispatch = useDispatch()
    let store = useStore()
    let {genScramble} = useNewScramble(undefined)
    let modifyPenalty = (penalty) => {
        dispatch(setPenalty(penalty))
        dispatch(modifyTime({ idx: -1, penalty: sessionData.penalty }))
    }
    let deleteLastTime = () => {
        dispatch(deleteTime(-1))
        genScramble(undefined, store)
    }
    return (
        <div>
            <PenaltyToggle type="OK" selected={sessionData.penalty === Penalty.OK} onClick={() => modifyPenalty(Penalty.OK)} />
            <PenaltyToggle type="+2" selected={sessionData.penalty === Penalty.PLUS2} onClick={() => modifyPenalty(Penalty.PLUS2)} />
            <PenaltyToggle type="DNF" selected={sessionData.penalty === Penalty.DNF} onClick={() => modifyPenalty(Penalty.DNF)} />
            <span className={styles.deleteButton} onClick={deleteLastTime}><FiTrash />Delete</span>
        </div>
    )
}