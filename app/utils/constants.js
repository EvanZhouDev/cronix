import { Events, Inputs } from "./settings";
import { JudgingPhase } from "./enums";
import { Penalty } from "./enums";
import { UiMode } from "./enums"
export const SCRAMBLE_UNAVAILABLE_MSG = "No scramble available at this time.";
export const SCRAMBLE_LOADING_MSG = "Scrambling. This may take some time for 4x4.";
export const DEFAULT_SESSION_NAME = "Session 1";
export const DEFAULT_EVENT = "333"
export const DEFAULT_INPUT = Inputs.TIMER
export const DEFAULT_SESSION = {
    time: 0,
    list: [],
    phase: JudgingPhase.IDLE,
    event: DEFAULT_EVENT,
    input: DEFAULT_INPUT,
    penalty: Penalty.OK,
    scramble: SCRAMBLE_UNAVAILABLE_MSG,
    widgets: [],
    useWidgets: true,
}
export const SOLVING_MESSAGE = "solving"
export const DEFAULT_SETTINGS = {
    useConfetti: true,
    hideTime: false,
    showDeleteConfirmation: true,
    defaultEvent: DEFAULT_EVENT,
    defaultInput: DEFAULT_INPUT,
    uiMode: UiMode.AUTO,
    holdTime: 400,
    mouseTimer: false,
    colors: {
        bgColor: "#323437",
        darkerBgColor: "#2c2e31",
        fontColor: "#d1d0c5",
        fontColorDull: "#646669",
        highlightColor: "#e2b712",
        errorColor: "#ca4754",
        greenColor: "#61c9a8",
        blueColor: "#89d2dc"
    },
    currentSettingsTab: 0,
    currentHelpTab: 0,
}