'use client';
import styles from "./titlebar.module.css"
import Link from "next/link"
export default function Option({ name, icon, link="/" }) {
    return (
        <Link href={link} className={styles.option}>
            <span className={styles.icon}>
                {icon}
            </span>
            <div className={styles.dropdown}>
                {name}
            </div>
        </Link>
    )
}