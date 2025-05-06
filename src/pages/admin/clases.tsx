// src/pages/admin/ClasesPage.tsx
import React, { useState } from "react";
import ClassList from "./components/ClassList";
import ClassSummary from "./components/ClassSummary";
import ClassProgressChart from "./components/ClassProgressChart";
import ClassFilters from "./components/ClassFilters";
import AddClassModal from "./components/AddClassModal";

const ClasesPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [classes, setClasses] = useState([
    { id: "1", name: "Matemáticas", teacher: "Prof. Juan", studentCount: 30 },
    { id: "2", name: "Ciencias", teacher: "Prof. Ana", studentCount: 25 },
  ]);

  const handleAddClass = (name: string, teacher: string) => {
    setClasses([
      ...classes,
      { id: Math.random().toString(), name, teacher, studentCount: 0 },
    ]);
  };

  const filteredClasses = classes.filter((cls) =>
    cls.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Panel de Clases</h1>

      <ClassSummary
        totalClasses={classes.length}
        totalStudents={100}
        totalTeachers={10}
      />

      <ClassProgressChart
        data={[12, 19, 3, 5, 2, 3]}
        labels={["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio"]}
      />

      <ClassFilters onFilter={setSearchQuery} />

      <ClassList classes={filteredClasses} />

      <button
        className="bg-blue-500 text-white p-2 rounded mt-6"
        onClick={() => setIsModalOpen(true)}
      >
        Agregar Clase
      </button>

      <AddClassModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddClass={handleAddClass}
      />
    </div>
  );
};

export default ClasesPage;
