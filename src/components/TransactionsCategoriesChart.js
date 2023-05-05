import React, { useRef, useEffect, useMemo } from "react";
import Chart from "chart.js/auto";
import { loadingAnim } from "./widgets/Spinner";

function getSortedData(data, labels) {
    let sortedData = data
        .map((value, index) => ({ value, label: labels[index] }))
        .sort((a, b) => b.value - a.value);

    let sortedLabels = sortedData.map((entry) => entry.label);
    let sortedValues = sortedData.map((entry) => entry.value);

    return { sortedLabels, sortedValues };
}

const TransactionsCategoriesChart = ({data, labels, title}) => {
    const chartRef = useRef();
    const {sortedLabels, sortedValues} = useMemo(() => {
        return getSortedData(data, labels);
    }, [data, labels]);

    const chartStyle = {
        margin: "2rem",
        marginBottom: "1rem"
    };

    const titleStyle = {
        marginTop: "0"
    }

    useEffect(() => {
        loadingAnim.show();
        const ctx = chartRef.current.getContext("2d");
        const data = {
            labels: sortedLabels,
            datasets: [
                {
                    data: sortedValues,
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
                    borderWidth: 1,
                },
            ],
        };

        const chartInstance = new Chart(ctx, {
            type: "pie",
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
    }, [sortedValues, sortedLabels]);

    return <canvas style={chartStyle} ref={chartRef}></canvas>;
};

export default TransactionsCategoriesChart;
