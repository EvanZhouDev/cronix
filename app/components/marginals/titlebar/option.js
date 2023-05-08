'use client';
import styles from "./titlebar.module.css"
import Link from "next/link"
import { usePathname } from 'next/navigation';
import classNames from "classnames";
export default function Option({ name, icon, link = "/" }) {
    let pathname = usePathname()
    return (
        <Link href={link} className={styles.option}>
            <span className={classNames(styles.icon, {
                [styles.active]: pathname === link
            })}>
                {icon}
            </span>
            <div className={styles.dropdown}>
                {name}
            </div>
        </Link>
    )
}