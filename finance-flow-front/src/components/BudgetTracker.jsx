import React, { useEffect } from "react";
import Chart from "chart.js/auto";
import "../assets/css/BudgetTracker.css";

function BudgetTracker({ transactions }) {
  useEffect(() => {
    const canvas = document.getElementById("ctx2");
    const ctx2 = canvas.getContext("2d");

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

    const chart2 = new Chart(ctx2, {
      type: "doughnut",
      data: {
        labels: labels,
        datasets: [
          {
            data: data,
            borderWidth: 3,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: true,
            position: "right",
          },
        },
      },
    });

    return () => {
      chart2.destroy();
    };
  }, [transactions]);

  return (
    <div className="budget-tracker">
      <div style={{ width: "300px" }}>
        <canvas id="ctx2"></canvas>
      </div>
    </div>
  );
}

export default BudgetTracker;
