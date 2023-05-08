'use client'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import Gate from '@redux/gate'
import Timer from "@app/components/time"
import Status from "@app/components/status"
import useData from "@app/redux/accessors/useSessionData"
import styles from "./page.module.css"
import Scramble from "@app/components/scramble"
import { JudgingPhase, TimerStatus } from './utils/enums'
// import { useEffect } from 'react'
import useStore from '@app/redux/accessors/useStore'
import Bar from "@app/components/bar"
import Ministats from './components/ministats'
export default function Home() {
  let store = useStore()
  let [sessionData] = useData()
  let dispatch = useDispatch()
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
