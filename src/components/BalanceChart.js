import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";

const BalanceChart = (props) => {
    const chartRef = useRef();

    useEffect(() => {
        const ctx = chartRef.current.getContext("2d");
        const data = {
            labels: props.labels,
            datasets: [
                {
                    label: "Balance",
                    data: props.data,
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: "rgba(54, 162, 235, 1)",
                    borderWidth: 2,
                },
                {
                    label: "Balance Goal",
                    data: props.goalData,
                    backgroundColor: "rgba(75, 192, 75, 0.2)",
                    borderColor: "rgba(75, 192, 75, 1)",
                    borderWidth: 3,
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
            type: "line",
            data: data,
            options: options,
        });

        return () => {
            chartInstance.destroy();
        };
    }, [props.labels, props.data, props.goalData]);

    return <canvas style={props.style} ref={chartRef}></canvas>;
};

export default BalanceChart;
