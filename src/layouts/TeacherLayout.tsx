import { useState } from "react";
import Sidebar from "../components/SideBar";

export default function TeacherLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        userRole="profesor"
        assignedClasses={[]}
      />
      <main className="flex-1 p-4">
        <h1 className="text-2xl">Bienvenido, Profesor</h1>
        <p>
          Aquí puedes gestionar las clases y ver a los estudiantes asignados a
          ellas.
        </p>
      </main>
    </div>
  );
}
