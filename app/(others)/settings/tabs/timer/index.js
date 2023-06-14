'use client'
import React from 'react';
import styles from '../../settings.module.css';
import Section from "../components/section"
import useSettings from '@app/redux/accessors/useSettings';
import { useDispatch } from 'react-redux';
import ToggleSwitch from '../components/toggleSwitch';
import NumberInput from '../components/numberInput';
import { setSettings } from '@app/redux/slices/sessions/settings';
export default function Colors() {
    let settings = useSettings()
    let dispatch = useDispatch()

    return (
        <div className={styles.tabContent}>
            <h2>Timer Settings</h2>
            <Section
                title="Hide Time"
                description="Whether or not to hide time counter when timing. Time will be revealed after your solve. (Recommended for advanced solvers for focus)"
                input={
                    <ToggleSwitch value={settings.hideTime} onToggle={() => dispatch(setSettings({ hideTime: !settings.hideTime }))} />
                }
            />
            <Section
                title="Use Mouse Timer"
                description="Whether or not to use the mouse to trigger the timer (only applicable on Desktop)"
                input={
                    <ToggleSwitch value={settings.mouseTimer} onToggle={() => dispatch(setSettings({ mouseTimer: !settings.mouseTimer }))} />
                }
            />
            <Section
                title="Hold Time"
                description="How long it takes to activate the timer. Unit in seconds."
                input={
                    <NumberInput settingKey={"holdTime"} parseMs />
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
