import { Events } from "./settings";
import { JudgingPhase } from "./enums";
import { Penalty } from "./enums";
export const SCRAMBLE_UNAVAILABLE_MSG = "Fetching scramble...";
export const DEFAULT_SESSION_NAME = "Session 1";
export const DEFAULT_EVENT = "333"
export const DEFAULT_SESSION = {
    time: 0,
    list: [],
    phase: JudgingPhase.IDLE,
    event: Events.C3,
    penalty: Penalty.OK,
    scramble: SCRAMBLE_UNAVAILABLE_MSG,
}