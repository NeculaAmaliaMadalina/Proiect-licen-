import { useState } from "react";
import React from "react";
import { PolarArea } from "react-chartjs-2";

const UsersPolarArea = ({ allUsers, onClick }) => {
  const [chartData, setChartData] = useState(null);
  if (!allUsers || allUsers.length === 0) {
    return <div>Loading...</div>;
  }

  let verifiedUsersCount = 0;
  let unverifiedUsersCount = 0;

  for (let i = 0; i < allUsers.length; i++) {
    if (allUsers[i].verified) {
      verifiedUsersCount++;
    } else {
      unverifiedUsersCount++;
    }
  }

  const polarAreaData = {
    labels: ["Utilizatori Verificați", "Utilizatori Neverificați"],
    datasets: [
      {
        label: "Distribuția Utilizatorilor",
        data: [verifiedUsersCount, unverifiedUsersCount],
        // backgroundColor: ["#36a2eb", "#ff6384"],
        hoverBackgroundColor: ["#36a2eb", "#ff6384"],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      title: {
        display: true,
        text: "Distribuția Utilizatorilor",
        font: {
          size: 20,
        },
      },
    },
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="pie_graph">
      <PolarArea data={polarAreaData} options={chartOptions} />
    </div>
  );
};

export default UsersPolarArea;
