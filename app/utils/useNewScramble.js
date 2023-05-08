'use client'

import { randomScrambleForEvent } from "cubing/scramble";
import { setScramble } from "@app/redux/slices/sessions/operations";
import { setDebug } from "cubing/search";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useData from "@app/redux/accessors/useSessionData";
import { SCRAMBLE_LOADING_MSG } from "./constants";

export default function useNewScramble(event) {
    let [sessionData, session] = useData();
    let dispatch = useDispatch();

    if (!event) event = sessionData.event;

    setDebug({
        logPerf: false,
        scramblePrefetchLevel: "none",
        forceStringWorker: true
    });

    // Function to generate scramble
    async function genScramble(myEvent = sessionData.event) {
        dispatch(setScramble({ scramble: SCRAMBLE_LOADING_MSG, destination: session }));
        const scramble = await randomScrambleForEvent(myEvent);
        dispatch(setScramble({ scramble: scramble.toString(), destination: session }));
    }

    // Function to cancel ongoing requests
    function cancelRequests() {
        // isCancelled = true;
    }

    return { genScramble, cancelRequests };
}