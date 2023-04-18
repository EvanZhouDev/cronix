'use client'

import { Provider } from 'react-redux'
import { store } from "./store"

// A provider wrapper that gives children access to the Redux store
export function Providers({ children }) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}