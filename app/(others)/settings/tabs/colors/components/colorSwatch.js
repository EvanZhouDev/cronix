'use client'
import React from 'react';
import styles from "../../../settings.module.css"
import classNames from 'classnames';
export default function ColorSwatch({ colors, onClick, name, active }) {
    return (
        <div onClick={onClick} className={classNames(styles.swatchButton, { [styles.active]: active })}>
            <div className={styles.swatchBackground} style={{ backgroundColor: colors.bgColor }}>
                <div className={styles.swatchColor} style={{ backgroundColor: colors.highlightColor }}></div>
                <div className={styles.swatchColor} style={{ backgroundColor: colors.fontColorDull }}></div>
                <div className={styles.swatchColor} style={{ backgroundColor: colors.fontColor }}></div>
            </div>
            {name}
        </div>
    );
}
