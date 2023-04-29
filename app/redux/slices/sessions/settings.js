import { createSlice } from "@reduxjs/toolkit";
import { Events, Inputs } from "@utils/settings";

let initialState = {
    sessionTemplate: {
        event: Events["3x3"],
        input: Inputs.TIMER,
    }
}


export const settingsSlice = createSlice({
    name: "sessions",
    initialState,
    reducers: {
        // Sets the default scramble type
        setDefaultEvent: (state, { payload }) => {
            if (!Object.values(Events).includes(payload)) {
                console.error(`Invalid event ${payload}. Please use the Events enum exported from @utils/settings.js`)
            } else {
                state.sessionTemplate.event = payload
            }
        },
        // Sets the default input type
        setDefaultInput: (state, { payload }) => {
            if (!Object.values(Inputs).includes(payload)) {
                console.error(`Invalid input ${payload}. Please use the Inputs enum exported from @utils/settings.js`)
            } else {
                state.sessionTemplate.input = payload
            }
        },
    }
});

export const { setDefaultInput, setDefaultEvent } = settingsSlice.actions;
export default settingsSlice.reducer;
