import React, { useState, useEffect } from "react";
import styles from "./widgets.module.css";
import { FiPlus, FiMoreVertical, FiEyeOff, FiEye } from "react-icons/fi";
import WidgetFrame from "./components/widgetFrame";
import classNames from "classnames";
import { useSession } from "@app/redux/accessors";
import { addWidget, setUseWidgets } from "@app/redux/slices/sessions/widgets";
import { useDispatch } from "react-redux";
import settings from "@app/redux/slices/sessions/settings";
import useCustomToaster from "@app/utils/notify";
import Tippy from '@tippyjs/react';
import '@app/styles/tippy.css';
export default function Widgets() {
    let { success, error, message } = useCustomToaster()
    let [sessionData] = useSession();
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
            {sessionData.useWidgets && <div className={classNames(styles.widgetGroup, {
                [styles.widgetGroupInactive]: !showWidgets
            })}
                onMouseEnter={handleMoreButtonHover}
                onMouseLeave={handleMoreButtonLeave}
            >
                {widgetList.length ? <WidgetFrame showOptions={showWidgets} type={widgetList[0].type} idx={0} /> : "Add a widget to get started."}
                <div className={classNames(styles.movingWidgets, { [styles.movingWidgetsShow]: showWidgets })}>
                    {widgetList.slice(1).map((x, i) => (
                        <WidgetFrame key={i} showOptions={true} type={x.type} idx={i + 1} />
                    ))}
                </div>
            </div >}
            <span
                className={styles.widgetSpawnGroup}
                onMouseEnter={handleMoreButtonHover}
                onMouseLeave={handleMoreButtonLeave}
            >
                {showWidgets &&
                    <>
                        <Tippy content="Add a new Widget">
                            <div className={styles.widgetAddButton}>
                                <FiPlus size={30} onClick={() => {
                                    if (widgetList.length < 2) {
                                        dispatch(addWidget());
                                        success("Added new widget.")
                                    } else {
                                        error("Max limit of 2 widgets reached.")
                                    }
                                }} />
                            </div>
                        </Tippy>

                        {
                            sessionData.useWidgets ? <Tippy content="Hide Widgets"><span className={styles.widgetShowHide}><FiEyeOff
                                onClick={() => {
                                    dispatch(setUseWidgets(false));
                                    message("Widgets hidden.")
                                }}
                                className={styles.widgetHideButton}
                                size={30}
                            /></span></Tippy> : <Tippy content="Show Widgets"><span className={styles.widgetShowHide}><FiEye
                                onClick={() => {
                                    dispatch(setUseWidgets(true));
                                    message("Widgets shown.")
                                }}
                                className={styles.widgetHideButton}
                                size={30}
                            /></span></Tippy>
                        }
                    </>
                }


            </span>
        </>
    );
}
