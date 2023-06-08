'use client'
import React, { useEffect } from 'react';
import styles from './settings.module.css';
import Gate from "@redux/gate"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import './react-tabs-custom.css';
import Colors from "./tabs/colors"
export default function Page() {
    return (
        <div>
            <div className={styles.settingsPage}>
                <Gate>
                    <h1>Settings</h1>
                    <Tabs>
                        <TabList>
                            <Tab>Colors</Tab>
                            {/* <Tab>Title 2</Tab> */}
                        </TabList>
                        <TabPanel>
                            <Colors />
                        </TabPanel>
                        {/* <TabPanel>
                            <h2>Any content 2</h2>
                        </TabPanel> */}
                    </Tabs>
                </Gate>
            </div>
        </div >
    );
}
