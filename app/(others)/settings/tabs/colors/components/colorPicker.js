'use client'
import React from 'react';
import { setThemeColor } from '@app/redux/slices/sessions/settings';
import useSettings from '@app/redux/accessors/useSettings';
import { useDispatch } from 'react-redux';
import { HexColorPicker, HexColorInput } from "react-colorful";
import styles from "../../../settings.module.css"
import classNames from 'classnames';
import useIsMobile from '@app/utils/useIsMobile';
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
            <div className={classNames(styles.colorDropdown, { [styles.colorDropdownMobile]: useIsMobile() })}>
                <HexColorPicker
                    color={settings.colors[name]}
                    onChange={(color) => dispatch(setThemeColor({ [name]: color }))}
                />
            </div>
        </div>
    );
}
