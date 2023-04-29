import styles from "./bar.module.css";
import Toggle from "./toggle.js"
import DropdownToggle from "./dropdownToggle.js"
import useData from "@app/redux/accessors/useSessionData"
import { useDispatch } from "react-redux";
import { Events } from "@app/utils/settings";
import Label from "./label";
import useNewScramble from "@app/utils/useNewScramble";
export default function Dropdown({ icon, name, data, outer, options }) {
    let dispatch = useDispatch()
    let generateNewScramble = useNewScramble();
    let [sessionData] = useData()

    return (
        <div className={styles.dropdownParent}>
            <Toggle icon={icon} name={name} />
            <span className={styles.dropdown}>
                {
                    data.submenu.map(x => {
                        if (x.type === "label") {
                            return <Label key={x.name} name={x.name} />
                        }
                        return <DropdownToggle key={x.name} selected={sessionData[outer.name] === outer.map[x.name]} onClick={() => outer.setter(x.name)} icon={x.icon} name={x.name} />
                    })
                }
            </span>
        </div>
    )
}