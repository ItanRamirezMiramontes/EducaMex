import React, { useState, useEffect } from "react";
import {
  onSnapshot,
  collection,
  query,
  orderBy,
  getDocs,
} from "firebase/firestore";
import { firestore } from "../../../backend/database/firebase"; // Asegúrate de que la ruta sea correcta
import { FaUser, FaChalkboardTeacher, FaChartBar } from "react-icons/fa"; // Iconos de react-icons
import InstitutionInfo from "./components/institution/InstitutionInfo";
import OverviewCard from "../../components/admin/OverviewCards/OverviewCard";
import PerformanceChart from "../../components/admin/PerformanceChart/PerformanceChart";
import AlertsPanel from "../../components/admin/AlertsPanel/AlertsPanel";
import QuickActions from "../../components/admin/AlertsPanel/QuickActions/QuickActions";

// Datos de ejemplo para la gráfica
const data = [12, 19, 3, 5, 2, 3];
const labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"];

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

const RecentActivity: React.FC<{ activities: any[] }> = ({ activities }) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="font-bold text-lg mb-4">Actividades recientes</h3>
      <ul>
        {activities.length === 0 ? (
          <li>No hay actividades recientes.</li>
        ) : (
          activities.map((activity) => (
            <li key={activity.id} className="border-b py-2">
              <p>{activity.description}</p>
              <p className="text-gray-500 text-sm">{activity.timestamp}</p>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

const InstitutionPage: React.FC = () => {
  const [recentActivities, setRecentActivities] = useState<any[]>([]);
  const [overviewData, setOverviewData] = useState<any[]>([]);

  useEffect(() => {
    // Obtener actividades recientes
    const activitiesRef = collection(firestore, "activities");
    const q = query(activitiesRef, orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const activitiesList: any[] = [];
      querySnapshot.forEach((doc) => {
        activitiesList.push({ id: doc.id, ...doc.data() });
      });
      setRecentActivities(activitiesList);
    });

    // Obtener estadísticas de la institución (número de estudiantes y clases)
    const getOverviewData = async () => {
      const studentsRef = collection(firestore, "users");
      const studentsSnapshot = await getDocs(studentsRef);
      const studentsCount = studentsSnapshot.size;

      const classesRef = collection(firestore, "classes");
      const classesSnapshot = await getDocs(classesRef);
      const classesCount = classesSnapshot.size;

      const performance = 0;

      setOverviewData([
        {
          title: "Estudiantes Registrados",
          count: studentsCount,
          description:
            "Número total de estudiantes registrados en la institución",
          icon: <FaUser />, // Icono de react-icons
        },
        {
          title: "Clases Activas",
          count: classesCount,
          description: "Número de clases actualmente activas en la institución",
          icon: <FaChalkboardTeacher />, // Icono de react-icons
        },
        {
          title: "Rendimiento Global",
          count: performance, // Aquí se mostrará el rendimiento real calculado
          description: "Porcentaje de rendimiento promedio de los estudiantes",
          icon: <FaChartBar />, // Icono de react-icons
        },
      ]);
    };

    getOverviewData();

    return () => unsubscribe();
  }, []);

  return (
    <div className="container mx-auto p-6">
      {/* Información de la institución */}
      <div className="mb-6">
        <InstitutionInfo />
      </div>

      {/* Resumen de estadísticas */}
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
        <PerformanceChart data={data} labels={labels} />
        <RecentActivity activities={recentActivities} />
      </div>

      {/* Panel de alertas y acciones rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <AlertsPanel alerts={alerts} />
        <QuickActions />
      </div>
    </div>
  );
};

export default InstitutionPage;
