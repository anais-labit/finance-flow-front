import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import "../assets/css/CategorySummary.css";

function CategorySummary({ transactions }) {
  useEffect(() => {
    const canvas = document.getElementById("ctx1");
    const ctx1 = canvas.getContext("2d");

    const groupedTransactions = transactions.reduce(
      (acc, { subcategory_name, subcategory_id, amount }) => {
        if (!acc[subcategory_name]) {
          acc[subcategory_name] = { total: 0, transactions: [] };
        }

        acc[subcategory_name].total += amount;
        acc[subcategory_name].transactions.push({
          subcategory_name,
          subcategory_id,
          amount,
        });

        return acc;
      },
      {}
    );

    const labels = Object.keys(groupedTransactions);
    const data = labels.map(
      (subcategory_name) => groupedTransactions[subcategory_name].total
    );

    const chart1 = new Chart(ctx1, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Total Amount",
            data: data,
            backgroundColor: labels.map((subcategory_name) => {
              const subcategory_id =
                groupedTransactions[subcategory_name].transactions[0]
                  .subcategory_id;

              if (subcategory_id <= 8) {
                return "rgba(255, 0, 0, 0.5)";
              } else {
                return "rgba(0, 255, 0, 0.4)";
              }
            }),
            borderWidth: 3,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: "category",
            position: "bottom",
            grid: {
              display: false,
            },
          },
          y: {
            beginAtZero: true,
            type: "linear",
            position: "left",
            stepSize: 1,
            grid: {
              display: false,
            },
          },
        },
        plugins: {
          legend: {
            display: false,
          },
        },
      },
    });

    return () => {
      chart1.destroy();
    };
  }, []);

  return (
    <div className="category-summary">
      <div style={{ width: "300px" }}>
        <canvas id="ctx1"></canvas>
      </div>
    </div>
  );
}

export default CategorySummary;
