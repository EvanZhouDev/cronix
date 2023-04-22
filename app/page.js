'use client'
import { useDispatch, useSelector } from 'react-redux'
import { setSession, renameSession, deleteSession, setEvent } from '@/app/redux/slices/rootSlice'
import useAccessor from "@/app/redux/useAccessor"
import Time from '@/app/components/time'
import Gate from '@/app/redux/gate'
// import { useEffect } from 'react'
export default function Home() {
  const [sessionData, session, state] = useAccessor()

  const dispatch = useDispatch()
  // const state = useSelector((state) => {
  //   console.log(state);
  //   return state
  // })
  return (
    <div className="page">
      <button
        onClick={() => dispatch(setSession("Session " + Math.random()))}
      >New Random Session!</button>
      <button
        onClick={() => dispatch(setSession("Session 1"))}
      >Set to 1</button>
      <button
        onClick={() => dispatch(deleteSession("Session 1"))}
      >Delete Session</button>
      <button
        onClick={() => dispatch(setEvent("abc"))}
      >set event</button>
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
        <div>All sessions are: {state.order.join(", ")}</div>
        <div>
          {JSON.stringify(sessionData)}
        </div>
      </Gate>
      <Gate>
        <Time />
      </Gate>
    </div>
  )
}
