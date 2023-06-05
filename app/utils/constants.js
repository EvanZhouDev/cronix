import { Events, Inputs } from "./settings";
import { JudgingPhase } from "./enums";
import { Penalty } from "./enums";
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
}
export const DEFAULT_SETTINGS = {
    useConfetti: true,
    defaultEvent: DEFAULT_EVENT,
    defaultInput: DEFAULT_INPUT
}