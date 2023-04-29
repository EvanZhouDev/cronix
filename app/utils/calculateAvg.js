import calcTime from "@app/utils/calcTime";

export default function calcAvg(list, type, amount) {
    if (list.length < amount) return "...";
    list = list.slice(list.length - amount);

    if (type === "bo") {
        // best of avg
        return calcTime(Math.min(...list)).formattedTimePrecise;
    }
    if (type === "mo") {
        // mean of avg
        return calcTime(
            Math.round(list.reduce((a, b) => a + b, 0) / list.length)
        ).formattedTimePrecise;
    }
    if (type === "ao") {
        // average of avg, remove worst and best, then take mean
        let worst = Math.max(...list);
        let best = Math.min(...list);
        list.splice(list.indexOf(worst), 1);
        list.splice(list.indexOf(best), 1);
        return calcTime(
            Math.round(list.reduce((a, b) => a + b, 0) / list.length)
        ).formattedTimePrecise;
    }
};