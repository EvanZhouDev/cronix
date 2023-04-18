'use client'

import { createSlice, current } from '@reduxjs/toolkit'
import { JudgingPhase } from '@/app/utils/enums'
import { DEFAULT_SESSION_NAME, SCRAMBLE_UNAVAILABLE_MSG } from '../../utils/constants'
let initialState = {
    session: "Session 1",
    data: {
        [DEFAULT_SESSION_NAME]: {
            time: 0,
            list: [],
            phase: JudgingPhase.IDLE,
            scramble: SCRAMBLE_UNAVAILABLE_MSG
        },
    }
}

let blankSessionTemplate = {
    time: 0,
    list: [],
    phase: JudgingPhase.IDLE,
    scramble: SCRAMBLE_UNAVAILABLE_MSG
}

let defaultSessionName = DEFAULT_SESSION_NAME

export const rootSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        setSession: (state, { payload }) => {
            // If session is not yet initialized, create new session
            if (state.data[payload] === undefined) {
                // Based on blankSessionTemplate
                state.data[payload] = structuredClone(blankSessionTemplate)
            }
            state.session = payload;
        },
        deleteSession: (state, { payload }) => {
            // Keep track of the index of the original session
            let idx = Object.keys(state.data).indexOf(payload)

            // Delete the targeted session
            delete state.data[payload]

            // Get keys from new session
            let keys = Object.keys(state.data)

            // If no sessions left, create a new session and set to it
            if (keys.length === 0) {
                state.data[defaultSessionName] = structuredClone(blankSessionTemplate)
                state.session = defaultSessionName;
            } else {
                // Set current session to the session closest to original session; make sure to not go into negatives
                state.session = keys[Math.max(idx - 1, 0)]
            }
        },
        renameSession: (state, { payload: { from, to } }) => {
            // First grab current keys in session data
            let keys = Object.keys(state.data)

            // If origin doesn't exist, error and exit
            if (!keys.includes(from)) {
                console.error(`Trying to rename session ${from} to ${to}, but ${from} does not exist in session list.`)
            } else if (keys.includes(to)) {
                // If target already exists, error and exit
                console.error(`Trying to rename "${from}" to "${to}" but "${to}" already exists in session list.`)
            } else {
                // Otherwise, start building from a empty dictionary
                // This preserves the insertion order of the keys
                let newData = {}
                for (let key of keys) {
                    newData[key === from ? to : key] = structuredClone(current(state.data[key]))
                }

                // Update the store
                state.data = newData

                // If the original session was the origin, update session to target
                if (state.session === from) state.session = to;
            }
        },
        // Increments the time
        incrementTime: (state) => {
            state.data[state.session].time++;
        },
        // Simply resets the time
        resetTime: (state) => {
            state.data[state.session].time = 0;
        },
        // Cannot assign scramble in reducer
        // Because doing that removes predictability of reducer
        setScramble: (state, { payload }) => {
            state.data[state.session].scramble = payload
        },
        // Sets the phase of the timer to the targeted phase
        setPhase: (state, { payload }) => {
            let possiblePhases = Object.values(JudgingPhase)
            if (!possiblePhases.includes(payload)) {
                console.error(`Invalid phase ${payload}. Expected one of following: ${possiblePhases.join(", ")}`)
            } else {
                state.data[state.session].phase = payload
            }
        }
    }
})

export const { setSession, setTime, incrementTime, setScramble, deleteSession, renameSession, setPhase } = rootSlice.actions;
export default rootSlice.reducer;