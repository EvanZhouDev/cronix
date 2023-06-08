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
import { ScrambleVisualizerEvents } from './utils/settings'

export default function Home() {
  let store = useStore()
  let [sessionData] = useData()

  let test = useRef(null)

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
        {/* {(() => {
          if (sessionData.scramble && ScrambleVisualizerEvents[sessionData.event]) {
            try {
              return (
                <twisty-player
                  puzzle={ScrambleVisualizerEvents[sessionData.event]}
                  alg={sessionData.scramble}
                  hint-facelets="none"
                  back-view="side-by-side"
                  background="none"
                  control-panel="none"
                ></twisty-player>
              )
            } catch (error) {
              console.log(error)
            }
          } else {
            return null
          }
        })()} */}
        <player />
        <div className={styles.vsection} ref={test}>
          {store.timer.status !== TimerStatus.TIMING && store.timer.status !== TimerStatus.READY ?
            <Bar /> : null}
        </div>
        <div className={styles.vsection} id={sessionData.input === Inputs.TIMER ? "timerSection" : null}>
          {store.timer.status !== TimerStatus.TIMING && store.timer.status !== TimerStatus.READY ? <Scramble /> : null}
          {/* <Timer /> */}
          {sessionData.input === Inputs.STACKMAT ? <Stackmat /> : <Timer />}
          {sessionData.phase === JudgingPhase.JUDGE ? <Status /> : null}
        </div>
        <div className={styles.vsection}>
          {store.timer.status !== TimerStatus.TIMING && store.timer.status !== TimerStatus.READY ? <Ministats /> : null}
        </div>
      </Gate>
    </div>
  )
}
