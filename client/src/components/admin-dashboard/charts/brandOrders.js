import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";

const BrandOrderChart = ({ onClick }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Number of Orders",
        data: [],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchBrandOrderCounts = async () => {
      try {
        const response = await axios.get("/api/order/brand_order_counts");
        const data = response.data;
        if (data && Array.isArray(data)) {
          const labels = data.map((item) => item._id);
          const counts = data.map((item) => item.count);

          setChartData({
            labels,
            datasets: [
              {
                label: "Number of Orders",
                data: counts,
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
              },
            ],
          });
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error fetching brand order counts:", error);
      }
    };

    fetchBrandOrderCounts();
  }, []);

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Topul brandurilor în funcție de comenzi",
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
    <div className="graph" onClick={handleChartClick}>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default BrandOrderChart;
