'use client'
import React from 'react';
import styles from './settings.module.css';
import { useState } from 'react';
import Section from "./components/section"
import { setUseConfetti } from '@app/redux/slices/sessions/settings';
import useSettings from '@app/redux/accessors/useSettings';
import useSessionData from "@app/redux/accessors/useSessionData"
import useStore from "@app/redux/accessors/useStore"
import { useDispatch } from 'react-redux';
import Gate from "@redux/gate"
export default function Page() {
    let settings = useSettings()
    console.log(useStore(), settings)
    let dispatch = useDispatch();

    return (
        <div>
            <div className={styles.settingsPage}>
                <Gate>
                    <h1>Settings</h1>
                    <p>Make Cronix your own.</p>
                    <Section
                        title="Default Event"
                        description="Set the first event shown in the action bar. Also the default event that will be chosen when starting a new session."
                        input={<input className={styles.settingsInput} type="text" />}
                    />
                    <Section
                        title="Default Section Title"
                        description="What new sessions are called when they are created."
                        input={<input className={styles.settingsInput} type="text" />}
                    />
                    <Section
                        title="Show Confetti"
                        description="Show confetti animations when you get a new PB single."
                        input={
                            <span className={styles.checkbox}>
                                <input type="checkbox" checked={settings.useConfetti} />
                                <span className={styles.wrapper} onClick={(e) => { dispatch(setUseConfetti(!settings.useConfetti)) }}>
                                    <span className={styles.knob}></span>
                                </span>
                            </span>
                        }
                    />
                </Gate>
            </div>
        </div>
    );
}
