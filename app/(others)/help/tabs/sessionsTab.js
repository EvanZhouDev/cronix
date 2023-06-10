import styles from "../help.module.css"
export default function SessionsTab() {
    return (
        <div className={styles.infoTab}>
            <h2>Introduction</h2>
            Important details like the time list, widgets, and more are categorized into what Cronix calls Sessions. Access sessions at the top of your screen, the last element in the top menu. Hover over the colored rectangle, and you will have access to your sessions. Create a new session by putting a name in the box, and hitting the &quot;+&quot; button. Manage your sessions in the list below. Use the Trash Can icon to delete, and the pen icon to rename.
            <h2>Use Cases for Sessions</h2>
            The most common use case for sessions are for different events. When you switch to, for example, 3x3, make a new session. Then, for 4x4, make another new session. That way, statistics will be kept separate, and corresponding averages will not be polluted with times from other solves.
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}