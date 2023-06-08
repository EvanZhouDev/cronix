import { Chart as _ } from 'chart.js/auto'
import { Line } from "react-chartjs-2";
import useData from '@app/redux/accessors/useSessionData'
import injectAverages from "@app/utils/injectAverages"
import styles from "./chart.module.css"
import useSettings from '@app/redux/accessors/useSettings';
export default function Chart() {
    let [{ list }] = useData()
    let settings = useSettings()
    let newList = injectAverages(list)
    return (
        <div className={styles.chart}>
            <Line data={
                {
                    labels: Array(newList.length).fill(0).map((_, i) => i + 1),
                    datasets: [
                        {
                            label: "Single",
                            backgroundColor: settings.colors.highlightColor,
                            borderColor: settings.colors.highlightColor,
                            data: newList.map(x => x.derived.mathematicalTime === null ? undefined : x.derived.mathematicalTime / 1000),
                        },
                        {
                            label: "ao5",
                            backgroundColor: settings.colors.errorColor,
                            borderColor: settings.colors.errorColor,
                            data: newList.map(x => x.derived.mathematicalTime === null ? undefined : parseFloat(x.ao5)),
                            lineTension: 0.25
                        },
                        {
                            label: "mo3",
                            backgroundColor: settings.colors.greenColor,
                            borderColor: settings.colors.greenColor,
                            data: newList.map(x => x.derived.mathematicalTime === null ? undefined : parseFloat(x.mo3)),
                            lineTension: 0.25
                        },
                        {
                            label: "ao12",
                            backgroundColor: settings.colors.blueColor,
                            borderColor: settings.colors.blueColor,
                            data: newList.map(x => x.derived.mathematicalTime === null ? undefined : parseFloat(x.ao12)),
                            lineTension: 0.25
                        },
                    ],
                }
            } options={{
                animation: {
                    duration: 0,
                },
                plugins: {
                    legend: {
                        labels: {
                            color: settings.colors.fontColor // Set the font color to white
                        }
                    }
                },
                maintainAspectRatio: false
            }} width={"50%"} />
        </div>
    )
}