'use client'

import useData from '@app/redux/accessors/useSessionData'
import useStore from '@app/redux/accessors/useStore'
import Gate from '@redux/gate'
import Table from "./components/table"
import Chart from "./components/chart"
import StatModule from "./components/statModule"
import styles from "./stats.module.css"
import { RenderOnDesktop, RenderOnMobile } from '@app/utils/useIsMobile'
export default function Home() {
    const [sessionData] = useData()
    return (
        <div>
            <Gate>
                {sessionData.list.length === 0 ? <h3>Do solves to see your statistics.</h3> :
                    <>
                        <div className={styles.statsPage}>
                            <RenderOnDesktop>
                                <div className={styles.vsection}>
                                    <Table />
                                    <Chart />
                                </div>
                                <StatModule />
                            </RenderOnDesktop>
                            <RenderOnMobile>
                                <Table />
                                <Chart />
                                <StatModule />
                            </RenderOnMobile>
                        </div>
                    </>
                }
            </Gate>
        </div>
    )
}
