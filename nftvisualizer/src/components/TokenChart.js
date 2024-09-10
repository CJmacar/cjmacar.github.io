// src/components/TokenChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

export const TokenChart = ({ historicalData }) => {
  const chartData = {
    labels: historicalData.map(data => new Date(data[0]).toLocaleDateString()),
    datasets: [
      {
        label: 'STX Price (USD)',
        data: historicalData.map(data => data[1]),
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
    ],
  };

  const options = {
    scales: {
      x: { display: true, title: { display: true, text: 'Date' } },
      y: { display: true, title: { display: true, text: 'Price (USD)' } },
    },
  };

  return <Line data={chartData} options={options} />;
};
