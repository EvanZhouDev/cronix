'use client'
import React, { useEffect } from 'react';
import styles from './settings.module.css';
import Gate from "@redux/gate"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '@app/styles/react-tabs-custom.css';
import Colors from "./tabs/colors"
import General from "./tabs/general"
import Timer from "./tabs/timer"
import useSettings from '@app/redux/accessors/useSettings';
import { setSettingsTab } from '@app/redux/slices/sessions/settings';
import { useDispatch } from 'react-redux';
import classNames from 'classnames';
export default function Page() {
    let settings = useSettings()
    let dispatch = useDispatch()

    return (
        <div>
            <div className={classNames(styles.settingsPage)}>
                <Gate>
                    <h1>Settings</h1>
                    <Tabs defaultIndex={settings.currentSettingsTab} onSelect={(index) => {
                        dispatch(setSettingsTab(index))
                    }}>
                        <TabList>
                            <Tab>General</Tab>
                            <Tab>Timer</Tab>
                            <Tab>Colors</Tab>
                        </TabList>
                        <TabPanel>
                            <General />
                        </TabPanel>
                        <TabPanel>
                            <Timer />
                        </TabPanel>
                        <TabPanel>
                            <Colors />
                        </TabPanel>
                    </Tabs>
                </Gate>
            </div>
        </div >
    );
}
