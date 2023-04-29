import { createSlice, current, createReducer } from '@reduxjs/toolkit'
import { JudgingPhase, TimerStatus } from '@utils/enums'
import { DEFAULT_SESSION_NAME } from '@utils/constants'
import { Events, Inputs } from "@utils/settings";
import { Penalty } from '@utils/enums';
import calcTime from '@utils/calcTime';

let initialState = {
    current: DEFAULT_SESSION_NAME,
    data: {},
}

export const sessionSlice = createSlice({
    name: "sessions",
    initialState,
    reducers: {
        // Increments the time
        incrementTime: (state) => {
            state.data[state.current].time++;
        },
        // Sets the time
        setTime: (state, { payload }) => {
            state.data[state.current].time = payload;
        },
        // Simply resets the time
        resetTime: (state) => {
            state.data[state.current].time = 0;
        },
        // Cannot assign scramble in reducer
        // Because doing that removes predictability of reducer
        setScramble: (state, { payload }) => {
            state.data[state.current].scramble = payload
        },
        // Sets the phase of the timer to the targeted phase
        setPhase: (state, { payload }) => {
            let possiblePhases = Object.values(JudgingPhase)
            if (!possiblePhases.includes(payload)) {
                console.error(`Invalid phase ${payload}. Please use the JudgingPhase enum exported from @utils/enums.js`)
            } else {
                state.data[state.current].phase = payload
            }
        },
        incrementCount: (state) => {
            state.count++;
        },
        // Sets the current scramble type
        setEvent: (state, { payload }) => {
            if (!Object.values(Events).includes(payload)) {
                console.error(`Invalid event ${payload}. Please use the Events enum exported from @utils/settings.js`)
            } else {
                state.data[state.current].event = payload
            }
        },
        // Sets the current input type
        setInput: (state, { payload }) => {
            if (!Object.values(Inputs).includes(payload)) {
                console.error(`Invalid input ${payload}. Please use the Inputs enum exported from @utils/settings.js`)
            } else {
                state.data[state.current].input = payload
            }
        },
        // Sets the current penalty type
        setPenalty: (state, { payload }) => {
            if (!Object.values(Penalty).includes(payload)) {
                console.error(`Invalid penalty ${payload}. Please use the Penalty enum exported from @utils/settings.js`)
            } else {
                state.data[state.current].penalty = payload
            }
        },
        pushTime: (state, { payload }) => {
            let { date, penalty, scramble, time, uuid } = payload
            if (date === undefined) {
                console.error("Please provide a datestamp with Date.now()")
                return;
            }
            if (!Object.values(Penalty).includes(penalty)) {
                console.error(`${penalty} is not a valid penalty. Please use the Penalty enum exported from @utils/enums.js`);
                return;
            }
            if (scramble === undefined) {
                console.error("Please provide a scramble.");
                return;
            }
            if (time === undefined) {
                console.error("Please provide a time.");
                return;
            }
            if (uuid === undefined) {
                console.error("Please provide a UUID.");
                return;
            }

            state.data[state.current].list.push({
                date,
                time,
                penalty,
                scramble,
                uuid,
                derived: calcTime(time, penalty)
            })
        },
        // Takes a idx and a penalty; updates the time based on the penalty
        modifyTime: (state, { payload }) => {
            let { idx, penalty } = payload
            if (!Object.values(Penalty).includes(penalty)) {
                console.error(`${penalty} is not a valid penalty. Please use the Penalty enum exported from @utils/enums.js`);
                return;
            } else {
                let current = state.data[state.current].list.at(idx)
                current.penalty = penalty;
                current.derived = calcTime(current.time, penalty)
            }
        },
        // Takes a idx and a penalty; updates the time based on the penalty
        deleteTime: (state, { payload }) => {
            let idx = payload
            if (idx !== -1 && idx !== state.data[state.current].list.length - 1) {
                state.data[state.current].list.splice(idx, 1)
            } else {
                // also reset times and stuff
                state.data[state.current].list.splice(idx, 1)
                state.data[state.current].time = 0
                state.data[state.current].phase = JudgingPhase.IDLE
                state.data[state.current].penalty = Penalty.OK

                // TODO: ALSO GENERATE NEW SCRAMBLE
            }
        }
    },
})

export const { resetTime, setTime, incrementTime, setScramble, incrementCount, setPenalty, setPhase, pushTime, modifyTime, deleteTime, setEvent, setInput } = sessionSlice.actions;
export default sessionSlice.reducer;