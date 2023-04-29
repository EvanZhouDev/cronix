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
export default function Session() {
    let store = useStore()
    let [sessionData, sessionName] = useData()
    let dispatch = useDispatch()
    let inputRef = useRef(null)
    let { genScramble, cancelRequests } = useNewScramble(undefined, useData())
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
            <div className={styles.session}>
                <FiList />
                <span className={styles.sessionName}>{store.sessions.current}</span>
            </div>
            <div className={styles.sessionDropdown}>
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
                            if (inputRef.current.value) {
                                cancelRequests()
                                dispatch(setSession(inputRef.current.value))
                                genScramble(undefined, store)
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
                            <span key={x} onClick={() => {
                                cancelRequests()
                                dispatch(setSession(x))
                                if (store.sessions.data[x].scramble === SCRAMBLE_LOADING_MSG || store.sessions.data[x].scramble === SCRAMBLE_UNAVAILABLE_MSG) genScramble(store.sessions.data[x].event, store)
                            }} className={classNames(
                                styles.sessionSelectionWrapper, { [styles.selected]: (x === store.sessions.current) })}>
                                <span className={styles.sessionName}>{x}</span>
                                <span className={styles.delSession} onClick={(e) => { e.stopPropagation(); dispatch(deleteSession(x)) }}><FiTrash /></span>
                            </span>
                        )
                    })
                }
                <span className={styles.disclaimer}>Learn more about sessions in the <Link href="/help">Help section</Link></span>
            </div>
        </div >
    )
}