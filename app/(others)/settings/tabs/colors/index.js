'use client'
import React, { useEffect } from 'react';
import styles from '../../settings.module.css';
import { useState } from 'react';
import Section from "../components/section"
import { setThemeColor } from '@app/redux/slices/sessions/settings';
import useSettings from '@app/redux/accessors/useSettings';
import useStore from "@app/redux/accessors/useStore"
import { useDispatch } from 'react-redux';
import Gate from "@redux/gate"
import ColorPicker from './components/colorPicker';
import DefaultColorsSection from './components/defaultColors';
import { FiCopy, FiArrowRight } from 'react-icons/fi';
import classNames from 'classnames';
import { error, success } from "@app/utils/notify";
import useIsMobile from '@app/utils/useIsMobile';
export default function Colors() {
    let settings = useSettings()
    let isMobile = useIsMobile()
    // console.log(useStore(), settings)
    const [inputValue, setInputValue] = useState(JSON.stringify(settings.colors));
    let dispatch = useDispatch()
    const handleGoButton = () => {
        try {
            const parsedColors = JSON.parse(inputValue);
            dispatch(setThemeColor(parsedColors));
            success("Successfully loaded color scheme.")
        } catch {
            error("Color theme save given cannot be parsed.")
        }
    };

    useEffect(() => {
        setInputValue(JSON.stringify(settings.colors));
    }, [settings.colors])

    return (
        <div className={styles.tabContent}>
            <h2>Preset Color Themes</h2>
            <DefaultColorsSection />
            <h2>Customize Color Themes</h2>
            <Section
                title="Background Color"
                description="Background color of the app."
                input={
                    <ColorPicker name="bgColor" />
                }
            />
            <Section
                title="Primary Color"
                description="Highlight color of the app."
                input={
                    <ColorPicker name="highlightColor" />
                }
            />
            <Section
                title="Secondary Color"
                description="Used instead of the background sometimes."
                input={
                    <ColorPicker name="darkerBgColor" />
                }
            />
            <Section
                title="Font Color"
                description="Main font color of the app."
                input={
                    <ColorPicker name="fontColor" />
                }
            />
            <Section
                title="Secondary Font Color"
                description="Used as a less obvious font color."
                input={
                    <ColorPicker name="fontColorDull" />
                }
            />
            <Section
                title="Error Color"
                description="Usually red. Used as a warning color."
                input={
                    <ColorPicker name="errorColor" />
                }
            />
            <Section
                title="Green Color"
                description="Used for edit and approve."
                input={
                    <ColorPicker name="greenColor" />
                }
            />
            <Section
                title="Blue Color"
                description="Used in graphs and other multicolor experiences."
                input={
                    <ColorPicker name="blueColor" />
                }
            />
            {/* <Section
                        title="Show Confetti"
                        description="Show confetti animations when you get a new PB single."
                        input={
                            <span className={styles.checkbox}>
                                <input type="checkbox" checked={settings.useConfetti} />
                                <span className={styles.wrapper} onClick={(e) => { dispatch(setUseConfetti(!settings.useConfetti)) }}>
                                    <span className={styles.knob}></span>
                                </span>
                            </span>
                        }
                    /> */}

            <h2>Import and Export Themes</h2>
            <p>Copy following text to save. Paste it into any Cronix timer, and your theme will be restored there.</p>
            <span className={classNames(styles.settingsSection, { [styles.settingsSectionMobile]: isMobile })}>
                <input
                    value={inputValue}
                    className={classNames(styles.settingsInput, styles.importInput, { [styles.importInputMobile]: isMobile })}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <div className={classNames(styles.importButton)} onClick={() => {
                    success(`Copied theme.`)
                    navigator.clipboard.writeText(inputValue);
                }}>
                    <FiCopy size={20} />
                </div>
                <div className={styles.importButton} onClick={handleGoButton}>
                    <FiArrowRight size={20} />
                </div>
            </span>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
        </div >
    );
}
