import { Chart as _ } from 'chart.js/auto'
import { Line } from "react-chartjs-2";
import useData from '@app/redux/accessors/useSessionData'
import injectAverages from "@app/utils/injectAverages"
import styles from "./chart.module.css"
export default function Chart() {
    let [{ list }] = useData()
    let newList = injectAverages(list)
    return (
        <div className={styles.chart}>
            <Line data={
                {
                    labels: Array(newList.length).fill(0).map((_, i) => i + 1),
                    datasets: [
                        {
                            label: "Single",
                            backgroundColor: "#E2B712",
                            borderColor: "#E2B712",
                            data: newList.map(x => x.derived.mathematicalTime === null ? undefined : x.derived.mathematicalTime / 1000),
                        },
                        {
                            label: "ao5",
                            backgroundColor: "#CA4754",
                            borderColor: "#CA4754",
                            data: newList.map(x => x.derived.mathematicalTime === null ? undefined : parseFloat(x.ao5)),
                            lineTension: 0.25
                        },
                        {
                            label: "mo3",
                            backgroundColor: "#61C9A8",
                            borderColor: "#61C9A8",
                            data: newList.map(x => x.derived.mathematicalTime === null ? undefined : parseFloat(x.mo3)),
                            lineTension: 0.25
                        },
                        {
                            label: "ao12",
                            backgroundColor: "#89D2DC",
                            borderColor: "#89D2DC",
                            data: newList.map(x => x.derived.mathematicalTime === null ? undefined : parseFloat(x.ao12)),
                            lineTension: 0.25
                        },
                    ],
                }
            } options={{
                animation: {
                    duration: 0,
                },
                maintainAspectRatio: false
            }} width={"50%"} />
        </div>
    )
}