import reduceReducers from "reduce-reducers"
import sessionManagerReducers from "./manager"
import sessionOperationReducers from "./operations"
import sessionSettingsReducers from "./settings"

let sessionReducer = reduceReducers(
    null,
    sessionManagerReducers,
    sessionOperationReducers,
    sessionSettingsReducers
)

export default sessionReducer