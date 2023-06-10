'use client'
import React from 'react';
import styles from '../../settings.module.css';
import Section from "../components/section"
import useSettings from '@app/redux/accessors/useSettings';
import { useDispatch } from 'react-redux';
import ToggleSwitch from '../components/toggleSwitch';
import { setSettings } from '@app/redux/slices/sessions/settings';
export default function Colors() {
    let settings = useSettings()
    let dispatch = useDispatch()

    return (
        <div className={styles.tabContent}>
            <h2>Miscellaneous Settings</h2>
            <Section
                title="Show Confirmation on Session Delete"
                description="Whether or not to confirm with user before deleting a session."
                input={
                    <ToggleSwitch value={settings.showDeleteConfirmation} onToggle={() => dispatch(setSettings({ showDeleteConfirmation: !settings.showDeleteConfirmation }))} />
                }
            />
            <h2>Visual Settings</h2>
            <Section
                title="Show Confetti"
                description="Show confetti animations when you get a new PB single."
                input={
                    <ToggleSwitch value={settings.useConfetti} onToggle={() => dispatch(setSettings({ useConfetti: !settings.useConfetti }))} />
                }
            />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div >
    );
}
