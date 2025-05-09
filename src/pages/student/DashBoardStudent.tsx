import React from "react";
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

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// Componente OverviewCards
function OverviewCards({ performanceData }: { performanceData: any }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
        <h3 className="text-xl font-semibold text-gray-800">
          Tareas Completadas
        </h3>
        <p className="text-2xl font-bold text-blue-600">
          {performanceData.completedAssignments}
        </p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
        <h3 className="text-xl font-semibold text-gray-800">
          Tareas Pendientes
        </h3>
        <p className="text-2xl font-bold text-red-600">
          {performanceData.pendingAssignments}
        </p>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
        <h3 className="text-xl font-semibold text-gray-800">Progreso Total</h3>
        <p className="text-2xl font-bold text-green-600">
          {performanceData.overallProgress}%
        </p>
      </div>
    </div>
  );
}

// Componente PieChartCard
function PieChartCard({ data }: { data: any }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
      <h3 className="text-xl font-semibold text-gray-800">
        Progreso del Estudiante
      </h3>
      <div className="h-64 flex justify-center items-center">
        {/* Aquí agregamos una gráfica funcional usando Chart.js */}
        <PieChart data={data} />
      </div>
    </div>
  );
}

// Gráfico de tipo Pie
function PieChart({ data }: { data: any }) {
  const chartData = {
    labels: ["Completado", "Pendiente"],
    datasets: [
      {
        data: [data.completedAssignments, data.pendingAssignments],
        backgroundColor: ["#4CAF50", "#FF5733"],
        borderColor: ["#4CAF50", "#FF5733"],
        borderWidth: 1,
      },
    ],
  };

  return <Line data={chartData} options={{ responsive: true }} />;
}

// Componente ActivityChart
function ActivityChart({ data }: { data: any }) {
  const chartData = {
    labels: [
      "Lunes",
      "Martes",
      "Miércoles",
      "Jueves",
      "Viernes",
      "Sábado",
      "Domingo",
    ],
    datasets: [
      {
        label: "Actividades Diarias",
        data: data.dailyActivity,
        fill: true,
        backgroundColor: "rgba(66, 153, 225, 0.2)",
        borderColor: "rgb(66, 153, 225)",
        tension: 0.3,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
      <h3 className="text-xl font-semibold text-gray-800">Actividad Semanal</h3>
      <div className="h-64">
        <Line data={chartData} options={{ responsive: true }} />
      </div>
    </div>
  );
}

// Componente PerformanceGraph
function PerformanceGraph({ data }: { data: any }) {
  const chartData = {
    labels: ["Semana 1", "Semana 2", "Semana 3", "Semana 4", "Semana 5"],
    datasets: [
      {
        label: "Rendimiento Semanal",
        data: data.weeklyPerformance,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
      <h3 className="text-xl font-semibold text-gray-800">
        Gráfico de Rendimiento
      </h3>
      <div className="h-64">
        <Line data={chartData} options={{ responsive: true }} />
      </div>
    </div>
  );
}

// Componente AssignmentsList
function AssignmentsList({ assignments }: { assignments: any[] }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
      <h3 className="text-xl font-semibold text-gray-800">Lista de Tareas</h3>
      <ul className="space-y-4 mt-4">
        {assignments.map((assignment) => (
          <li key={assignment.id} className="border-b pb-4">
            <h4 className="font-medium text-gray-800">{assignment.title}</h4>
            <p className="text-sm text-gray-500">
              Fecha de entrega: {assignment.dueDate}
            </p>
            <p
              className={`mt-2 text-sm ${
                assignment.status === "Pendiente"
                  ? "text-red-500"
                  : "text-green-500"
              }`}
            >
              {assignment.status}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Componente ProfileSidebar
function ProfileSidebar() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
      <h3 className="text-xl font-semibold text-gray-800">Perfil</h3>
      <div className="mt-4">
        <p className="text-lg font-semibold text-gray-800">Juan Pérez</p>
        <p className="text-sm text-gray-500">
          Estudiante en Ciencias Computacionales
        </p>
      </div>
      <div className="mt-6">
        <p className="text-sm text-gray-500">Último acceso: 9 de mayo, 2025</p>
      </div>
    </div>
  );
}

// Componente Calendar
function Calendar({ events }: { events: any[] }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
      <h3 className="text-xl font-semibold text-gray-800">
        Calendario de Tareas y Exámenes
      </h3>
      <ul className="space-y-4 mt-4">
        {events.map((event, index) => (
          <li key={index} className="border-b pb-4">
            <h4 className="font-medium text-gray-800">{event.title}</h4>
            <p className="text-sm text-gray-500">Fecha: {event.date}</p>
            <p className="text-sm">{event.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Componente Principal: Dashboard
export default function Dashboard() {
  // Datos simulados para los componentes
  const performanceData = {
    completedAssignments: 14,
    pendingAssignments: 6,
    overallProgress: 78,
  };

  const activityData = {
    dailyActivity: [4, 5, 3, 6, 7, 4, 2],
    weeklyActivity: [12, 15, 20, 8, 10, 14, 17],
  };

  const weeklyPerformance = [80, 85, 70, 90, 95];
  const assignments = [
    {
      id: 1,
      title: "Matemáticas - Problemas de álgebra",
      dueDate: "2025-05-15",
      status: "Pendiente",
    },
    {
      id: 2,
      title: "Historia - Informe sobre la Revolución Francesa",
      dueDate: "2025-05-18",
      status: "Completado",
    },
    {
      id: 3,
      title: "Ciencias - Examen sobre biología",
      dueDate: "2025-05-20",
      status: "Pendiente",
    },
    {
      id: 4,
      title: "Inglés - Ensayo sobre Shakespeare",
      dueDate: "2025-05-22",
      status: "Pendiente",
    },
  ];

  const calendarEvents = [
    {
      title: "Examen de Matemáticas",
      date: "2025-05-15",
      description: "Revisión final de álgebra",
    },
    {
      title: "Tarea de Historia",
      date: "2025-05-18",
      description: "Entrega de informe sobre la Revolución Francesa",
    },
    {
      title: "Examen de Ciencias",
      date: "2025-05-20",
      description: "Examen práctico de biología",
    },
    {
      title: "Ensayo de Inglés",
      date: "2025-05-22",
      description: "Entrega del ensayo sobre Shakespeare",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* --- Overview Section --- */}
        <OverviewCards performanceData={performanceData} />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* --- Main Content Section --- */}
          <div className="lg:col-span-3 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-1">
                <PieChartCard data={performanceData} />
              </div>
              <div className="md:col-span-2">
                <ActivityChart data={activityData} />
              </div>
              <PerformanceGraph data={{ weeklyPerformance }} />
              <div className="md:col-span-2">
                <AssignmentsList assignments={assignments} />
              </div>
            </div>
          </div>

          {/* --- Sidebar Section --- */}
          <div className="lg:col-span-1 space-y-6">
            <ProfileSidebar />
            <Calendar events={calendarEvents} />
          </div>
        </div>
      </div>
    </div>
  );
}
