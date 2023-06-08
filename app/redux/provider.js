'use client'

import { Provider } from 'react-redux'
import { store } from "./store"
import ThemeProvider from './themeProvider'

// A provider wrapper that gives children access to the Redux store
export function Providers({ children }) {
    return (
        <Provider store={store}>
            <ThemeProvider>
                {children}
            </ThemeProvider>
        </Provider>
    )
}