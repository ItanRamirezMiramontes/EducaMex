import { useState } from "react";
import Sidebar from "../components/SideBar";
import { Outlet } from "react-router-dom";

export default function StudentLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        userRole="estudiante"
        assignedClasses={[""]}
      />
      <main
        className={`flex-1 p-4 transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-16"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}
