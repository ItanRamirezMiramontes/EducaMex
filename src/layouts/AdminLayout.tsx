import { useState } from "react";
import Sidebar from "../components/SideBar";
import { Outlet } from "react-router-dom";

export default function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        userRole="administrador"
        assignedClasses={[]}
      />
      <main
        className={`flex-1 p-6 bg-gray-50 overflow-y-auto transition-all duration-300 ${
          isSidebarOpen ? "ml-64" : "ml-20"
        }`}
      >
        <Outlet />
      </main>
    </div>
  );
}
