import PenaltyToggle from "./penaltyToggle"
import { FiTrash } from "react-icons/fi"
import styles from "./status.module.css"
import useData from "@app/redux/accessors/useSession"
import { Penalty } from "@app/utils/enums"
import { useDispatch } from 'react-redux'
import { setPenalty, modifyTime, deleteTime } from "@app/redux/slices/sessions/operations"
import useNewScramble from "@app/utils/useNewScramble"
export default function Status() {
    let [{ penalty }] = useData()
    let dispatch = useDispatch()
    let generateNewScramble = useNewScramble()
    let modifyPenalty = (penalty) => {
        dispatch(setPenalty(penalty))
        dispatch(modifyTime({ idx: -1, penalty }))
    }
    let deleteLastTime = () => {
        dispatch(deleteTime(-1))
        generateNewScramble()
    }
    return (
        <div>
            <PenaltyToggle type="OK" selected={penalty === Penalty.OK} onClick={() => modifyPenalty(Penalty.OK)} />
            <PenaltyToggle type="+2" selected={penalty === Penalty.PLUS2} onClick={() => modifyPenalty(Penalty.PLUS2)} />
            <PenaltyToggle type="DNF" selected={penalty === Penalty.DNF} onClick={() => modifyPenalty(Penalty.DNF)} />
            <span className={styles.deleteButton} onClick={deleteLastTime}><FiTrash />Delete</span>
        </div>
    )
}