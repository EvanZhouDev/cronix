import { createSlice, current, createReducer } from '@reduxjs/toolkit'
import { JudgingPhase, TimerStatus } from '@utils/enums'
import { DEFAULT_SESSION_NAME, DEFAULT_SETTINGS, DEFAULT_SESSION } from '@utils/constants'
let initialState = {
    current: DEFAULT_SESSION_NAME,
    order: [DEFAULT_SESSION_NAME],
    sessionTemplate: DEFAULT_SESSION,
    data: {
        [DEFAULT_SESSION_NAME]: DEFAULT_SESSION,
    },
    settings: DEFAULT_SETTINGS,
}
export const sessionSlice = createSlice({
    name: "sessions",
    initialState,
    reducers: {
        // Sets a session, intiates if non-existant
        setSession: (state, { payload }) => {
            state.status = TimerStatus.IDLE;
            // If session is not yet initialized, create new session
            if (!state.data.hasOwnProperty(payload)) {
                // Create new session, and assign appropriate dynamic data
                let newSession = structuredClone(DEFAULT_SESSION)

                // Based on DEFAULT_SESSION
                state.data[payload] = newSession;
                // Add session name to order array
                state.order.push(payload);
            }
            // Set session
            state.current = payload;
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
                state.data[DEFAULT_SESSION_NAME] = structuredClone(DEFAULT_SESSION);
                state.order.push(DEFAULT_SESSION_NAME);
                state.current = DEFAULT_SESSION_NAME;
            } else {
                // Set current session to the session closest to original session; make sure to not go into negatives
                state.current = state.order[Math.max(idx - 1, 0)];
            }
        },
        // Renames a session
        renameSession: (state, { payload: { from, to } }) => {
            const { order, data, current: session } = state;
            const sessionIdx = order.indexOf(from);
            const targetIdx = order.indexOf(to);

            if (sessionIdx === -1) {
                console.error(`Trying to rename session "${from}" to "${to}", but "${from}" does not exist in session list.`);
                return;
            }

            if (targetIdx !== -1) {
                // console.error(`Trying to rename session "${from}" to "${to}", but "${to}" already exists in session list.`);
                return;
            }

            const newData = {
                ...data,
                [to]: structuredClone(current(state.data)[from]),
            };

            delete newData[from];

            state.data = newData;
            state.current = session === from ? to : session;

            state.order = [...order.slice(0, sessionIdx), to, ...order.slice(sessionIdx + 1)];
        },
        // Moves a session up
        moveSessionUp: (state, { payload }) => {
            const { order } = state;
            const index = order.indexOf(payload);
            if (index > 0) {
                [order[index - 1], order[index]] = [order[index], order[index - 1]];
            }
            state.order = order;
        },
        // Moves a session down
        moveSessionDown: (state, { payload }) => {
            const { order } = state;
            const index = order.indexOf(payload);
            if (index < order.length - 1) {
                [order[index], order[index + 1]] = [order[index + 1], order[index]];
            }
            state.order = order;
        },
    },
})

export const { setSession, deleteSession, renameSession, moveSessionDown, moveSessionUp } = sessionSlice.actions;
export default sessionSlice.reducer;