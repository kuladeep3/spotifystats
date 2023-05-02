import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
ChartJS.register(ArcElement, Tooltip, Legend);

function PieChart({ data }) {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    width: 600, // set the width to 400 pixels
  };
  return <Doughnut data={data} options={options} />;
}

export default PieChart;
