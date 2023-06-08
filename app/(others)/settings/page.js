'use client'
import React, { useEffect } from 'react';
import styles from './settings.module.css';
import Gate from "@redux/gate"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './react-tabs-custom.css';
import Colors from "./tabs/colors"
import General from "./tabs/general"
import Timer from "./tabs/timer"
export default function Page() {
    return (
        <div>
            <div className={styles.settingsPage}>
                <Gate>
                    <h1>Settings</h1>
                    <Tabs>
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
