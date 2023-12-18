import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import { getRelativePosition } from "chart.js/helpers";
import "../assets/css/CategorySummary.css";

function CategorySummary({ transactions }) {
  useEffect(() => {
    const canvas = document.getElementById("ctx");
    const ctx = canvas.getContext("2d");

    const groupedTransactions = transactions.reduce(
      (acc, { subcategory_name, amount }) => {
        if (!acc[subcategory_name]) {
          acc[subcategory_name] = { total: 0, transactions: [] };
        }

        acc[subcategory_name].total += amount;
        acc[subcategory_name].transactions.push({ subcategory_name, amount });

        return acc;
      },
      {}
    );

    // Extracting category labels and corresponding total amounts
    const labels = Object.keys(groupedTransactions);
    const data = labels.map(
      (subcategory_name) => groupedTransactions[subcategory_name].total
    );

    const chart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Total Amount",
            data: data,
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "category",
            position: "bottom",
          },
          y: {
            beginAtZero: true,
            type: "linear",
            position: "left",
          },
        },
        onClick: (e) => {
          const canvasPosition = getRelativePosition(e, chart);

          const dataX = chart.options.scales.x.getValueForPixel(
            canvasPosition.x
          );
          const dataY = chart.options.scales.y.getValueForPixel(
            canvasPosition.y
          );

          console.log("Clicked dataX:", dataX);
          console.log("Clicked dataY:", dataY);
        },
      },
    });

    // Cleanup function (optional)
    return () => {
      chart.destroy(); // Destroy the chart instance if the component is unmounted
    };
  }, [transactions]);

  return (
    <div className="category-summary">
      <h2>Summary by Category</h2>
      <div style={{ width: "800px" }}>
        <canvas id="ctx"></canvas>
      </div>
    </div>
  );
}

export default CategorySummary;
