import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import { loadingAnim } from "./widgets/Spinner";

const GoalsChart = (props) => {
    const chartRef = useRef();


    const chartStyle = {
        margin: "2rem",
        marginBottom: "1rem"
    };


    useEffect(() => {
        loadingAnim.show();
        const ctx = chartRef.current.getContext("2d");
        const data = {
            labels: props.labels,
            datasets: [
                {
                    data: props.data,
                    backgroundColor: [
                        "rgba(255, 99, 132, 0.2)",
                        "rgba(54, 162, 235, 0.2)",
                        "rgba(255, 206, 86, 0.2)",
                        "rgba(75, 192, 192, 0.2)",
                        "rgba(153, 102, 255, 0.2)",
                        "rgba(255, 159, 64, 0.2)",
                    ],
                    borderColor: [
                        "rgba(255, 99, 132, 1)",
                        "rgba(54, 162, 235, 1)",
                        "rgba(255, 206, 86, 1)",
                        "rgba(75, 192, 192, 1)",
                        "rgba(153, 102, 255, 1)",
                        "rgba(255, 159, 64, 1)",
                    ],
                    borderWidth: 2,
                },
            ],
        };

        const chartInstance = new Chart(ctx, {
            type: "bar",
            data: data,
            options: {
                plugins: {
                    legend: {
                        position: "none",
                    },
                },
            },
        });


        loadingAnim.hide();

        return () => {
            chartInstance.destroy();
        };
    }, [props.data, props.labels]);

    return <canvas style={chartStyle} ref={chartRef}></canvas>;
};

export default GoalsChart;
