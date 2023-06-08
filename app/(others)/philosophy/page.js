import styles from "./philosophy.module.css"
export default function Page() {
    return (
        <div className={styles.philosophyPage}>
            <h1>Why Cronix?</h1>
            &ldquo;Not another cube timer! I&rsquo;ll just go back to using CSTimer after a while!&rdquo;

            <h3>Introduction</h3>
            CSTimer is undoubtedly great. I have been using it loyally for a long time, and its exhaustive list of features leads me to believe it will never truly be replaced. However, it is honestly is getting a bit old. In fact, looking at Chrome&rsquo;s Web Vital standards, CSTimer is <i>non-compliant</i> to modern-day standings.
            In contrast, Cronix is designed with modern standards in mind, built on the industry-leading Next 13 meta-framework, which is built on React 18 by Meta. I have also engineered the user experience of the timer itself to be ready for the next generation of cubers, looking at things with a fresh perspective.

            <h3>Philosophy</h3>
            In Cronix, there are two main pages: Timing and Statistics. I believe that doing solves and viewing and analyzing statistics should be two separate tasks. One should not be distracted by looking at the entire time list, PB averages and etc. <i>while</i> doing their solves. This will simply mess up both tasks. You will be distracted doing your solves, and your analysis will be rushed.
            Instead, when you are solving, do your solves! The only things available on the timing page are the current statistics (current ao5, mo3, and ao12) and the things you need to get through your solves. Nothing more, nothing less. I have brought out the necessary and put away the unnecessary.
            When viewing your statistics, the view is exhaustive. You will be able to see a time list, a chart, all forms of different data points, and maybe even an automatic analysis of your times in the future. This is built to empower you to continue cubing and tell you perhaps where to improve.
            <br/>
            <br/>
            <i>This is Cronix, the next-generation cubing timer.</i>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    )
}