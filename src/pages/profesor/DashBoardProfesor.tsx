import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2"; // Importación de Chart.js

const PerformanceChart = () => {
  const data = {
    labels: ["Enero", "Febrero", "Marzo", "Abril", "Mayo"],
    datasets: [
      {
        label: "Progreso de Clases",
        data: [65, 59, 80, 81, 56],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold">Gráfico de Progreso de Clases</h3>
      <Line data={data} />
    </div>
  );
};

// Componente ProgressCard
const ProgressCard = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="text-xl font-semibold">Progreso General</h3>
      <div className="flex justify-between items-center mt-4">
        <div>
          <p className="text-sm text-gray-500">Tareas Completadas</p>
          <p className="text-lg font-semibold">80%</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Estudiantes Aprobados</p>
          <p className="text-lg font-semibold">95%</p>
        </div>
      </div>
    </div>
  );
};

// Componente Dashboard del Profesor
const TeacherDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Dashboard - Profesor
      </h1>

      {/* Tarjetas de información */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card de Clases */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Mis Clases</h2>
            <p className="text-sm text-gray-500">Gestión de clases activas</p>
          </div>
          <Link
            to="/teacher/classes"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Ver todas
          </Link>
        </div>

        {/* Card de Tareas Pendientes */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Tareas Pendientes</h2>
            <p className="text-sm text-gray-500">
              Tareas por revisar o asignar
            </p>
          </div>
          <Link
            to="/teacher/manage-tasks"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Ver tareas
          </Link>
        </div>

        {/* Card de Estudiantes */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Mis Estudiantes</h2>
            <p className="text-sm text-gray-500">
              Gestiona el progreso de tus estudiantes
            </p>
          </div>
          <Link
            to="/teacher/students"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Ver estudiantes
          </Link>
        </div>

        {/* Card de Reportes */}
        <div className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Reportes</h2>
            <p className="text-sm text-gray-500">
              Accede a los reportes de desempeño
            </p>
          </div>
          <Link
            to="/teacher/reports"
            className="text-blue-500 hover:text-blue-700 font-semibold"
          >
            Ver reportes
          </Link>
        </div>
      </div>

      {/* Gráfico de Progreso */}
      <div className="mt-8">
        <PerformanceChart />
      </div>

      {/* ProgressCard para mostrar el progreso general */}
      <div className="mt-8">
        <ProgressCard />
      </div>
    </div>
  );
};

export default TeacherDashboard;
