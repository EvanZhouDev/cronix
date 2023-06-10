import React, { useState } from "react";
import styles from "./widgets.module.css";
import { FiPlus, FiMoreVertical } from "react-icons/fi";
import WidgetFrame from "./components/widgetFrame";
import classNames from "classnames";
import { useSession } from "@app/redux/accessors";
import { addWidget } from "@app/redux/slices/sessions/widgets";
import { useDispatch } from "react-redux";

export default function Widgets() {
    let [sessionData] = useSession();
    console.log(sessionData)
    const [showWidgets, setShowWidgets] = useState(false);
    let dispatch = useDispatch();
    let widgetList = sessionData.widgets;
    const handleMoreButtonHover = () => {
        setShowWidgets(true);
    };

    const handleMoreButtonLeave = () => {
        setShowWidgets(false);
    };


    return (
        <>
            <div className={classNames(styles.widgetGroup, {
                [styles.widgetGroupInactive]: !showWidgets
            })}
                onMouseEnter={handleMoreButtonHover}
                onMouseLeave={handleMoreButtonLeave}
            >
                {widgetList.length ? <WidgetFrame showOptions={showWidgets} type={widgetList[0].type} idx={0} /> : "Add a widget to get started."}
                <div className={classNames(styles.movingWidgets, { [styles.movingWidgetsShow]: showWidgets })}>
                    {widgetList.slice(1).map((x, i) => (
                        <WidgetFrame showOptions={true} type={x.type} idx={i + 1} />
                    ))}
                </div>
            </div >
            {showWidgets && <span
                className={styles.widgetSpawnGroup}
                onMouseEnter={handleMoreButtonHover}
                onMouseLeave={handleMoreButtonLeave}
            >
                <div className={styles.widgetAddButton}>
                    <FiPlus size={30} onClick={() => dispatch(addWidget())} />
                </div>
                <FiMoreVertical
                    className={styles.widgetAddMenu}
                    size={30}
                />
            </span>
            }
        </>
    );
}
