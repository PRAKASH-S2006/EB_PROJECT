import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

function Statis() {
  const [selectedType, setSelectedType] = useState("month");

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    fetchData(selectedType);
  }, [selectedType]);

  const fetchData = async (type) => {
    try {
      const response = await fetch(
        `https://eb-backend.onrender.com/api/connectionRequest/?type=${type}`
      );

      const result = await response.json();

      console.log(result);

      drawChart(result.label, result.total_RQ);
    } catch (err) {
      console.log(err);
    }
  };

  const drawChart = (labels, values) => {
    if (!chartRef.current) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Connection Requests",
            data: values,
            backgroundColor: "rgba(235, 105, 54, 0.5)",
            borderColor: "rgb(235, 54, 54)",
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Statistics</h1>

      <button onClick={() => setSelectedType("month")}>
        Month Wise
      </button>

      <button
        onClick={() => setSelectedType("status")}
        style={{ marginLeft: "10px" }}
      >
        Status Wise
      </button>

      <div
        style={{
          width: "900px",
          height: "500px",
          marginTop: "20px",
        }}
      >
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
}

export default Statis;