import reduceReducers from "reduce-reducers"
import sessionManagerReducers from "./manager"
import sessionOperationReducers from "./operations"
import sessionSettingsReducers from "./settings"
import sessionWidgetReducers from "./widgets"

let sessionReducer = reduceReducers(
    null,
    sessionManagerReducers,
    sessionOperationReducers,
    sessionSettingsReducers,
    sessionWidgetReducers
)

export default sessionReducer