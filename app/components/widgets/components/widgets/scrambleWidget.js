import useData from "@app/redux/accessors/useSessionData"
import { ScrambleVisualizerEvents } from "@app/utils/settings"
export default function ScrambleWidget() {
    let [sessionData] = useData()
    return (
        <twisty-player
            puzzle={ScrambleVisualizerEvents[sessionData.event]}
            alg={sessionData.scramble}
            hint-facelets="none"
            back-view="side-by-side"
            background="none"
            control-panel="none"
        ></twisty-player>
    )
}