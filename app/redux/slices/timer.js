import { createSlice } from "@reduxjs/toolkit";
import { TimerStatus } from "@utils/enums";

let initialState = {
    status: TimerStatus.IDLE
}


export const timerSlice = createSlice({
    name: "timer",
    initialState,
    reducers: {
        // Sets the status of the timer to the targeted status
        setStatus: (state, { payload }) => {
            let possibleStatuses = Object.values(TimerStatus)
            if (!possibleStatuses.includes(payload)) {
                console.error(`Invalid status ${payload}. Expected one of following: ${possibleStatuses.join(", ")}`)
            } else {
                state.status = payload
            }
        },
    }
});

export const { setStatus } = timerSlice.actions;
export default timerSlice.reducer;