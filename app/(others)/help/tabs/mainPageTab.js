import styles from "../help.module.css"
import useIsMobile from "@app/utils/useIsMobile"
import classNames from "classnames"
export default function MainPageTab() {
    let isMobile = useIsMobile()
    return (
        <div className={classNames(styles.infoTab, { [styles.infoTabMobile]: isMobile })}>
            <h2>Introduction</h2>
            The main page, reachable with the first icon in the top menu, or alternatively reachable by clicking the logo, contains everything you need for timing solves, viewing current averages, and more.
            <h2>Timing</h2>
            To start the timer, use the spacebar. When you first press down the spacebar, the time will turn red. Wait until it flashes into another color (your Highlight Color, if you set it in settings) and then release the spacebar to start the timer. During the solve, hit the Escape button to exit the solve without recording the time. Hit any other button to stop the timer and save the time. Now, you will be sent into judging mode.
            <h2>Judging</h2>
            In judging mode, you can go straight into another solve with the spacebar. However, if you decide that your solve needs to be penalized with a +2 or DNF, simply hit the corresponding buttons below the time. Alternatively, to delete the time, hit the delete button. Judging can also be done in the Statistics page afterwards.
            <h2>Action Bar</h2>
            Above the time you will see your scramble. Above the scramble, you will see the Action Bar, containing Quick Settings for events and input method. Feel free to choose the event of your choice, and the scramble will change depending on your event. Alternatively, feel free to choose how you enter your times, with the keyboard or Stackmat.
            <h2>Data Persist</h2>
            Data Persist is a special feature in Cronix, built directly into the core of the timer. Nearly every aspect of the timer is saved in browser cache, allowing the scramble, current judging status, and more to be saved. This means that across refresh and/or leaving and restoring the page, Cronix will be exactly as you left it, without any extra work.
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