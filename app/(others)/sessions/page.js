'use client'
import styles from "./sessions.module.css"
import Gate from "@app/redux/gate";
import SessionTable from "./components/sessionTable";
import TimeGraphWidget from "./components/timeGraph";
import TimeTableWidget from "./components/timeTable";
import { useRef } from "react";
import useStore from "@app/redux/accessors/useStore";
import { useDispatch } from "react-redux";
import { setSession } from "@app/redux/slices/sessions/manager";
import { success, error } from "@app/utils/notify";
import { Events } from "@app/utils/settings";
import useNewScramble from "@app/utils/useNewScramble";
import useData from "@app/redux/accessors/useSessionData";
import { RenderOnDesktop, RenderOnMobile } from "@app/utils/useIsMobile";

export default function Page() {
    let inputRef = useRef(null)
    let store = useStore()
    console.log(store)
    let dispatch = useDispatch()
    let genScramble = useNewScramble();
    let [sessionData] = useData()

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <Gate>
            <RenderOnDesktop>
                <div className={styles.container}>
                    <div className={styles.hsection}>
                        <span className={styles.newSessionSection}>
                            <h1>Sessions</h1>
                            <input
                                placeholder="Name new session..."
                                className={styles.newSessionInput}
                                ref={inputRef}
                            ></input>
                            <button
                                className={styles.newSessionButton}
                                onClick={() => {
                                    if (inputRef.current.value && !store.sessions.order.includes(inputRef.current.value)) {
                                        dispatch(setSession(inputRef.current.value))
                                        genScramble(Events["3x3"])
                                        success(`Created session: "${inputRef.current.value}"`)
                                        inputRef.current.value = ""
                                    } else {
                                        if (inputRef.current.value === "") {
                                            error("Cannot create session with empty name.")
                                        }
                                        if (store.sessions.order.includes(inputRef.current.value)) {
                                            error(`Session "${inputRef.current.value}" already exists, not created.`)
                                        }
                                    }
                                }}
                            >+</button>
                        </span>
                        <span className={styles.info}>Click on a session to select it.</span>
                        <div className={styles.tableScroll}>
                            <SessionTable />
                        </div>
                    </div>

                    <div className={styles.hsection}>
                        {
                            sessionData.list.length === 0 ?
                                <div className={styles.noSolves}>
                                    <h2>No solves done in this session.</h2>
                                </div> :
                                <>
                                    <TimeGraphWidget />
                                    <TimeTableWidget />
                                </>
                        }

                    </div>
                </div>
            </RenderOnDesktop>
            <RenderOnMobile>
                <div className={styles.mobileSessionsSection}>
                    <h1 className={styles.titleMobile}>Sessions</h1>
                    <span className={styles.infoMobile}>Click on a session to select it.</span>
                    <span className={styles.newSessionSectionMobile}>
                        <input
                            placeholder="Name new session..."
                            className={styles.newSessionInputMobile}
                            ref={inputRef}
                        ></input>
                        <button
                            className={styles.newSessionButtonMobile}
                            onClick={() => {
                                if (inputRef.current.value && !store.sessions.order.includes(inputRef.current.value)) {
                                    dispatch(setSession(inputRef.current.value))
                                    genScramble(Events["3x3"])
                                    success(`Created session: "${inputRef.current.value}"`)
                                    inputRef.current.value = ""
                                } else {
                                    if (inputRef.current.value === "") {
                                        error("Cannot create session with empty name.")
                                    }
                                    if (store.sessions.order.includes(inputRef.current.value)) {
                                        error(`Session "${inputRef.current.value}" already exists, not created.`)
                                    }
                                }
                            }}
                        >+</button>
                    </span>
                    <div className={styles.tableScroll}>
                        <SessionTable />
                    </div>
                </div >
            </RenderOnMobile>
        </Gate>
    )
}