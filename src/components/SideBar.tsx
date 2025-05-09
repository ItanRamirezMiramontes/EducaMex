import { useState, useEffect } from "react";
import {
  FaBook,
  FaBars,
  FaUserCircle,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import { firestore } from "../../backend/database/firebase"; // Usamos la instancia de firestore
import { collection, getDocs } from "firebase/firestore"; // Importamos las funciones de firestore

type ClassData = {
  id: string;
  name: string;
  studentIds: string[];
  teacherId: string;
  institutionId: string;
  room: string;
};

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  userRole: string;
  userId: string;
};

export default function Sidebar({
  isOpen,
  setIsOpen,
  userRole,
  userId,
}: SidebarProps) {
  const [classes, setClasses] = useState<ClassData[]>([]);
  const toggleSidebar = () => setIsOpen(!isOpen);
  const location = useLocation();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        // Obtenemos las clases desde Firestore
        const classesSnapshot = await getDocs(collection(firestore, "classes"));
        const classesData: ClassData[] = [];

        classesSnapshot.forEach((doc) => {
          const data = doc.data();
          const classData = {
            id: doc.id,
            name: data.name,
            studentIds: data.studentIds,
            teacherId: data.teacherId,
            institutionId: data.institutionId,
            room: data.room,
          };
          classesData.push(classData);
        });

        setClasses(classesData); // Guardamos las clases obtenidas en el estado
      } catch (error) {
        console.error("Error fetching classes from Firestore:", error);
      }
    };

    fetchClasses(); // Llamamos a la función para obtener las clases desde Firebase
  }, []);

  // Filtrar las clases para que solo se muestren las que contienen el `userId` en el array de estudiantes
  const filteredStudentClasses = classes.filter((cls) =>
    cls.studentIds.includes(userId)
  );

  const studentSubjects = filteredStudentClasses.map((cls) => ({
    name: cls.name,
    icon: <FaBook className="text-2xl" />,
    path: `/student/class/${cls.id}`,
  }));

  const adminModules = [
    {
      name: "Dashboard",
      icon: <FaCog className="text-2xl" />,
      path: "/admin/dashboard",
    },
    {
      name: "Clases",
      icon: <FaBook className="text-2xl" />,
      path: "/admin/clases",
    },
    {
      name: "Institución",
      icon: <FaCog className="text-2xl" />,
      path: "/admin/institution",
    },
    {
      name: "Reportes",
      icon: <FaCog className="text-2xl" />,
      path: "/admin/reports",
    },
    {
      name: "Usuarios",
      icon: <FaUserCircle className="text-2xl" />,
      path: "/admin/users",
    },
  ];

  const modulesByRole: Record<
    string,
    { name: string; icon: React.ReactNode; path: string }[]
  > = {
    estudiante: [
      {
        name: "Mi progreso",
        icon: <FaCog className="text-2xl" />,
        path: "/student/dashboard",
      },
      ...studentSubjects,
    ],
    profesor: [
      {
        name: "Mis clases",
        icon: <FaBook className="text-2xl" />,
        path: "/teacher/classes",
      },
      {
        name: "Reportes",
        icon: <FaCog className="text-2xl" />,
        path: "/teacher/reports",
      },
    ],
    administrador: adminModules,
  };

  const roleModules = modulesByRole[userRole] || [];

  return (
    <div
      className={`fixed top-0 left-0 h-screen bg-[#202c34] text-white flex flex-col transition-all duration-300 z-50 ${
        isOpen ? "w-64" : "w-20"
      }`}
    >
      {/* Header del sidebar */}
      <div className="p-4 flex items-center justify-between">
        <button onClick={toggleSidebar} className="text-white text-2xl">
          <FaBars />
        </button>
        {isOpen && (
          <img
            src="/educamex_logo.png"
            alt="Logo EduPanel"
            className="h-8 ml-2"
          />
        )}
      </div>

      {/* Usuario */}
      <div className="flex flex-col items-center mt-4 mb-6">
        <FaUserCircle className="text-5xl" />
        {isOpen && (
          <p className="mt-2 text-sm">
            {userRole === "estudiante"
              ? "Alumno"
              : userRole === "profesor"
              ? "Profesor"
              : "Administrador"}
          </p>
        )}
      </div>

      {/* Módulos del rol */}
      <nav className="flex-1">
        {roleModules.map((mod, index) => (
          <Link
            to={mod.path}
            key={index}
            className={`flex items-center gap-4 px-4 py-3 hover:bg-[#2c3e50] ${
              location.pathname === mod.path ? "bg-[#2c3e50]" : ""
            }`}
          >
            {mod.icon}
            {isOpen && <span className="text-base">{mod.name}</span>}
          </Link>
        ))}
      </nav>

      {/* Opción común: configuración */}
      <div className="px-4 py-4 hover:bg-[#2c3e50] cursor-pointer flex items-center gap-4">
        <FaCog className="text-2xl" />
        {isOpen && <span className="text-base">Configuración</span>}
      </div>

      <Link
        to="/"
        className="px-4 py-4 hover:bg-[#2c3e50] cursor-pointer flex items-center gap-4 text-red-400"
      >
        <FaSignOutAlt className="text-2xl" />
        {isOpen && <span className="text-base">Salir</span>}
      </Link>
    </div>
  );
}
