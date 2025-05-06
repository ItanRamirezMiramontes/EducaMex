import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

type ChartComponentProps = {
  data: number[];
  labels: string[];
};

const ChartComponent: React.FC<ChartComponentProps> = ({ data, labels }) => {
  // Configuración de los datos del gráfico
  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "Progreso", // Título del dataset
        data: data, // Los datos que se muestran en el gráfico
        fill: false,
        borderColor: "#4CAF50", // Color de la línea
        tension: 0.1,
      },
    ],
  };

  // Opciones del gráfico
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label}: ${context.raw}`;
          },
        },
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold mb-4">Gráfico de Progreso</h3>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default ChartComponent;
