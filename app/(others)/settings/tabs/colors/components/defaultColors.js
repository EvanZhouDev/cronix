import React, { useState } from 'react';
import styles from '../../../settings.module.css';
import { useDispatch } from 'react-redux';
import { setThemeColor } from '@app/redux/slices/sessions/settings';
import ColorSwatch from './colorSwatch';
import useSettings from '@app/redux/accessors/useSettings';
import { FiChevronDown, FiChevronRight } from 'react-icons/fi';
import useCustomToaster from "@app/utils/notify";
import classNames from 'classnames';
import useIsMobile from '@app/utils/useIsMobile';

export default function DefaultColorsSection() {
    let { error, success } = useCustomToaster();
    const settings = useSettings();
    const dispatch = useDispatch();
    const keyToNameMap = {
        default: 'Serika',
        serikaLight: 'Serika (Light)',
        botanical: 'Botanical',
        camping: 'Camping',
        nord: 'Nord',
        nordLight: 'Nord (Light)',
        dark: 'Dark',
        light: 'Light',
    };
    const themes = {
        default: {
            bgColor: '#323437',
            darkerBgColor: '#2c2e31',
            fontColor: '#d1d0c5',
            fontColorDull: '#646669',
            highlightColor: '#e2b712',
            errorColor: '#ca4754',
            greenColor: '#61c9a8',
            blueColor: '#89d2dc',
        },
        serikaLight: {
            bgColor: '#E1E1E3',
            darkerBgColor: '#D1D3D9',
            fontColor: '#323437',
            fontColorDull: '#AAAEB2',
            highlightColor: '#E2B712',
            errorColor: '#ca4754',
            greenColor: '#61c9a8',
            blueColor: '#89d2dc',
        },
        botanical: {
            bgColor: '#7B9C98',
            darkerBgColor: '#72908D',
            fontColor: '#EAF1F3',
            fontColorDull: '#495755',
            highlightColor: '#EAF1F3',
            errorColor: '#FF7D7D',
            greenColor: '#61c9a8',
            blueColor: '#89d2dc',
        },
        camping: {
            bgColor: '#FAF1E4',
            darkerBgColor: '#E7DCCB',
            fontColor: '#3C403B',
            fontColorDull: '#C2B8AB',
            highlightColor: '#618C55',
            errorColor: '#FF7D7D',
            greenColor: '#61c9a8',
            blueColor: '#89d2dc',
        },
        nord: {
            bgColor: '#242933',
            darkerBgColor: '#1B1F27',
            fontColor: '#D8DEE9',
            fontColorDull: '#617B94',
            highlightColor: '#D8DEE9',
            errorColor: '#BF616A',
            greenColor: '#61c9a8',
            blueColor: '#89d2dc',
        },
        nordLight: {
            bgColor: '#EBEFF5',
            darkerBgColor: '#D8DEE9',
            fontColor: '#8FBCBB',
            fontColorDull: '#697791',
            highlightColor: '#8FBCBB',
            errorColor: '#BF616A',
            greenColor: '#61c9a8',
            blueColor: '#89d2dc',
        },
        dark: {
            bgColor: '#111111',
            darkerBgColor: '#191919',
            fontColor: '#EEEEEE',
            fontColorDull: '#3E3E3E',
            highlightColor: '#EEEEEE',
            errorColor: '#D93232',
            greenColor: '#61c9a8',
            blueColor: '#89d2dc',
        },
        light: {
            bgColor: '#EEEEEE',
            darkerBgColor: '#CFCFCF',
            fontColor: '#111111',
            fontColorDull: '#9A9A9A',
            highlightColor: '#111111',
            errorColor: '#D93232',
            greenColor: '#61c9a8',
            blueColor: '#89d2dc',
        },
    };

    const [showDropdown, setShowDropdown] = useState(false);
    let isMobile = useIsMobile();

    const toggleDropdown = () => {
        setShowDropdown((prevShowDropdown) => !prevShowDropdown);
    };

    const rows = Object.keys(themes).reduce((acc, key, index) => {
        const rowIndex = Math.floor(index / 3);
        if (!acc[rowIndex]) {
            acc[rowIndex] = [];
        }
        acc[rowIndex].push(key);
        return acc;
    }, []);

    const firstRow = rows[0];

    return (
        <div className={classNames(styles.themeSection, { [styles.themeSectionMobile]: isMobile })}>
            <span className={styles.currentTheme}>
                Current theme: {keyToNameMap[Object.keys(themes).find(
                    (themeKey) =>
                        JSON.stringify(settings.colors) === JSON.stringify(themes[themeKey])
                )] ?? "Custom"}
            </span>
            <div className={styles.colorSwatchRow}>
                {firstRow.map((themeKey) => (
                    <ColorSwatch
                        key={keyToNameMap[themeKey]}
                        colors={themes[themeKey]}
                        name={keyToNameMap[themeKey]}
                        onClick={() => {
                            dispatch(setThemeColor(themes[themeKey]))
                            success(`Set theme to ${keyToNameMap[themeKey]}.\nLook at those pretty colors!`)
                        }}
                        active={JSON.stringify(settings.colors) === JSON.stringify(themes[themeKey])}
                    />
                ))}
            </div>
            <div className={styles.moreButton} onClick={toggleDropdown}>{showDropdown ? <><FiChevronDown /> Hide additional themes</> : <><FiChevronRight /> Show additional themes</>}</div>
            {showDropdown && (
                <div className={classNames(styles.colorSwatchSection, { [styles.colorSwatchSectionMobile]: isMobile })}>
                    {rows.slice(1).map((row, rowIndex) => (
                        <div key={rowIndex} className={styles.colorSwatchRow}>
                            {row.map((themeKey) => (
                                <ColorSwatch
                                    key={keyToNameMap[themeKey]}
                                    colors={themes[themeKey]}
                                    name={keyToNameMap[themeKey]}
                                    onClick={() => {
                                        dispatch(setThemeColor(themes[themeKey]))
                                        success(`Set theme to ${keyToNameMap[themeKey]}.\nLook at those pretty colors!`)
                                    }}
                                    active={JSON.stringify(settings.colors) === JSON.stringify(themes[themeKey])}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}