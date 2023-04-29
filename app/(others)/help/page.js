import styles from "./help.module.css"
export default function Page() {
    return (
        <div className={styles.helpPage}>
            <h1>Cronix Help Page</h1>
            Welcome to Cronix. If you haven&rsquo;t already, and are interested, read the &ldquo;About&rdquo; page in order to better understand the philosophy behind the timer, and why I built it. However, here is the quick-start guide:
            <br/>
            <h3>Timer Page:</h3>
            <h4>Starting the Timer:</h4>
            For Timer mode, simply hold down the spacebar, until it shows a yellow time. At this moment, you can release space, and your timer will start. In order to stop the timer, simply press any reasonable key on your keyboard, and the timer will stop.
            Stackmat mode is currently under development.

            <h4>Choosing your event:</h4>
            First, choose your event. The whole range of WCA events are available to you, from 2x2-7x7, all of the various other puzzles like Skewb, Pyraminx, and others, to MBLD and 5x5BLD. Simply click on the one you want, and it will be remembered in the browser storage, and persist through your Session.

            <h4>Choosing your timer input:</h4>
            Cronix currently supports timing via spacebar, and will soon support timing via Stackmat. Again, simply click on the input format you want, and it will persist permanently, even through Sessions.

            <h4>Penalties and time deletion:</h4>
            If you wish to give yourself a penalty for whatever reason, after your solve, a penalty bar will appear under your time. Click &ldquo;OK&rdquo; to mark your time as fine, &ldquo;+2&rdquo; to add two seconds to your solve, and &ldquo;DNF&rdquo; to mark your solve as not finished. You may also delete your time if you wish to do so.

            <h4>Sessions:</h4>
            Currently, sessions can be switched on the top of the page. It displays the current session at the right-most position on the titlebar. Hover over it, and you can add sessions, change your session, and delete sessions.

            Nearly everything is localized in sessions. The scramble and time that you have currently will be saved until you visit the session again. This means that the session will be <i>exactly</i> the same as you left it.

            <h3>Statistics Page:</h3>
            The statistics page is consisted of 3 important sections: The Chart, the Table, and the Stats.
            <h4>Table</h4>
            In the table, you have a good overview of all of your times. You can also quickly toggle between OK, +2, and DNF penalties. There is also a measure of ao5, ao12, and mo3, updated at each solve during your session.

            <h4>Chart</h4>
            In the chart, you can see a trend in your times. It also looks very nice!

            <h4>Stats</h4>
            In stats, you can see your best and current single, ao5, ao12, and mo3. You can also see the standard deviation.
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}