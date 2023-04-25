'use client'
import { combineReducers } from "redux"
import sessionReducer from "./slices/sessions"
import timerReducer from "./slices/timer"

let rootReducer = combineReducers(
    {
        timer: timerReducer,
        sessions: sessionReducer,
    },
)

export default rootReducer