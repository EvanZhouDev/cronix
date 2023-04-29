import { Events, Inputs } from "./settings";
import { JudgingPhase } from "./enums";
import { Penalty } from "./enums";
export const SCRAMBLE_UNAVAILABLE_MSG = "No scramble available at this time.";
export const SCRAMBLE_LOADING_MSG = "Scrambling. This may take some time for 4x4.";
export const DEFAULT_SESSION_NAME = "Session 1";
export const DEFAULT_EVENT = "333"
export const DEFAULT_SESSION = {
    time: 0,
    list: [],
    phase: JudgingPhase.IDLE,
    event: Events["3x3"],
    input: Inputs.TIMER,
    penalty: Penalty.OK,
    scramble: SCRAMBLE_UNAVAILABLE_MSG,
}