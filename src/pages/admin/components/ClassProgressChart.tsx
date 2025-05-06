// src/components/ClassProgressChart.tsx
import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ClassProgressChartProps {
  data: number[];
  labels: string[];
}

const ClassProgressChart: React.FC<ClassProgressChartProps> = ({
  data,
  labels,
}) => {
  const chartData = {
    labels,
    datasets: [
      {
        label: "Progreso de Clases",
        data,
        backgroundColor: "rgba(59, 130, 246, 0.5)", // Azul claro
        borderColor: "rgba(59, 130, 246, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Progreso de Clases por Mes",
      },
    },
  };

  return (
    <div className="w-full max-w-screen-xl mx-auto my-6">
      <div className="bg-white rounded-lg shadow-md p-4 h-[220px]">
        <Bar data={chartData} options={options} />
      </div>
    </div>
  );
};

export default ClassProgressChart;
