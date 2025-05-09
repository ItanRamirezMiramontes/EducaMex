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
  const [classesCount, setClassesCount] = useState<number>(0);
  const [newUsersData, setNewUsersData] = useState<number[]>([]);
  const [newInstitutionsData, setNewInstitutionsData] = useState<number[]>([]);

  const labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"];

  const overviewData = [
    {
      title: "Usuarios",
      count: usersCount,
      description: "Total de usuarios",
      icon: <i className="fas fa-users"></i>,
    },
    {
      title: "Clases",
      count: classesCount,
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
      try {
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

              // 🔍 CLASES
              const classesRef = collection(firestore, "classes");
              const q = query(
                classesRef,
                where("institutionId", "==", institutionId)
              );
              const querySnapshot = await getDocs(q);
              console.log("Clases encontradas:", querySnapshot.size); // ✅
              setClassesCount(querySnapshot.size);

              // 🔍 USUARIOS
              const usersRef = collection(firestore, "users");
              const qUsers = query(
                usersRef,
                where("institutionId", "==", institutionId)
              );
              const usersSnapshot = await getDocs(qUsers);
              setUsersCount(usersSnapshot.size);

              // 🔍 NUEVOS USUARIOS
              const userMonthlyData: number[] = new Array(6).fill(0);
              usersSnapshot.forEach((doc) => {
                const createdAt = doc.data().createdAt?.toDate();
                const month = createdAt?.getMonth();
                if (month !== undefined && month < 6) {
                  userMonthlyData[month] += 1;
                }
              });
              setNewUsersData(userMonthlyData);

              // 🔍 INSTITUCIONES
              const institutionsRef = collection(firestore, "institutions");
              const institutionsSnapshot = await getDocs(institutionsRef);
              const institutionMonthlyData: number[] = new Array(6).fill(0);
              institutionsSnapshot.forEach((doc) => {
                const createdAt = doc.data().createdAt?.toDate();
                const month = createdAt?.getMonth();
                if (month !== undefined && month < 6) {
                  institutionMonthlyData[month] += 1;
                }
              });
              setNewInstitutionsData(institutionMonthlyData);
            }
          }
        }
      } catch (error) {
        console.error(
          "Error cargando datos del panel de administrador:",
          error
        );
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      {/* Encabezado con nombre de la institución y saludo */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-2 md:space-y-0">
        <div>
          {institutionData && (
            <h1 className="text-2xl font-bold text-gray-800">
              {institutionData.name}
            </h1>
          )}
          <h2 className="text-xl font-semibold text-gray-700">
            Bienvenido {userData?.name}
          </h2>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md shadow-md transition"
        >
          Crear institución
        </button>
      </div>

      {/* Formulario de creación */}
      {showForm && (
        <div>
          <h2 className="text-xl font-bold mb-4">Crear nueva institución</h2>
          <InstitutionForm closeForm={() => setShowForm(false)} />
        </div>
      )}

      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      <div className="flex flex-col lg:flex-row gap-6 mt-6">
        <div className="w-full lg:w-2/3">
          <ComparativeLineChart
            usersData={newUsersData}
            institutionsData={newInstitutionsData}
            labels={labels}
          />
        </div>
        <div className="w-full lg:w-1/3">
          <RecentActivity activities={recentActivities} />
        </div>
      </div>

      {/* Alertas y acciones rápidas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AlertsPanel alerts={alerts} />
        <QuickActions />
      </div>
    </div>
  );
}
