import React from "react";
import { Bar } from "react-chartjs-2";

const NumberOfReturs = ({ allReturs, onClick }) => {
  if (!allReturs || allReturs.length === 0) {
    return <div>Loading...</div>;
  }
  const countReturns = (returs) => {
    let returnCounts = {};

    for (let i = 0; i < returs.length; i++) {
      const returnReason = returs[i].returnReason;
      returnCounts[returnReason] = (returnCounts[returnReason] || 0) + 1;
    }

    return returnCounts;
  };

  const returnCounts = countReturns(allReturs);

  const chartData = {
    labels: Object.keys(returnCounts),
    datasets: [
      {
        label: "Număr de Retururi",
        data: Object.values(returnCounts),
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Număr de Retururi în funcție de Motiv",
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

export default NumberOfReturs;
