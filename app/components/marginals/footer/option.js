import styles from "./footer.module.css"
import Link from "next/link"
import useIsMobile from "@app/utils/useIsMobile";
export default function Option({ name, icon, link }) {
    let isMobile = useIsMobile()
    return (
        <Link href={link} className={styles.option}>
            {icon}
            {!isMobile && <span className={styles.name}>{name}</span>}
        </Link>
    )
}