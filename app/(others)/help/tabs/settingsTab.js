import styles from "../help.module.css"
import useIsMobile from "@app/utils/useIsMobile"
import classNames from "classnames"
export default function SettingsTab() {
    let isMobile = useIsMobile()
    return (
        <div className={classNames(styles.infoTab, { [styles.infoTabMobile]: isMobile })}>
            <h2>Introduction</h2>
            Cronix is designed to be fully customizable. Here, you can adjust everything from colors to confetti celebrations
            <h2>Settings Tabs</h2>
            All of the tabs are reasonably named, and all settings have easy-to-understand descriptions. Feel free to scroll through them and pick out settings that you would like to change.
            <h2>Importing and Exporting Themes</h2>
            In the Colors tab, you are able to pick a pre-existing theme, make your own theme, or alternatively import and export others&apos; themes. If you would like to export a theme, click on the copy button next to the Import and Export text box. Send that string of characters to your friends, and they will be able to import the theme exactly as it is on your side. If you would like to import a theme, take that string that you received, and paste it into the text box. Click the go button, and Cronix will try to parse the string. If it is successful, your current theme will be over-ridden. If it fails, Cronix will let you know.
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