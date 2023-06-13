'use client'
import { useDispatch } from 'react-redux'
import { useEffect, useRef } from 'react'
import Gate from '@redux/gate'
import useData from "@app/redux/accessors/useSessionData"
import styles from "./page.module.css"
import { JudgingPhase, TimerStatus } from './utils/enums'
import useStore from '@app/redux/accessors/useStore'
import { Inputs } from './utils/settings'
import Scramble from "@app/components/scramble"
import Timer from "@app/components/time"
import Stackmat from "@app/components/stackmat"
import Status from "@app/components/status"
import Bar from "@app/components/bar"
import Ministats from '@app/components/ministats'
import "cubing/twisty";
import Widgets from './components/widgets'
import useIsMobile from './utils/useIsMobile'
import { RenderOnDesktop, RenderOnMobile } from './utils/useIsMobile';
export default function Home() {
  let isMobile = useIsMobile()
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
        <RenderOnDesktop>
          <div className={styles.vsection}>
            {store.timer.status !== TimerStatus.TIMING && store.timer.status !== TimerStatus.READY ?
              <Bar /> : null}
          </div>

          <div className={styles.vsection} id={sessionData.input === Inputs.TIMER ? "timerSection" : null}>
            {store.timer.status !== TimerStatus.TIMING && store.timer.status !== TimerStatus.READY ? <Scramble /> : null}
            {sessionData.input === Inputs.STACKMAT ? <Stackmat /> : <Timer />}
            {sessionData.phase === JudgingPhase.JUDGE ? <Status /> : null}
          </div>

          <div className={styles.vsection}>
            {store.timer.status !== TimerStatus.TIMING && store.timer.status !== TimerStatus.READY ? <Ministats /> : null}
          </div>

          {store.timer.status !== TimerStatus.TIMING && store.timer.status !== TimerStatus.READY ? <Widgets /> : null}
        </RenderOnDesktop>
        <RenderOnMobile>
          <div className={styles.vsection}>
            {store.timer.status !== TimerStatus.TIMING && store.timer.status !== TimerStatus.READY ?
              <Bar /> : null}
          </div>
          <div className={styles.vsection} id={sessionData.input === Inputs.TIMER ? "timerSection" : null}>
            {store.timer.status !== TimerStatus.TIMING && store.timer.status !== TimerStatus.READY ? <Scramble /> : null}
            {sessionData.input === Inputs.STACKMAT ? <Stackmat /> : <Timer />}
            {sessionData.phase === JudgingPhase.JUDGE ? <Status /> : null}
          </div>
          <div className={styles.vsection}>
            {store.timer.status !== TimerStatus.TIMING && store.timer.status !== TimerStatus.READY ? <Ministats /> : null}
          </div>
        </RenderOnMobile>
      </Gate>
    </div>
  )
}
