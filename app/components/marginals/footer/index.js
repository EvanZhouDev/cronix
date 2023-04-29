'use client';
import styles from "./footer.module.css"
import Option from "./option"
import { FiGithub, FiBook, FiInfo } from "react-icons/fi";
import Version from "./version"
export default function Footer() {
    return (
        <div className={styles.footerWrapper}>
            <div className={styles.footer}>
                <Option link="https://github.com/EvanZhouDev/cronix" icon=<FiGithub size={20} /> name={"GitHub"} />
                <Option link="https://github.com/EvanZhouDev/cronix/blob/main/LICENSE" icon=<FiBook size={20} /> name={"License"} />
                <Option link="/philosophy" icon=<FiInfo size={20} /> name={"Philosophy"} />
                <Version />
            </div>
        </div>
    )
}