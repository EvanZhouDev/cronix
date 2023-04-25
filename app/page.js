'use client'
import { useDispatch, useSelector } from 'react-redux'

import Gate from '@redux/gate'
import Timer from "@app/components/time"

import { useStore, useSession } from '@redux/accessors'
// import { useEffect } from 'react'
export default function Home() {
  const store = useStore()
  const [sessionData] = useSession()

  const dispatch = useDispatch()

  return (
    <div className="page">
      <Gate>
        <pre>
          {JSON.stringify(store, null, 2)}
        </pre>
        {sessionData.phase}
        <Timer />
      </Gate>
    </div>
  )
}
