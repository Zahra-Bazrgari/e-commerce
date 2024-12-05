import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
  TooltipItem,
} from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const WeeklyChart = ({ salesData }: { salesData: Record<string, number> }) => {
  const labels = Object.keys(salesData);
  const data = Object.values(salesData);

  const chartData = {
    labels,
    datasets: [
      {
        label: "Total Sales",
        data,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: TooltipItem<"bar">) => {
            return `Total Sales: ${context.raw}`;
          },
        },
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default WeeklyChart;
