'use client'
import React from 'react';
import styles from './settings.module.css';
import { useState } from 'react';

export default function Page() {
    let [useConfetti, setUseConfetti] = useState(true);
    return (
        <div>
            <div className={styles.settingsPage}>
                <h1>Settings</h1>
                <p>Make Cronix your own.</p>
                <div className={styles.settingsSection}>
                    <div className={styles.settingsLabel}>
                        Default Event
                        <br />
                        <span className={styles.settingDescription}>Set the first event shown in the action bar. Also the default event that will be chosen when starting a new session.</span>
                    </div>
                    <input className={styles.settingsInput} type="text" />
                </div>
                <div className={styles.settingsSection}>
                    <div className={styles.settingsLabel}>
                        Default Session Title
                        <br />
                        <span className={styles.settingDescription}>What new sessions are called when they are created.</span>
                    </div>
                    <input className={styles.settingsInput} type="text" />
                </div>
                <div className={styles.settingsSection}>
                    <div className={styles.settingsLabel}>
                        Show Confetti
                        <br />
                        <span className={styles.settingDescription}>Show confetti animations when you get a new PB single.</span>
                    </div>
                    <span className={styles.checkbox}>
                        <input type="checkbox" checked={useConfetti} />
                        <span className={styles.wrapper} onClick={(e) => { setUseConfetti(useConfetti => !useConfetti) }}>
                            <span className={styles.knob}></span>
                        </span>
                    </span>
                </div>
            </div>
        </div>
    );
}
