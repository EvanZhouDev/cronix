import { createSlice } from "@reduxjs/toolkit";
import { Events, Inputs } from "@utils/settings";
import { DEFAULT_SETTINGS, DEFAULT_EVENT, DEFAULT_INPUT } from "@app/utils/constants";

let initialState = {
    sessionTemplate: {
        event: DEFAULT_EVENT,
        input: DEFAULT_INPUT,
    },
    settings: DEFAULT_SETTINGS,
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
                state.settings.defaultEvent = payload
            }
        },
        // Sets the default input type
        setDefaultInput: (state, { payload }) => {
            if (!Object.values(Inputs).includes(payload)) {
                console.error(`Invalid input ${payload}. Please use the Inputs enum exported from @utils/settings.js`)
            } else {
                state.sessionTemplate.input = payload
                state.settings.defaultInput = payload
            }
        },
        setUseConfetti: (state, { payload }) => {
            if (!(payload == true || payload == false)) {
                console.error(`Cannot parse useConfetti value ${payload}. Please either use true or false.`)
            } else {
                state.settings.useConfetti = payload
            }
        },
        setThemeColor: (state, { payload }) => {
            state.settings.colors = {
                ...state.settings.colors,
                ...payload
            }
        },
        setSettings: (state, { payload }) => {
            state.settings = {
                ...state.settings,
                ...payload
            }
        },
        setSettingsTab: (state, { payload }) => {
            state.settings.currentSettingsTab = payload
        },
    }
});

export const { setDefaultInput, setDefaultEvent, setUseConfetti, setThemeColor, setSettings, setSettingsTab } = settingsSlice.actions;
export default settingsSlice.reducer;
