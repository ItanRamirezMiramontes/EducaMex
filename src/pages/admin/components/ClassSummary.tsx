// src/components/ClassSummary.tsx
import React from "react";

interface ClassSummaryProps {
  totalClasses: number;
  totalStudents: number;
  totalTeachers: number;
}

const ClassSummary: React.FC<ClassSummaryProps> = ({
  totalClasses,
  totalStudents,
  totalTeachers,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="bg-blue-500 p-6 text-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Total de Clases</h3>
        <p className="text-3xl font-bold">{totalClasses}</p>
      </div>
      <div className="bg-green-500 p-6 text-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Total de Estudiantes</h3>
        <p className="text-3xl font-bold">{totalStudents}</p>
      </div>
      <div className="bg-yellow-500 p-6 text-white rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">Total de Profesores</h3>
        <p className="text-3xl font-bold">{totalTeachers}</p>
      </div>
    </div>
  );
};

export default ClassSummary;
