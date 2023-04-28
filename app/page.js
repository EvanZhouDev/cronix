'use client'
import { useDispatch, useSelector } from 'react-redux'

import Gate from '@redux/gate'
import Timer from "@app/components/time"
import Status from "@app/components/status"
import useData from "@app/redux/accessors/useSession"
import styles from "./page.module.css"
import Scramble from "@app/components/scramble"
import { JudgingPhase, TimerStatus } from './utils/enums'
// import { useEffect } from 'react'
import useStore from '@app/redux/accessors/useStore'
export default function Home() {
  let store = useStore()
  let [sessionData] = useData()
  return (
    <div className={styles.page}>
      <Gate>
        {store.timer.status !== TimerStatus.TIMING && store.timer.status !== TimerStatus.READY ? <Scramble /> : null}
        <Timer />
        {sessionData.phase === JudgingPhase.JUDGE ? <Status /> : null}
      </Gate>
    </div>
  )
}
