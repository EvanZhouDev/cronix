import styles from "../help.module.css"
import useIsMobile from "@app/utils/useIsMobile"
import classNames from "classnames"
export default function StatisticsTab() {
    let isMobile = useIsMobile()
    return (
        <div className={classNames(styles.infoTab, { [styles.infoTabMobile]: isMobile })}>
            <h2>Introduction</h2>
            The Statistics Page is the place to view all of your data. It is split into 3 sections: The Table, the Graph, and the section for all the averages and other mathematical values.
            <h2>Table</h2>
            This is where you can find all of your times. They are followed with the mo3 at that period in time, ao5 at that period in time, and ao12 at that period in time. All of that is followed with the judging section, where you can penalize and delete your solves.
            <h2>Graph</h2>
            This is where you can view the plot for your singles, means, and averages. They are displayed gorgeously in color, and the graph is interactive too! Click on a key at the top to enable or disable the display for that specific type of data.
            <h2>Averages and Numbers</h2>
            Here, you can view your current mean and averages, and your best mean and averages. You can also view your standard deviation.
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}