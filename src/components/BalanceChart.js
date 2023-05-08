import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import { loadingAnim } from "./widgets/Spinner";

const BalanceChart = (props) => {
    const chartRef = useRef();

    useEffect(() => {
        loadingAnim.show();
        const ctx = chartRef.current.getContext("2d");
        const data = {
            labels: props.labels,
            datasets: [
                {
                    type: 'line',
                    label: "Balance",
                    data: props.data,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: "rgba(54, 162, 235, 1)",
                },
                {
                    type: 'bar',
                    label: "Balance Goal",
                    data: props.goalData,
                    backgroundColor: "rgba(75, 192, 75, 0.2)",
                    borderColor: "rgba(75, 192, 75, 1)",
                },
            ],
        };

        const options = {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        };

        const chartInstance = new Chart(ctx, {
            type: "mixed",
            data: data,
            options: options,
        });

        loadingAnim.hide();

        return () => {
            chartInstance.destroy();
        };
    }, [props.data, props.goalData, props.labels]);

    return <canvas style={props.style} ref={chartRef}></canvas>;
};

export default BalanceChart;
