'use client';
import Gate from "@redux/gate"
import { marginal } from "../marginal.module.css"
import Option from "./option"
import { FiClock, FiHelpCircle, FiBarChart2, FiSettings } from "react-icons/fi";
import styles from "./titlebar.module.css"
import Session from "./session"
import Link from "next/link"
import useIsMobile from "@app/utils/useIsMobile";

export default function Titlebar() {
    let isMobile = useIsMobile()
    return (
        <div className={marginal}>
            {!isMobile && <Link href="/" className={styles.title}>CRONIX</Link>}
            <Option icon=<FiClock size={30} /> name={"Timer"} link="/" />
            <Option icon=<FiBarChart2 size={30} /> name={"Statistics"} link="/stats" />
            <Option icon=<FiHelpCircle size={30} /> name={"Help"} link="/help" />
            <Option icon=<FiSettings size={30} /> name={"Settings"} link="/settings" />
            <Gate>
                <Session />
            </Gate>
        </div>
    )
}