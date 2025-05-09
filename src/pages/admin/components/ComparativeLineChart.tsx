import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

interface ChartProps {
  studentsData: number[];
  professorsData: number[];
  institutionsData: number[];
  usersData: number[];
  labels: string[];
}

const ComparativeLineChart: React.FC<ChartProps> = ({
  studentsData,
  professorsData,
  institutionsData,
  labels,
}) => {
  const data = {
    labels,
    datasets: [
      {
        label: "Estudiantes Nuevos",
        data: studentsData,
        borderColor: "rgba(75,192,192,1)",
        backgroundColor: "rgba(75,192,192,0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Profesores Nuevos",
        data: professorsData,
        borderColor: "rgba(153,102,255,1)",
        backgroundColor: "rgba(153,102,255,0.2)",
        fill: true,
        tension: 0.4,
      },
      {
        label: "Instituciones Nuevas",
        data: institutionsData,
        borderColor: "rgba(255,159,64,1)",
        backgroundColor: "rgba(255,159,64,0.2)",
        fill: true,
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Comparativa de Nuevos Registros por Mes",
      },
    },
    scales: {
      x: {
        beginAtZero: true,
      },
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={data} options={options} />;
};

export default ComparativeLineChart;
