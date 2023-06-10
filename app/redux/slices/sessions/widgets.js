import { createSlice } from "@reduxjs/toolkit";
import { WidgetTypes } from "@app/utils/enums";

let initialState = {
    data: {}
}


export const widgetSlice = createSlice({
    name: "sessions",
    initialState,
    reducers: {
        // Add a widget to the list
        addWidget: (state) => {
            state.data[state.current].widgets.push({
                type: WidgetTypes.DEFAULT
            })
        },
        // Delete widget
        deleteWidget: (state, { payload }) => {
            state.data[state.current].widgets.splice(payload, 1)
        },
        // Change widget purpose
        changeWidget: (state, { payload: { idx, newType } }) => {
            if (Object.values(WidgetTypes).includes(newType)) {
                state.data[state.current].widgets[idx].type = newType
            } else console.error(`"${newType}" is not a valid widget type. Make sure to use the widgets exported from "@app/utils/enums"`)
        },
    }
});

export const { addWidget, deleteWidget, changeWidget } = widgetSlice.actions;
export default widgetSlice.reducer;
