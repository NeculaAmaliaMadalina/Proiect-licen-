import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";

const OrdersPaymentMethodPieChart = ({ ordersData, onClick }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    if (ordersData && ordersData.length > 0) {
      const cardPayments = ordersData.filter(
        (order) => order.paymentInfo.method === "card"
      ).length;
      const cashPayments = ordersData.filter(
        (order) => order.paymentInfo.method === "cash"
      ).length;

      const data = {
        labels: ["Card", "Cash"],
        datasets: [
          {
            label: "Metoda de plată",
            data: [cardPayments, cashPayments],
            backgroundColor: ["#36a2eb", "#ff6384"],
            hoverBackgroundColor: ["#36a2eb", "#ff6384"],
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
        text: "Metoda de plată a comenzilor",
        font: {
          size: 20,
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
    <div className="pie_graph" onClick={handleChartClick}>
      {chartData && <Pie data={chartData} options={chartOptions} />}
    </div>
  );
};

export default OrdersPaymentMethodPieChart;
