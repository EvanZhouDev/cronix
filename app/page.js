'use client'
import { useDispatch } from 'react-redux'
import { setSession, renameSession } from '@/app/redux/slices/rootSlice'
import useAccessor from "@/app/redux/useAccessor"
import Gate from '@/app/redux/gate'
import { useEffect } from 'react'

export default function Home() {
  const [session, sessionData, data] = useAccessor()

  const dispatch = useDispatch()
  // if (sessionData.scramble === "hi") dispatch(setScramble(Math.random()))
  // useEffect(() => {
  //   dispatch(setScramble("hi"))
  // }, [])
  return (
    <div className="page">
      <button
        onClick={() => dispatch(setSession("Session " + Math.random()))}
      >New Random Session!</button>
      <button
        onClick={() => dispatch(renameSession({
          from: "Session 1",
          to: "some new session name",
        }))}
      >
        change it up!
      </button>
      <Gate>
        <div>Current session is named: {session}</div>
        <div>All sessions are: {Object.keys(data).join(", ")}</div>
        <div>
          {JSON.stringify(sessionData)}
        </div>
      </Gate>
    </div>
  )
}
