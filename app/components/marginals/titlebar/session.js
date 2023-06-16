'use client'
import styles from "./titlebar.module.css"
import { useEffect, useRef } from "react"
import { FiChevronDown, FiList } from "react-icons/fi"
import useStore from "@app/redux/accessors/useStore"
import useData from "@app/redux/accessors/useSessionData"
import { useDispatch } from "react-redux"
import { setSession, deleteSession } from "@app/redux/slices/sessions/manager"
import { FiTrash } from "react-icons/fi"
import classNames from "classnames"
import Link from "next/link"
import useNewScramble from "@app/utils/useNewScramble"
import { SCRAMBLE_LOADING_MSG, SCRAMBLE_UNAVAILABLE_MSG } from "@app/utils/constants"
import { Events } from "@app/utils/settings"
import SessionListEl from "./sessionListEl"
import { useState } from "react"
import { success, error, message } from "@app/utils/notify";
import useIsMobile from "@app/utils/useIsMobile"

export default function Session() {
    let isMobile = useIsMobile()
    let [sessionData, curSession] = useData()
    let store = useStore()
    let dispatch = useDispatch()
    let inputRef = useRef(null)
    let genScramble = useNewScramble()
    const [resetStatus, setResetStatus] = useState(false);

    // Function to reset all SessionListEl components
    const resetSessionListElStates = () => {
        setResetStatus(resetStatus => {
            return !resetStatus
        });
    };
    useEffect(() => {
        inputRef.current.addEventListener('keyup', function (e) {
            e.stopPropagation();
        }, false);
        inputRef.current.addEventListener('keydown', function (e) {
            e.stopPropagation();
        }, false);
    }, [])
    return (
        <div className={styles.sessionWrapper}>
            <Link href="/sessions" className={styles.session}>
                <FiList />
                <span className={styles.sessionName}>{store.sessions.current}</span>
            </Link>
            <div className={classNames(styles.sessionDropdown, { [styles.sessionDropdownMobile]: isMobile })}>
                <span className={styles.label}>Create a new session:</span>
                <br />
                <span className={styles.newSessionSection}>
                    <input
                        type="text"
                        placeholder="Name your session…"
                        ref={inputRef}
                        className={styles.inputBox}
                    />
                    <button
                        onClick={() => {
                            if (inputRef.current.value && !store.sessions.order.includes(inputRef.current.value)) {
                                dispatch(setSession(inputRef.current.value))
                                genScramble(Events["3x3"])
                                success(`Created session: "${inputRef.current.value}"`)
                                inputRef.current.value = ""
                            } else {
                                if (store.sessions.order.includes(inputRef.current.value)) {
                                    error(`Session "${inputRef.current.value}" already exists, not created.`)
                                }
                            }
                        }}
                        className={styles.addSessionButton}
                    >+</button>
                </span>
                <br />
                <span className={styles.label}>Available sessions:</span>
                {
                    store.sessions.order.map(x => {
                        return (
                            <SessionListEl key={x} resetEditStatus={resetStatus} sessionName={x} onClick={
                                () => {
                                    if (x !== curSession) resetSessionListElStates()
                                    dispatch(setSession(x))
                                    if (store.sessions.data[x].scramble === SCRAMBLE_LOADING_MSG || store.sessions.data[x].scramble === SCRAMBLE_UNAVAILABLE_MSG) genScramble(store.sessions.data[x].event, store)
                                }
                            } onDeleteClick={(e) => {
                                e.stopPropagation()
                                dispatch(deleteSession(x));
                                if (store.sessions.order.length === 1) {
                                    message(`Deleted session: "${x}", and restored default "Session 1"`)
                                } else {
                                    success(`Successfully deleted session: "${x}"`)
                                }
                            }} className={classNames(
                                styles.sessionSelectionWrapper, { [styles.selected]: (x === store.sessions.current) })} />
                        )
                    })
                }
                <span className={styles.disclaimer}>Learn more about sessions in the <Link href="/help">Help section</Link></span>
            </div>
        </div >
    )
}