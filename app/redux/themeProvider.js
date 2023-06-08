'use client'
import useSettings from '@redux/accessors/useSettings';
import { useEffect } from 'react';
// A provider wrapper that gives children access to the Redux store
export default function ThemeProvider({ children }) {
    let settings = useSettings()

    useEffect(() => {
        let convertToCSScase = (camelCaseString) => {
            return '--' + camelCaseString.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
        }
        let setColor = () => {
            for (let key in settings.colors) {
                document.documentElement.style.setProperty(convertToCSScase(key), settings.colors[key]);
            }
        }
        setColor()
    }, [settings.colors])

    return (
        <>
            {children}
        </>
    )
}