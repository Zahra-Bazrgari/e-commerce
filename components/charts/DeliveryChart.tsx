import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = ({ data }: { data: Array<{ label: string; value: number }> }) => {
  const chartData = {
    labels: data.map(d => d.label),
    datasets: [
      {
        data: data.map(d => d.value),
        backgroundColor: ["rgb(40, 208, 148)", "rgb(255, 110, 19)"],
      },
    ],
  };

  return <Pie data={chartData} />;
};

export default PieChart;
