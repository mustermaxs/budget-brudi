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
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                },
            ],
        };

        const options = {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
            plugins: {
                legend: {
                    display: false,
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
    }, [props.labels, props.data]);


    return <canvas style={props.style} ref={chartRef}></canvas>;
};

export default BalanceChart;
