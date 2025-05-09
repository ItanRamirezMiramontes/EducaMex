import React from "react";
import { UserIcon, ActivityIcon, BarChartIcon } from "lucide-react";
import InstitutionInfo from "./components/institution/InstitutionInfo";
import RecentActivity from "./components/institution/RecentActivity";
import QuickActions from "./components/institution/ActionQuick";
import AlertsPanel from "./components/institution/AlertsPanel";
import OverviewCard from "../../components/admin/OverviewCards/OverviewCard";
import PerformanceChart from "../../components/admin/PerformanceChart/PerformanceChart";

// Datos de ejemplo para la gráfica
const data = [12, 19, 3, 5, 2, 3];
const labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"];

// Datos para las tarjetas Overview
const overviewData = [
  {
    title: "Estudiantes Registrados",
    count: 1200,
    description: "Número total de estudiantes registrados en la institución",
    icon: <UserIcon />,
  },
  {
    title: "Clases Activas",
    count: 25,
    description: "Número de clases actualmente activas en la institución",
    icon: <ActivityIcon />,
  },
  {
    title: "Rendimiento Global",
    count: 85,
    description: "Porcentaje de rendimiento promedio de los estudiantes",
    icon: <BarChartIcon />,
  },
];

// Datos para las actividades recientes
const recentActivities = [
  { id: 1, description: "Nueva clase creada", timestamp: "05/06/2025" },
  { id: 2, description: "Nuevo usuario registrado", timestamp: "04/06/2025" },
  { id: 3, description: "Actividad completada", timestamp: "03/06/2025" },
];

// Datos para las alertas
const alerts = [
  {
    id: "1",
    message: "El sistema estará en mantenimiento a las 10 PM",
    type: "warning" as "warning",
  },
  {
    id: "2",
    message: "Nuevo reporte de desempeño disponible",
    type: "info" as "info",
  },
];

const InstitutionPage: React.FC = () => {
  return (
    <div className="container mx-auto p-6">
      {/* Información de la institución */}
      <div className="mb-6">
        <InstitutionInfo />
      </div>

      {/* Resumen de estadísticas en formato grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {overviewData.map((data, index) => (
          <OverviewCard
            key={index}
            title={data.title}
            count={data.count}
            description={data.description}
            icon={data.icon}
            color="bg-blue-500" // Personaliza el color aquí
          />
        ))}
      </div>

      {/* Gráfico de desempeño y actividades recientes */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Gráfico de desempeño */}
        <PerformanceChart data={data} labels={labels} />

        {/* Actividades recientes */}
        <RecentActivity activities={recentActivities} />
      </div>

      {/* Panel de alertas y acciones rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Panel de alertas */}
        <AlertsPanel alerts={alerts} />

        {/* Acciones rápidas */}
        <QuickActions />
      </div>
    </div>
  );
};

export default InstitutionPage;
