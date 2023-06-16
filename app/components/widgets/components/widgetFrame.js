import styles from "../widgets.module.css"
import { FiPlus, FiInfo, FiTrash, FiChevronDown, FiChevronUp } from "react-icons/fi"
import { useState, useEffect } from "react";
import "cubing/twisty";
import { deleteWidget, changeWidget } from "@app/redux/slices/sessions/widgets";
import { useDispatch } from "react-redux";
import { WidgetTypes } from "@app/utils/enums";
import classNames from "classnames";
import WidgetText from "./widgetText";
import TimeGraphWidget from "./widgets/timeGraphWidget";
import TimeTableWidget from "./widgets/timeTableWidget";

import ScrambleWidget from "./widgets/scrambleWidget";
export default function WidgetFrame({ idx, showOptions, type }) {
    let dispatch = useDispatch()

    let [dropdownShown, setDropdownShown] = useState(false);

    useEffect(() => {
        if (showOptions === true) setDropdownShown(false)
    }, [showOptions])


    let widgetNameToComponent = {
        [WidgetTypes.SCRAMBLE]: <ScrambleWidget />,
        [WidgetTypes.GRAPH]: <TimeGraphWidget />,
        [WidgetTypes.TABLE]: <TimeTableWidget />,
    }

    return (
        <div className={classNames(styles.widgetFrame, { [styles.shortWidgetFrame]: !showOptions })}>
            {showOptions &&
                <div className={styles.widgetControls}>
                    <FiTrash className={styles.deleteWidget} onClick={() => dispatch(deleteWidget(idx))} />
                    <div className={classNames(styles.dropdown)} onClick={() => setDropdownShown(!dropdownShown)}>
                        <div className={classNames(styles.dropdownContent, {
                            [styles.showDropdown]: dropdownShown,
                        })}>
                            {
                                Object.entries(WidgetTypes).map(([key, name]) => (
                                    <>
                                        <span key={key} onClick={() => dispatch(changeWidget({ idx: idx, newType: name }))} className={classNames(styles.dropdownOption, { [styles.dropdownActive]: type === name })}>{name}</span>
                                        <br />
                                    </>
                                )
                                )
                            }
                        </div>
                        <span className={styles.dropdownDisplay}>{type}{dropdownShown ? <FiChevronUp size={20} /> : <FiChevronDown size={20} />}</span>
                    </div>
                    &nbsp;
                </div>}
            <div className={styles.widgetContent}>
                {(() => {
                    if (type === WidgetTypes.DEFAULT) return (
                        <WidgetText>
                            <b>Welcome to Widgets Alpha.</b> <br /> Add a widget from the dropdown above to get started.
                        </WidgetText>
                    )
                    else if (widgetNameToComponent[type]) return widgetNameToComponent[type]
                    else return (
                        <WidgetText>
                            This widget is unavailable.<br />It will be implemented soon. Alternatively, feel free to submit a PR to implement it yourself.
                        </WidgetText>
                    )
                })()}
            </div>
        </div >
    )
}