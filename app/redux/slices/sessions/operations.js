import { createSlice, current, createReducer } from '@reduxjs/toolkit'
import { JudgingPhase, TimerStatus } from '@utils/enums'
import { DEFAULT_SESSION_NAME } from '@utils/constants'
import { Events } from "@utils/settings";
import { Penalty } from '@utils/enums';

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
                state.event = payload
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

            // TODO: EXTRACT ALL THIS AS A FUNCTION, takes time and penalty => makes a derived JSON with mathematicalTime and formattedTime
            let mathematicalTime = time;
            if (penalty === Penalty.DNF) mathematicalTime = Infinity;
            if (penalty === Penalty.PLUS2) mathematicalTime += 200;


            state.data[state.current].list.push({
                date,
                time,
                penalty,
                scramble,
                uuid,
                derived: {
                    mathematicalTime
                }
            })
        },
        // Takes a uuid and a penalty; updates the time based on the penalty
        modifyTime: (state, { payload }) => {
            let { uuid, penalty } = payload
            if (!Object.values(Penalty).includes(penalty)) {
                console.error(`${penalty} is not a valid penalty. Please use the Penalty enum exported from @utils/enums.js`);
                return;
            } else {
                for (let timeJSON of state.data[state.current].list) {
                    if (timeJSON.uuid === uuid) {
                        let mathematicalTime = timeJSON.time;
                        if (penalty === Penalty.DNF) mathematicalTime = Infinity;
                        if (penalty === Penalty.PLUS2) mathematicalTime += 200;
                    }
                }
            }
        }
    },
})

export const { resetTime, setTime, incrementTime, setScramble, incrementCount, setPhase, pushTime } = sessionSlice.actions;
export default sessionSlice.reducer;