'use client'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Gate from '@redux/gate'
import useData from "@app/redux/accessors/useSessionData"
import styles from "./page.module.css"
import { JudgingPhase, TimerStatus } from './utils/enums'
import useStore from '@app/redux/accessors/useStore'

import Scramble from "@app/components/scramble"
import Timer from "@app/components/time"
import Status from "@app/components/status"
import Bar from "@app/components/bar"
import Ministats from '@app/components/ministats'

export default function Home() {
  let store = useStore()
  let [sessionData] = useData()
  
  useEffect(() => {
    document.addEventListener('DOMContentLoaded', function () {
      // Disable scrolling on touch devices
      document.addEventListener('touchmove', function (event) {
        event.preventDefault();
      }, { passive: false });
    });
  }, [])
  return (
    <div className={styles.page} id="mainTimer">
      <Gate>
        <div className={styles.vsection}>
          {store.timer.status !== TimerStatus.TIMING && store.timer.status !== TimerStatus.READY ?
            <Bar /> : null}
        </div>
        <div className={styles.vsection} id={"timerSection"}>
          {store.timer.status !== TimerStatus.TIMING && store.timer.status !== TimerStatus.READY ? <Scramble /> : null}
          <Timer />
          {sessionData.phase === JudgingPhase.JUDGE ? <Status /> : null}
        </div>
        <div className={styles.vsection}>
          {store.timer.status !== TimerStatus.TIMING && store.timer.status !== TimerStatus.READY ? <Ministats /> : null}
        </div>
      </Gate>
    </div>
  )
}
