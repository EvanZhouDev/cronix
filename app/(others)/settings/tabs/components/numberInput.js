import React, { useState } from 'react'
import styles from "../../settings.module.css"
import { useSettings } from '@app/redux/accessors'
import { useDispatch } from 'react-redux'
import { setSettings } from '@app/redux/slices/sessions/settings'
import classNames from 'classnames'
import useIsMobile from '@app/utils/useIsMobile'
export default function NumberInput({ settingKey, parseMs = false }) {
    let isMobile = useIsMobile()
    let settings = useSettings()
    const [number, setNumber] = useState(settings[settingKey] / (parseMs ? 1000 : 1))
    let dispatch = useDispatch()

    const handleNumber = (e) => {

        let input = e.target.value

        if (input.match(/^([0-9]{1,})?(\.)?([0-9]{1,})?$/)) {
            setNumber(input)
            dispatch(setSettings({ [settingKey]: input * (parseMs ? 1000 : 1) }))
        }

    }

    const handleFloat = () => {
        // The conditional prevents parseFloat(null) = NaN (when the user deletes the input)
        setNumber(parseFloat(number) || '')
    }

    return <input className={classNames(styles.settingsInput, { [styles.settingsInputMobile]: isMobile })} placeholder={isMobile ? "#" : 'Enter a number'} value={number} onChange={handleNumber} onBlur={handleFloat} />

}