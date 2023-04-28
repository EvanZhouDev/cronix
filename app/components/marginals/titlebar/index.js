'use client';
import Gate from "@redux/gate"
import { marginal } from "../marginal.module.css"
import Option from "./option"
import { FiClock, FiHelpCircle, FiBarChart2 } from "react-icons/fi";
import styles from "./titlebar.module.css"
import Session from "./session"
export default function Titlebar() {
    return (
        <div className={marginal}>
            <span className={styles.title}>CRONIX</span>
            <Option icon=<FiClock size={30} /> name={"Timer"} link="/" />
            <Option icon=<FiBarChart2 size={30} /> name={"Statistics"} link="/stats" />
            <Option icon=<FiHelpCircle size={30} /> name={"Help"} link="/help" />
            <Gate>
                <Session />
            </Gate>
        </div>
    )
}