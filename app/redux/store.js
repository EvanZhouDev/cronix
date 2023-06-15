'use client'
import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import rootReducer from "./rootSlice";

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['timer'],
    migrate: (state) => {
        return Promise.resolve(state)
    }
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})

export const persistor = persistStore(store)