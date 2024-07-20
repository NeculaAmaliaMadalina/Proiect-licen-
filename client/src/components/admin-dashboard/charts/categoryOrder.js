import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import axios from "axios";

const CategoryOrderChart = ({ onClick }) => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Number of Orders",
        data: [],
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    const fetchCategoryOrderCounts = async () => {
      try {
        const response = await axios.get("/api/order/category_order_counts");
        const data = response.data;

        if (data && Array.isArray(data)) {
          const labels = data.map((item) => item._id);
          const counts = data.map((item) => item.count);

          const backgroundColors = [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#4BC0C0",
            "#9966FF",
            "#FF9F40",
          ];

          setChartData({
            labels,
            datasets: [
              {
                label: "Number of Orders",
                data: counts,
                backgroundColor: backgroundColors.slice(0, counts.length),
                borderColor: backgroundColors.slice(0, counts.length),
                borderWidth: 1,
              },
            ],
          });
        } else {
          console.error("Invalid data format:", data);
        }
      } catch (error) {
        console.error("Error fetching category order counts:", error);
      }
    };

    fetchCategoryOrderCounts();
  }, []);
  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Topul categoriilor în funcție de comenzi",
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
    <div>
      <div className="pie_graph" onClick={handleChartClick}>
        <Doughnut data={chartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default CategoryOrderChart;
