import { persistor } from "./store"
import { PersistGate } from 'redux-persist/integration/react';

// An abstracted PresistGate to prevent displaying until LocalStorage is loaded
export default function Gate({ children }) {
    return (
        <PersistGate loading={null} persistor={persistor}>
            {children}
        </PersistGate>
    )
}