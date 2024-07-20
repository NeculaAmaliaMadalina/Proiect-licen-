import React, { useEffect, useState } from "react";
import "chart.js/auto";
import { Chart } from "react-chartjs-2";

const OrdersChart = ({ ordersData, onClick }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (ordersData) {
      const dates = Object.keys(ordersData).map((date) =>
        new Date(date).toLocaleDateString()
      );
      const totalOrders = Object.values(ordersData).map((value) =>
        Math.floor(value)
      );

      const data = {
        labels: dates,
        datasets: [
          {
            label: "Număr total de comenzi",
            data: totalOrders,
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1,
          },
        ],
      };

      setChartData(data);
    }
  }, [ordersData]);

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Număr total de comenzi pe zile",
        font: {
          size: 20,
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  const handleChartClick = () => {
    onClick && onClick();
  };

  return (
    <div className="graph" onClick={handleChartClick}>
      {chartData && (
        <Chart type="line" data={chartData} options={chartOptions} />
      )}
    </div>
  );
};

export default OrdersChart;
