'use client'
import React from 'react';
import { setThemeColor } from '@app/redux/slices/sessions/settings';
import useSettings from '@app/redux/accessors/useSettings';
import { useDispatch } from 'react-redux';
import { HexColorPicker, HexColorInput } from "react-colorful";
import styles from "../../../settings.module.css"
export default function ColorPicker({ name }) {
    let settings = useSettings()
    let dispatch = useDispatch();

    return (
        <div className={styles.picker}>
            <HexColorInput
                className={styles.hexLabel}
                color={settings.colors[name]}
                onChange={(color) => dispatch(setThemeColor({ [name]: color }))}
            />
            <div className={styles.colorDropdown}>
                <HexColorPicker
                    color={settings.colors[name]}
                    onChange={(color) => dispatch(setThemeColor({ [name]: color }))}
                />
            </div>
        </div>
    );
}
