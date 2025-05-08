import { JSX } from "react";
import {
  FaBook,
  FaHistory,
  FaCog,
  FaBars,
  FaUserCircle,
  FaGlobeAmericas,
  FaTachometerAlt,
  FaSignOutAlt,
} from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

type SidebarProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  userRole: string;
  assignedClasses: string[];
};

export default function Sidebar({
  isOpen,
  setIsOpen,
  userRole,
  assignedClasses,
}: SidebarProps) {
  const toggleSidebar = () => setIsOpen(!isOpen);
  const location = useLocation();

  const studentSubjects = [
    {
      name: "Dashboard",
      icon: <FaTachometerAlt className="text-2xl" />,
      path: "/student/dashboard",
    },
  ];

  const profesorModules = [{}];

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
      icon: <FaGlobeAmericas className="text-2xl" />,
      path: "/admin/institution",
    },
    {
      name: "Reportes",
      icon: <FaHistory className="text-2xl" />,
      path: "/admin/reports",
    },
    {
      name: "Usuarios",
      icon: <FaUserCircle className="text-2xl" />,
      path: "/admin/users",
    },
  ];

  // Normalización por rol
  const modulesByRole: Record<
    string,
    { name: string; icon: JSX.Element; path: string }[]
  > = {
    estudiante: studentSubjects.filter((subject) =>
      assignedClasses.includes(subject.name)
    ),
    profesor: [],
    administrador: adminModules,
  };

  const roleModules = modulesByRole[userRole] || [];

  // Agregar "Mi progreso" al inicio para estudiantes
  const studentProgressModule = {
    name: "Mi progreso",
    icon: <FaCog className="text-2xl" />,
    path: "/student/dashboard",
  };

  if (userRole === "estudiante") {
    roleModules.unshift(studentProgressModule);
  }

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
