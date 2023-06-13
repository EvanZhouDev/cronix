'use client'
import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from "./rootSlice";
import { message } from "@app/utils/notify";

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['timer'],
    migrate: (state) => {
        message("Loading new updates...")
        return Promise.resolve(state)
    }
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})

export const persistor = persistStore(store)