'use client'
import React from 'react';
import styles from './help.module.css';
import Gate from "@redux/gate"
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import '@app/redux/accessors/useSettings';
import useSettings from '@app/redux/accessors/useSettings';
import { setHelpTab } from '@app/redux/slices/sessions/settings';
import { useDispatch } from 'react-redux';
import GeneralTab from './tabs/generalTab';
import MainPageTab from './tabs/mainPageTab';
import SessionsTab from "./tabs/sessionsTab";
import SettingsTab from "./tabs/settingsTab";
import StatisticsTab from "./tabs/statisticsTab";
import WidgetsTab from "./tabs/widgetsTab";
import '@app/styles/react-tabs-custom.css'
import classNames from 'classnames';
import useIsMobile from '@app/utils/useIsMobile';
export default function Page() {
    let isMobile = useIsMobile();
    let settings = useSettings()
    let dispatch = useDispatch()
    return (
        <div>
            <div className={classNames(styles.helpPage, { [styles.helpPageMobile]: isMobile })}>
                <Gate>
                    <h1 className={styles.helpTitle}>Help</h1>
                    <Tabs defaultIndex={settings.currentHelpTab} onSelect={(index) => {
                        dispatch(setHelpTab(index))
                    }}>
                        <TabList>
                            <Tab>General</Tab>
                            <Tab>Main Page</Tab>
                            <Tab>Sessions</Tab>
                            <Tab>Widgets</Tab>
                            <Tab>Statistics</Tab>
                            <Tab>Settings</Tab>
                        </TabList>
                        <TabPanel>
                            <GeneralTab />
                        </TabPanel>
                        <TabPanel>
                            <MainPageTab />
                        </TabPanel>
                        <TabPanel>
                            <SessionsTab />
                        </TabPanel>
                        <TabPanel>
                            <WidgetsTab />
                        </TabPanel>
                        <TabPanel>
                            <StatisticsTab />
                        </TabPanel>
                        <TabPanel>
                            <SettingsTab />
                        </TabPanel>
                    </Tabs>
                </Gate>
            </div>
        </div >
    );
}
