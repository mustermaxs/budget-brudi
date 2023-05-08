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
                    backgroundColor: props.colors,
                    borderColor: props.colors,
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
