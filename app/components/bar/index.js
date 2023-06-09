import styles from "./bar.module.css"
// import all relevant symbols
import { FiBox, FiMoreVertical, FiEyeOff, FiPenTool, FiStar, FiClock, FiWatch, FiMic } from "react-icons/fi"
import Toggle from "./toggle"
import Selection from "./selection"
import Divider from "./divider"
import { Fragment, useEffect, useState, useRef, useMemo } from "react"
import { JudgingPhase, TimerStatus } from '@app/utils/enums'
import useData from "@app/redux/accessors/useSessionData"
import { Events, Inputs } from "@app/utils/settings"
import { setEvent, setInput } from "@app/redux/slices/sessions/operations"
import { useDispatch } from "react-redux"
import Dropdown from "./dropdown"
import { cloneArray } from "@app/utils/cloneObject"
import useNewScramble from "@app/utils/useNewScramble"
import { useStore } from "@app/redux/accessors"
import useIsMobile from "@app/utils/useIsMobile"
import classNames from "classnames"
export default function Bar() {
    let isMobile = useIsMobile()
    let dispatch = useDispatch()
    let [sessionData, session] = useData()
    let store = useStore()
    let genScramble = useNewScramble()
    let eventTypes = [
        {
            name: "3x3",
            icon: <FiBox size={15} />
        },
        {
            name: "4x4",
            icon: <FiBox size={15} />
        },
        {
            name: "More",
            icon: <FiMoreVertical size={15} />,
            submenu: [
                {
                    type: "label",
                    name: "NxNs"
                },
                {
                    name: "2x2",
                    icon: <FiBox size={15} />
                },
                {
                    name: "3x3",
                    icon: <FiBox size={15} />
                },
                {
                    name: "4x4",
                    icon: <FiBox size={15} />
                },
                {
                    name: "5x5",
                    icon: <FiBox size={15} />
                },
                {
                    name: "6x6",
                    icon: <FiBox size={15} />
                },
                {
                    name: "7x7",
                    icon: <FiBox size={15} />
                },
                {
                    type: "label",
                    name: "Other 3x3 Events"
                },
                {
                    name: "3x3 Blind",
                    icon: <FiEyeOff size={15} />
                },
                {
                    name: "3x3 One-Handed",
                    icon: <FiBox size={15} /> // add more relevant symbol
                },
                {
                    name: "3x3 Multi-Blind",
                    icon: <FiEyeOff size={15} />
                },
                {
                    name: "3x3 FMC",
                    icon: <FiPenTool size={15} />
                },
                {
                    type: "label",
                    name: "Other WCA Events"
                },
                {
                    name: "Square-1",
                    icon: <FiStar size={15} />
                },
                {
                    name: "Megaminx",
                    icon: <FiStar size={15} />
                },
                {
                    name: "Clock",
                    icon: <FiClock size={15} />
                },
                {
                    name: "Pyraminx",
                    icon: <FiStar size={15} />
                },
                {
                    name: "Skewb",
                    icon: <FiStar size={15} />
                },
                {
                    type: "label",
                    name: "Other Blind Events"
                },
                {
                    name: "4x4 Blind",
                    icon: <FiEyeOff size={15} />
                },
                {
                    name: "5x5 Blind",
                    icon: <FiEyeOff size={15} />
                },
            ]
        },
    ]
    let eventTypesMobile = [
        {
            name: "4x4",
            icon: <FiBox size={15} />
        },
        {
            name: "More",
            icon: <FiMoreVertical size={15} />,
            submenu: [
                {
                    type: "label",
                    name: "NxNs"
                },
                {
                    name: "2x2",
                    icon: <FiBox size={15} />
                },
                {
                    name: "3x3",
                    icon: <FiBox size={15} />
                },
                {
                    name: "4x4",
                    icon: <FiBox size={15} />
                },
                {
                    name: "5x5",
                    icon: <FiBox size={15} />
                },
                {
                    name: "6x6",
                    icon: <FiBox size={15} />
                },
                {
                    name: "7x7",
                    icon: <FiBox size={15} />
                },
                {
                    type: "label",
                    name: "Other 3x3 Events"
                },
                {
                    name: "3x3 Blind",
                    icon: <FiEyeOff size={15} />
                },
                {
                    name: "3x3 One-Handed",
                    icon: <FiBox size={15} /> // add more relevant symbol
                },
                {
                    name: "3x3 Multi-Blind",
                    icon: <FiEyeOff size={15} />
                },
                {
                    name: "3x3 FMC",
                    icon: <FiPenTool size={15} />
                },
                {
                    type: "label",
                    name: "Other WCA Events"
                },
                {
                    name: "Square-1",
                    icon: <FiStar size={15} />
                },
                {
                    name: "Megaminx",
                    icon: <FiStar size={15} />
                },
                {
                    name: "Clock",
                    icon: <FiClock size={15} />
                },
                {
                    name: "Pyraminx",
                    icon: <FiStar size={15} />
                },
                {
                    name: "Skewb",
                    icon: <FiStar size={15} />
                },
                {
                    type: "label",
                    name: "Other Blind Events"
                },
                {
                    name: "4x4 Blind",
                    icon: <FiEyeOff size={15} />
                },
                {
                    name: "5x5 Blind",
                    icon: <FiEyeOff size={15} />
                },
            ]
        },
    ]

    let [options, setOptions] = useState([{
        name: "event",
        types: eventTypes,
        map: Events,
        // setter: setEvent,
        setter: (name) => {
            dispatch(setEvent(Events[name]))
            genScramble(Events[name], store)
        },
    },
    {
        name: "input",
        types: [
            {
                name: "Timer",
                icon: <FiWatch size={15} />
            },
            {
                name: "Stackmat",
                icon: <FiMic size={15} />
            }
        ],
        map: {
            "Timer": Inputs.TIMER,
            "Stackmat": Inputs.STACKMAT
        },
        setter: (name) => {
            let map = {
                "Timer": Inputs.TIMER,
                "Stackmat": Inputs.STACKMAT
            }
            dispatch(setInput(map[name]))
        },
    }])

    const isInitialRender = useRef(true);

    useEffect(() => {
        if (isMobile) {
            setOptions(oldOptions => {
                let newOptions = cloneArray(oldOptions)
                newOptions[0].types.splice(0, 1)
                return newOptions
            })
        }
    }, [isMobile])

    useEffect(() => {
        if (isMobile) {
            setOptions(oldOptions => {
                let newOptions = cloneArray(oldOptions)
                newOptions[0].types[0].name = Object.fromEntries(Object.entries(Events).map(([key, value]) => [value, key]))[sessionData.event]
                return newOptions;
            })
        } else {
            if (sessionData.event !== Events["3x3"]) {
                setOptions(oldOptions => {
                    let newOptions = cloneArray(oldOptions)
                    newOptions[0].types[1].name = Object.fromEntries(Object.entries(Events).map(([key, value]) => [value, key]))[sessionData.event]
                    return newOptions;
                })
            }
        }
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return; // Skip the code execution on initial render
        }
    }, [isMobile, sessionData.event])


    return (
        <div className={classNames(styles.bar, { [styles.barMobile]: isMobile, [styles.barHidden]: !(store.timer.status !== TimerStatus.TIMING && store.timer.status !== TimerStatus.READY) })}>
            {
                options.map((x, i) => (
                    <Fragment key={x.name}>
                        <Selection>
                            {
                                x.types.map((y, j) => {
                                    if (y.submenu) {
                                        return <Dropdown key={x.name} name={y.name} icon={y.icon} data={y} outer={x} />
                                    } else {
                                        return (
                                            <Toggle updateEvents={x.name === "event"} onClick={
                                                () => x.setter(y.name)
                                            } selected={sessionData[x.name] === x.map[y.name]} key={y.name} name={y.name} icon={y.icon} />
                                        )
                                    }
                                })
                            }
                        </Selection>
                        {i !== options.length - 1 ? <Divider /> : null}
                    </Fragment>
                ))
            }
        </div>
    )
}