import calcAvg from "./calculateAvg"
export default function injectAverages(originalList) {
    let list = structuredClone(originalList)
    let mathTimeList = list.map(x => x.derived.mathematicalTime)
    for (let i = 0; i < list.length; i++) {
        let currentSlice = mathTimeList.slice(0, i + 1).map(x => x === null ? Infinity : x)
        list[i].mo3 = calcAvg(currentSlice, "mo", 3)
        list[i].ao5 = calcAvg(currentSlice, "ao", 5)
        list[i].ao12 = calcAvg(currentSlice, "ao", 12)
    }
    return list
}