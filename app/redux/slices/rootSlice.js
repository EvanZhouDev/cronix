'use client'

import { createSlice, current } from '@reduxjs/toolkit'
import { JudgingPhase, TimerStatus, Penalty } from '@/app/utils/enums'
import { DEFAULT_SESSION_NAME, SCRAMBLE_UNAVAILABLE_MSG } from '@/app/utils/constants'
import { Events, Inputs } from "@/app/utils/settings"

let initialState = {
    session: "Session 1",
    timerData: {
        status: TimerStatus.IDLE,
        timer: null,
        primer: null,
        start: 0,
    },
    settings: {
        defaultEvent: Events.C3,
        defaultInput: Inputs.TIMER,
    },
    data: {
        [DEFAULT_SESSION_NAME]: {
            time: 0,
            list: [],
            phase: JudgingPhase.IDLE,
            event: Events.C3,
            scramble: SCRAMBLE_UNAVAILABLE_MSG,
        },
    },
    order: ["Session 1"]
}

let blankSessionTemplate = {
    time: 0,
    list: [],
    phase: JudgingPhase.IDLE,
    event: null, // assigned inside reducer, to provide up-to-date info
    scramble: SCRAMBLE_UNAVAILABLE_MSG,
    status: TimerStatus.IDLE
}

export const rootSlice = createSlice({
    name: "data",
    initialState,
    reducers: {
        // Sets a session, intiates if non-existant
        setSession: (state, { payload }) => {
            state.status = TimerStatus.IDLE;
            // If session is not yet initialized, create new session
            if (!state.data.hasOwnProperty(payload)) {
                // Create new session, and assign appropriate dynamic data
                let newSession = structuredClone(blankSessionTemplate)
                newSession.event = state.settings.defaultEvent

                // Based on blankSessionTemplate
                state.data[payload] = newSession;
                // Add session name to order array
                state.order.push(payload);
            }
            // Set session
            state.session = payload;
        },
        // Deletes a session
        deleteSession: (state, { payload }) => {
            // Keep track of the index of the original session
            let idx = state.order.indexOf(payload);

            // Delete the targeted session from the data hash table
            delete state.data[payload];

            // Remove session name from order array
            state.order.splice(idx, 1);

            // If no sessions left, create a new session and set to it
            if (state.order.length === 0) {
                state.data[DEFAULT_SESSION_NAME] = structuredClone(blankSessionTemplate);
                state.order.push(DEFAULT_SESSION_NAME);
                state.session = DEFAULT_SESSION_NAME;
            } else {
                // Set current session to the session closest to original session; make sure to not go into negatives
                state.session = state.order[Math.max(idx - 1, 0)];
            }
        },
        // Renames a session
        renameSession: (state, { payload: { from, to } }) => {
            const { order, data, session } = state;
            const sessionIdx = order.indexOf(from);
            const targetIdx = order.indexOf(to);

            if (sessionIdx === -1) {
                console.error(`Trying to rename session "${from}" to "${to}", but "${from}" does not exist in session list.`);
                return;
            }

            if (targetIdx !== -1) {
                console.error(`Trying to rename session "${from}" to "${to}", but "${to}" already exists in session list.`);
                return;
            }

            const newData = {
                ...data,
                [to]: structuredClone(current(state.data)[from]),
            };

            delete newData[from];

            state.data = newData;
            state.session = session === from ? to : session;

            state.order = [...order.slice(0, sessionIdx), to, ...order.slice(sessionIdx + 1)];
        },
        // Increments the time
        incrementTime: (state) => {
            state.data[state.session].time++;
        },
        // Sets the time
        setTime: (state, { payload }) => {
            state.data[state.session].time = payload;
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
        },
        // Sets the status of the timer to the targeted status
        setStatus: (state, { payload }) => {
            let possibleStatuses = Object.values(TimerStatus)
            if (!possibleStatuses.includes(payload)) {
                console.error(`Invalid status ${payload}. Expected one of following: ${possibleStatuses.join(", ")}`)
            } else {
                state.timerData.status = payload
            }
        },
        setPrimer: (state, { payload }) => {
            state.timerData.primerInterval = payload
        },
        setTimer: (state, { payload }) => {
            state.timerData.timerInterval = payload
        },
        stopPrimer: _ => clearInterval(state.timerData.primerInterval),
        stopTimer: _ => clearInterval(state.timerData.timerInterval),
        setStart: (state, { payload }) => {
            state.timerData.start = payload
        },
        // Sets the current scramble type
        setEvent: (state, { payload }) => {
            if (!Object.values(Events).includes(payload)) {
                console.error(`Invalid event ${payload}. Please use the Events enum exported from @/app/utils/settings.js`)
            } else {
                state.data[state.session].event = payload
            }
        },
        // Pushes a new time into the timeList
        addTime: (state, { payload: { time, scramble, timestamp, penalty, uuid } }) => {
            // Precheck to see if penalty exists
            if (!Object.values(Penalty).includes(penalty)) {
                console.error(`Invalid penalty ${penalty}. Please use the Penalty enum exported from @/app/utils/enums.js`)
            }
            let mathematicalTime;
            // if (penalty === Penalty.PLUS2) mathematicalTime = 
            // 1. Calculate some information based on the time
            state.data[state.session].list.push(
                {
                    time,
                    scramble,
                    uuid,
                    timestamp,
                    penalty,
                    derived
                }
            )
        },
        // Updates a time with a new penalty based on the time uuid
        updateTime: (state, { payload: { uuid, penalty } }) => {
            // 1. Calculate some information based on the time
        }
    }
})

export const { setSession, resetTime, setTime, incrementTime, setScramble, deleteSession, renameSession, setPhase, setEvent, setStatus, setTimer, setPrimer, setStart, stopTimer, stopPrimer } = rootSlice.actions;
export default rootSlice.reducer;