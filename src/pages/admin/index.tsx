import { useState, useEffect } from "react";
import { auth, firestore } from "../../../backend/database/firebase";
import {
  doc,
  getDoc,
  collection,
  query,
  where,
  getDocs,
  startAt,
  Timestamp,
} from "firebase/firestore";
import OverviewCard from "../../components/admin/OverviewCards/OverviewCard";
import ComparativeLineChart from "./components/ComparativeLineChart"; // Importamos el nuevo componente de gráfico
import RecentActivity from "../../components/admin/RecentActivity/RecentActivity";
import AlertsPanel from "../../components/admin/AlertsPanel/AlertsPanel";
import QuickActions from "../../components/admin/AlertsPanel/QuickActions/QuickActions";
import InstitutionForm from "../../components/InstitutionForm";

export default function AdminDashboard() {
  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [institutionData, setInstitutionData] = useState<any>(null);
  const [usersCount, setUsersCount] = useState<number>(0);
  const [classesCount, setClassesCount] = useState<number>(0); // Agregamos el contador de clases
  const [newUsersData, setNewUsersData] = useState<number[]>([]);
  const [newInstitutionsData, setNewInstitutionsData] = useState<number[]>([]);

  const labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"]; // Etiquetas para el gráfico

  const overviewData = [
    {
      title: "Usuarios",
      count: usersCount,
      description: "Total de usuarios",
      icon: <i className="fas fa-users"></i>,
    },
    {
      title: "Clases",
      count: classesCount, // Mostramos el contador de clases
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
        const userDocRef = doc(firestore, "users", auth.currentUser.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserData(userDoc.data());

          const institutionId = userDoc.data().institutionId;
          const institutionDocRef = doc(
            firestore,
            "institutions",
            institutionId
          );
          const institutionDoc = await getDoc(institutionDocRef);
          if (institutionDoc.exists()) {
            setInstitutionData(institutionDoc.data());

            // Consultamos las clases del usuario según el institutionId
            const classesRef = collection(firestore, "classes");
            const q = query(
              classesRef,
              where("institutionId", "==", institutionId)
            );
            const querySnapshot = await getDocs(q);
            setClassesCount(querySnapshot.size); // Contamos cuántas clases existen

            // Consultamos los usuarios asociados a esta institución
            const usersRef = collection(firestore, "users");
            const qUsers = query(
              usersRef,
              where("institutionId", "==", institutionId)
            );
            const usersSnapshot = await getDocs(qUsers);
            setUsersCount(usersSnapshot.size);

            // Obtener los usuarios nuevos por mes
            const userMonthlyQuery = query(
              usersRef,
              where("createdAt", ">=", startAt(Timestamp.now()))
            );
            const monthlyUsersSnapshot = await getDocs(userMonthlyQuery);
            const userMonthlyData: number[] = [];
            monthlyUsersSnapshot.forEach((doc) => {
              const createdAt = doc.data().createdAt?.toDate();
              const month = createdAt?.getMonth(); // obtener el mes de la fecha
              if (month !== undefined) {
                userMonthlyData[month] = (userMonthlyData[month] || 0) + 1;
              }
            });
            setNewUsersData(userMonthlyData);

            // Obtener las instituciones nuevas por mes
            const institutionsRef = collection(firestore, "institutions");
            const institutionsSnapshot = await getDocs(institutionsRef);
            const institutionMonthlyData: number[] = [];
            institutionsSnapshot.forEach((doc) => {
              const createdAt = doc.data().createdAt?.toDate();
              const month = createdAt?.getMonth(); // obtener el mes de la fecha
              if (month !== undefined) {
                institutionMonthlyData[month] =
                  (institutionMonthlyData[month] || 0) + 1;
              }
            });
            setNewInstitutionsData(institutionMonthlyData);
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
          <InstitutionForm closeForm={() => setShowForm(false)} />
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
        <ComparativeLineChart
          usersData={newUsersData}
          institutionsData={newInstitutionsData}
          labels={labels}
        />
        <RecentActivity activities={recentActivities} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <AlertsPanel alerts={alerts} />
        <QuickActions />
      </div>
    </div>
  );
}
