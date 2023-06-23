import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import { loadingAnim } from "./widgets/Spinner";

const BalanceChart = (props) => {
    const chartRef = useRef();

    useEffect(() => {
        const ctx = chartRef.current.getContext("2d");

        let balancesRadius = Array(props.balances.length).fill(3);
        balancesRadius[balancesRadius.length - 1] = 0;

        const data = {
            labels: props.labels,
            datasets: [
                {
                    type: 'line',
                    label: "Balance",
                    data: props.balances.map(data => data.net),
                    backgroundColor: "rgba(54, 162, 235, 0.2)",
                    borderColor: "rgba(54, 162, 235, 1)",
                },
                {
                    type: 'bar',
                    label: "Income",
                    data: props.balances.map(data => data.income),
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    stack: 'Stack 0',
                },
                {
                    type: 'bar',
                    label: "Expenses",
                    data: props.balances.map(data => data.expense),
                    backgroundColor: "rgba(192, 75, 75, 0.2)",
                    borderColor: "rgba(192, 75, 75, 1)",
                    stack: 'Stack 0',
                },
                {
                    type: 'line',
                    label: "Forecast",
                    data: props.forecast,
                    pointRadius: balancesRadius,
                    backgroundColor: "rgba(173, 216, 230, 0.2)",
                    borderColor: "rgba(173, 216, 230, 1)",
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
                    stacked: true,
                },
                x: {
                    beginAtZero: true,
                    stacked: true,
                }
            },
        };

        const chartInstance = new Chart(ctx, {
            type: "bar",
            data: data,
            options: options,
        });

        return () => {
            chartInstance.destroy();
        };
    }, [props.balances, props.labels]);

    return <canvas style={props.style} ref={chartRef}></canvas>;
};

export default BalanceChart;
