import styles from "./footer.module.css"
import Link from "next/link"
export default function Option({ name, icon, link }) {
    console.log(name, link)
    return (
        <Link href={link} className={styles.option}>
            {icon}
            <span className={styles.name}>{name}</span>
        </Link>
    )
}