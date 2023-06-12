'use client'
import React from 'react';
import styles from '../../settings.module.css';
import Section from "../components/section"
import useSettings from '@app/redux/accessors/useSettings';
import { useDispatch } from 'react-redux';
import ToggleSwitch from '../components/toggleSwitch';
import { setSettings } from '@app/redux/slices/sessions/settings';
import { UiMode } from '@app/utils/enums';
import { FiRefreshCw, FiSmartphone, FiMonitor } from 'react-icons/fi'
import classNames from 'classnames';
import useIsMobile from '@app/utils/useIsMobile';
export default function Colors() {
    let settings = useSettings()
    let dispatch = useDispatch()
    let isMobile = useIsMobile()

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
            <Section
                title="UI Mode"
                description={`Use Desktop UI, Mobile UI, or have Cronix automatically adapt to your device (Detected to be ${isMobile ? "Mobile" : "Desktop"}).`}
                input={
                    <div className={classNames(styles.uiSelectGroup, { [styles.uiSelectGroupMobile]: isMobile })}>
                        <div className={classNames(styles.uiSelectButton, { [styles.uiButtonSelected]: settings.uiMode === UiMode.DESKTOP })} onClick={() => dispatch(setSettings({ uiMode: UiMode.DESKTOP }))}>
                            <FiMonitor className={styles.uiSelectIcon} size={20} />
                            Desktop
                        </div>
                        <div className={classNames(styles.uiSelectButton, { [styles.uiButtonSelected]: settings.uiMode === UiMode.MOBILE })} onClick={() => dispatch(setSettings({ uiMode: UiMode.MOBILE }))}>
                            <FiSmartphone className={styles.uiSelectIcon} size={20} />
                            Mobile
                        </div>
                        <div className={classNames(styles.uiSelectButton, { [styles.uiButtonSelected]: settings.uiMode === UiMode.AUTO })} onClick={() => dispatch(setSettings({ uiMode: UiMode.AUTO }))}>
                            <FiRefreshCw className={styles.uiSelectIcon} size={20} />
                            Auto
                        </div>
                    </div>
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
