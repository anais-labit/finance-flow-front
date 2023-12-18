import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import { getRelativePosition } from "chart.js/helpers";
import "../assets/css/CategorySummary.css";

function CategorySummary({ transactions }) {
  useEffect(() => {
    const canvas = document.getElementById("ctx");
    const ctx = canvas.getContext("2d");

    console.log(transactions);

    // Utiliser reduce pour effectuer les calculs
    const result = transactions.reduce(
      (acc, { subcategory_id, amount }) => {
        // Vérifier si l'id est compris entre 1 et 8
        if (subcategory_id >= 1 && subcategory_id <= 8) {
          // Additionner le montant pour les id entre 1 et 8
          acc.total += amount;
        } else {
          // Soustraire le montant pour les autres id
          acc.total -= amount;
        }

        return acc;
      },
      { total: 0 }
    );

    console.log("Résultat total :", result.total);

    // Your chart data
    const data = [
      { year: 2010, count: 10 },
      { year: 2011, count: 20 },
      { year: 2012, count: 15 },
      { year: 2013, count: 25 },
      { year: 2014, count: 22 },
      { year: 2015, count: 30 },
      { year: 2016, count: 28 },
    ];

    const chart = new Chart(ctx, {
      type: "line",
      data: {
        datasets: [
          {
            label: "Count",
            data: data,
            borderColor: "rgb(75, 192, 192)",
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "linear",
            position: "bottom",
          },
          y: {
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
  }, []); // Empty dependency array ensures that this effect runs once after the initial render

  return (
    <div className="category-summary">
      <h2>Summary by Category</h2>
      <div style={{ width: "800px" }}>
        <canvas id="ctx"></canvas>
      </div>
      {/* Display summary here */}
    </div>
  );
}

export default CategorySummary;
