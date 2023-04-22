'use client'
import { configureStore } from "@reduxjs/toolkit";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import reduceReducers from "reduce-reducers";
import rootReducer from "./slices/rootSlice";
const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['timerData']
}


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: [thunk]
})

export const persistor = persistStore(store)