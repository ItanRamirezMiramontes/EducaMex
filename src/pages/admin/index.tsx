import OverviewCard from "../../components/admin/OverviewCards/OverviewCard";
import PerformanceChart from "../../components/admin/PerformanceChart/PerformanceChart";
import RecentActivity from "../../components/admin/RecentActivity/RecentActivity";
import AlertsPanel from "../../components/admin/AlertsPanel/AlertsPanel";
import QuickActions from "../../components/admin/AlertsPanel/QuickActions/QuickActions";

export default function AdminDashboard() {
  // Datos de ejemplo para el gráfico
  const data = [12, 19, 3, 5, 2, 3];
  const labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"];

  // Datos de ejemplo para las tarjetas de Overview
  const overviewData = [
    {
      title: "Usuarios",
      count: 500,
      description: "Total de usuarios",
      icon: <i className="fas fa-users"></i>,
    },
    {
      title: "Clases",
      count: 30,
      description: "Total de clases creadas",
      icon: <i className="fas fa-chalkboard"></i>,
    },
    {
      title: "Actividades",
      count: 120,
      description: "Total de actividades",
      icon: <i className="fas fa-tasks"></i>,
    },
  ];

  // Datos de ejemplo para las actividades recientes
  const recentActivities = [
    { id: "1", description: "Nueva clase creada", date: "05/06/2025" },
    { id: "2", description: "Nuevo usuario registrado", date: "04/06/2025" },
    { id: "3", description: "Actividad completada", date: "03/06/2025" },
  ];

  // Datos de ejemplo para las alertas
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

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Bienvenido</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Tarjetas Overview */}
        {overviewData.map((data, index) => (
          <OverviewCard
            key={index}
            title={data.title}
            count={data.count}
            description={data.description}
            icon={data.icon}
            color={""}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
        {/* Gráfico de desempeño */}
        <PerformanceChart data={data} labels={labels} />

        {/* Actividades recientes */}
        <RecentActivity activities={recentActivities} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Panel de alertas */}
        <AlertsPanel alerts={alerts} />

        {/* Acciones rápidas */}
        <QuickActions />
      </div>
    </div>
  );
}
