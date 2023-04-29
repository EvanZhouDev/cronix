import useData from '@app/redux/accessors/useSessionData'
import injectAverages from "@app/utils/injectAverages"
import styles from "./statModule.module.css"
export default function StatModule() {
    let [{ list }] = useData()
    let newList = injectAverages(list)
    let bestSingle = Math.min(...newList.map(x => parseFloat(x.derived.mathematicalTime)).filter(x => !isNaN(x)))
    let bestAo5 = Math.min(...newList.map(x => parseFloat(x.ao5)).filter(x => !isNaN(x)))
    let bestAo12 = Math.min(...newList.map(x => parseFloat(x.ao12)).filter(x => !isNaN(x)))
    let bestMo3 = Math.min(...newList.map(x => parseFloat(x.mo3)).filter(x => !isNaN(x)))

    function calculateStandardDeviation(arr) {
        // Step 1: Calculate the mean of "mathematicalTime" entries
        const sum = arr.reduce((acc, obj) => acc + (obj.derived.mathematicalTime / 1000), 0);
        const mean = sum / arr.length;

        // Step 2: Calculate the squared differences from the mean
        const squaredDifferences = arr.map(obj => ((obj.derived.mathematicalTime / 1000) - mean) ** 2);

        // Step 3: Calculate the mean of squared differences
        const squaredDifferencesSum = squaredDifferences.reduce((acc, val) => acc + val, 0);
        const meanOfSquaredDifferences = squaredDifferencesSum / arr.length;

        // Step 4: Calculate the square root of the mean of squared differences
        const standardDeviation = Math.sqrt(meanOfSquaredDifferences);

        return standardDeviation;
    }

    return (
        <div className={styles.stat}>
            <div>
                Single: {newList[newList.length - 1].derived.formattedTimePrecise}
                <br />
                Best single: {bestSingle === Infinity ? "..." : bestSingle / 1000}
            </div>
            <div>
                ao5: {newList[newList.length - 1].ao5}
                <br />
                Best ao5: {bestAo5 === Infinity ? "..." : bestAo5}
            </div>
            <div>
                mo3: {newList[newList.length - 1].mo3}
                <br />
                Best mo3: {bestMo3 === Infinity ? "..." : bestMo3}
            </div>
            <div>
                ao12: {newList[newList.length - 1].ao12}
                <br />
                Best ao12: {bestAo12 === Infinity ? "..." : bestAo12}
            </div>
            <div>
                Standard Deviation:
                <br />
                {Math.round(calculateStandardDeviation(newList) * 1000) / 1000} seconds
            </div>
        </div>
    )
}