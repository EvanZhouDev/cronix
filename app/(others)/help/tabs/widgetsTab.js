import styles from "../help.module.css"
import useIsMobile from "@app/utils/useIsMobile"
import classNames from "classnames"
export default function WidgetsTab() {
    let isMobile = useIsMobile()
    return (
        <div className={classNames(styles.infoTab, { [styles.infoTabMobile]: isMobile })}>
            <h2>Introduction</h2>
            Widgets are a quick way to access vital information on the Main Page. Move your cursor to the bottom right of the screen, above the bottom menu. You will see the Widget Controllers. Click the plus to add a widget, and hit the eye to enable or disable Widgets. The Widget Controllers, however, will always be available. View and configure all of your widgets by hovering near the area of the Widget Controller. The current maximum for widget count is 2.
            <h2>Customizing a Widget</h2>
            When you first add a widget, it will be uninitialized. Click on the dropdown to choose a widget type. Different widgets may be interactive and dynamic. Delete the widget with the Trash Can button on the top left
            <h2>Pinned Widget</h2>
            The first widget in the list is the pinned widget. It is the only Widget with content that will show after your mouse leaves the Widget Controller area. Moving your mouse back into the area will reveal the rest of your widgets.
            <h2>Contributing to a widget</h2>
            Have an idea for a widget? Feel free to contact me at evanzhoudev@gmail.com, or alternatively on the Github repo as an issue. Also feel free to make a PR for a new widget. It will be accepted after review. Submit the PR on the dev branch.
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div>
    )
}