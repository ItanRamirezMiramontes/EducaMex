import { useState, useEffect } from "react";
import { auth, firestore } from "../../../backend/database/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import OverviewCard from "../../components/admin/OverviewCards/OverviewCard";
import PerformanceChart from "../../components/admin/PerformanceChart/PerformanceChart";
import RecentActivity from "../../components/admin/RecentActivity/RecentActivity";
import AlertsPanel from "../../components/admin/AlertsPanel/AlertsPanel";
import QuickActions from "../../components/admin/AlertsPanel/QuickActions/QuickActions";
import InstitutionForm from "../../components/InstitutionForm";

export default function AdminDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [institutionData, setInstitutionData] = useState<any>(null);
  const [usersCount, setUsersCount] = useState<number>(0);

  const data = [12, 19, 3, 5, 2, 3]; // Datos para el gráfico de rendimiento
  const labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"]; // Etiquetas para el gráfico de rendimiento

  const overviewData = [
    {
      title: "Usuarios",
      count: usersCount,
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

  const recentActivities = [
    { id: "1", description: "Nueva clase creada", date: "05/06/2025" },
    { id: "2", description: "Nuevo usuario registrado", date: "04/06/2025" },
    { id: "3", description: "Actividad completada", date: "03/06/2025" },
  ];

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

  useEffect(() => {
    const fetchData = async () => {
      if (auth.currentUser) {
        // Obtener datos del usuario
        const userDocRef = doc(firestore, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());
          console.log("Datos del usuario:", userDoc.data());

          // Obtener los datos de la institución
          const institutionId = userDoc.data().institutionId;
          console.log("institutionId del usuario:", institutionId);
          const institutionDocRef = doc(
            firestore,
            "institutions",
            institutionId
          );
          const institutionDoc = await getDoc(institutionDocRef);
          if (institutionDoc.exists()) {
            setInstitutionData(institutionDoc.data());
            console.log("Datos de la institución:", institutionDoc.data());

            // Obtener el número de usuarios con el mismo institutionId
            const usersRef = collection(firestore, "users");
            const q = query(
              usersRef,
              where("institutionId", "==", institutionId)
            );
            const querySnapshot = await getDocs(q);

            // Verifica cuántos usuarios se encontraron
            console.log("Número de usuarios encontrados:", querySnapshot.size);
            setUsersCount(querySnapshot.size);
          }
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6">
      {institutionData && (
        <h1 className="text-2xl font-bold">{institutionData.name}</h1>
      )}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Bienvenido {userData?.name}</h1>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md transition"
        >
          Crear institución
        </button>
      </div>

      {showForm && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">Crear nueva institución</h2>
          <InstitutionForm />
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
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
        <PerformanceChart data={data} labels={labels} />
        <RecentActivity activities={recentActivities} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <AlertsPanel alerts={alerts} />
        <QuickActions />
      </div>
    </div>
  );
}
