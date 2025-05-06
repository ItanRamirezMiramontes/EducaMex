import { useState } from "react";
import Sidebar from "../components/SideBar";

export default function StudentLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        userRole="estudiante"
        assignedClasses={["Ciencias Naturales", "Matemáticas"]}
      />
      <main
        className={`flex-1 p-4 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <h1 className="text-2xl">Bienvenido, Estudiante</h1>
        <p>
          Aquí se mostrarán tus actividades y progreso en las clases asignadas.
        </p>
      </main>
    </div>
  );
}
