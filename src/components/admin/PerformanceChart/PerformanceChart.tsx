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

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

type PerformanceChartProps = {
  data: number[];
  labels: string[];
};

const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data,
  labels,
}) => {
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Avance Promedio",
        data: data,
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Avance Promedio</h3>
      <Bar data={chartData} options={chartOptions} />
    </div>
  );
};

export default PerformanceChart;
