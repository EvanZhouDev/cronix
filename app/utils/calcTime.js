import { Penalty } from '@utils/enums';
export default function calcTime(time, penalty) {
    let mathematicalTime = time;
    if (penalty === Penalty.PLUS2) mathematicalTime += 2000;

    const seconds = Math.floor(mathematicalTime / 1000) % 60;
    const minutes = Math.floor(mathematicalTime / (1000 * 60)) % 60;
    const hours = Math.floor(mathematicalTime / (1000 * 60 * 60));

    const formattedMilliseconds = String(mathematicalTime % 1000).padStart(3, "0");
    const formattedSeconds = String(seconds);

    let strTime = ""

    if (hours > 0) {
        const formattedMinutes = String(minutes).padStart(2, "0");
        strTime = `${hours}:${formattedMinutes}:${formattedSeconds}.${formattedMilliseconds}`;
    } else if (minutes > 0) {
        strTime = `${minutes}:${formattedSeconds}.${formattedMilliseconds}`;
    } else if (seconds > 0) {
        strTime = `${formattedSeconds}.${formattedMilliseconds}`;
    } else {
        strTime = `0.${formattedMilliseconds}`;
    }

    let preciseTime = strTime
    strTime = strTime.slice(0, strTime.length - 1);

    if (penalty === Penalty.DNF) {
        strTime = `DNF(${strTime})`
        preciseTime = `DNF(${preciseTime})`
    }
    if (penalty === Penalty.PLUS2) {
        strTime = `${strTime}+`
        preciseTime = `${preciseTime}+`
    }

    // Set this last because we still want format to work on normal time
    if (penalty === Penalty.DNF) mathematicalTime = Infinity;
    return {
        mathematicalTime,
        formattedTime: strTime,
        formattedTimePrecise: preciseTime
    }
}