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
import ComparativeLineChart from "./components/ComparativeLineChart";
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
  const [professorCount, setProfessorCount] = useState<number>(0);
  const [studentsData, setStudentsData] = useState<number[]>([]);
  const [professorsData, setProfessorsData] = useState<number[]>([]);

  const labels = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"];

  const overviewData = [
    {
      title: "Usuarios",
      count: usersCount,
      description: "Total de usuarios registrados",
      icon: <i className="fas fa-users text-blue-600 text-2xl"></i>,
    },
    {
      title: "Clases",
      count: classesCount,
      description: "Total de clases creadas",
      icon: (
        <i className="fas fa-chalkboard-teacher text-green-600 text-2xl"></i>
      ),
    },
    {
      title: "Profesores",
      count: professorCount,
      description: "Total de profesores activos",
      icon: <i className="fas fa-user-tie text-purple-600 text-2xl"></i>,
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
            }

            // Obtener clases
            const qClasses = query(
              collection(firestore, "classes"),
              where("institutionId", "==", institutionId)
            );
            const classesSnapshot = await getDocs(qClasses);
            setClassesCount(classesSnapshot.size);

            // Obtener usuarios
            const qUsers = query(
              collection(firestore, "users"),
              where("institutionId", "==", institutionId)
            );
            const usersSnapshot = await getDocs(qUsers);
            setUsersCount(usersSnapshot.size);

            const studentsPerMonth = new Array(6).fill(0);
            const professorsPerMonth = new Array(6).fill(0);

            usersSnapshot.forEach((doc) => {
              const data = doc.data();
              const createdAt = data.createdAt?.toDate();
              const month = createdAt?.getMonth();
              if (month !== undefined && month < 6) {
                if (data.role === "profesor") {
                  professorsPerMonth[month] += 1;
                } else if (data.role === "estudiante") {
                  studentsPerMonth[month] += 1;
                }
              }
            });

            setProfessorsData(professorsPerMonth);
            setStudentsData(studentsPerMonth);

            // Total profesores activos
            const qProfessors = query(
              collection(firestore, "users"),
              where("institutionId", "==", institutionId),
              where("role", "==", "profesor")
            );
            const professorsSnapshot = await getDocs(qProfessors);
            setProfessorCount(professorsSnapshot.size);
          }

          // Instituciones globales
          const institutionsSnapshot = await getDocs(
            collection(firestore, "institutions")
          );
          const institutionMonthlyData = new Array(6).fill(0);
          institutionsSnapshot.forEach((doc) => {
            const createdAt = doc.data().createdAt?.toDate();
            const month = createdAt?.getMonth();
            if (month !== undefined && month < 6) {
              institutionMonthlyData[month] += 1;
            }
          });
          setNewInstitutionsData(institutionMonthlyData);
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

  const recentActivities = [
    {
      id: "1",
      description: "Usuario Juan se registró",
      date: new Date().toISOString(),
    },
    {
      id: "2",
      description: "Clase Matemáticas creada",
      date: new Date().toISOString(),
    },
    {
      id: "3",
      description: "Institución EducaMex actualizada",
      date: new Date().toISOString(),
    },
  ];

  return (
    <div className="p-6 space-y-6">
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

      {showForm && (
        <div>
          <h2 className="text-xl font-bold mb-4">Crear nueva institución</h2>
          <InstitutionForm closeForm={() => setShowForm(false)} />
        </div>
      )}

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
            professorsData={professorsData}
            institutionsData={newInstitutionsData}
            studentsData={studentsData}
            labels={labels}
          />
        </div>
        <div className="w-full lg:w-1/3">
          <RecentActivity activities={recentActivities} />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AlertsPanel
          alerts={[
            {
              id: "1",
              message: "Nueva actualización disponible",
              type: "info",
            },
            { id: "2", message: "Usuario reportado", type: "warning" },
          ]}
        />
        <QuickActions />
      </div>
    </div>
  );
}
