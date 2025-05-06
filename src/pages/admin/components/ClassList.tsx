// src/components/ClassList.tsx
import React from "react";

interface Class {
  id: string;
  name: string;
  teacher: string;
  studentCount: number;
}

interface ClassListProps {
  classes: Class[];
}

const ClassList: React.FC<ClassListProps> = ({ classes }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-4">Lista de Clases</h3>
      <table className="min-w-full table-auto">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Clase</th>
            <th className="px-4 py-2">Profesor</th>
            <th className="px-4 py-2">Estudiantes</th>
            <th className="px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {classes.map((classe) => (
            <tr key={classe.id} className="border-b">
              <td className="px-4 py-2">{classe.name}</td>
              <td className="px-4 py-2">{classe.teacher}</td>
              <td className="px-4 py-2">{classe.studentCount}</td>
              <td className="px-4 py-2">
                <button className="bg-blue-500 text-white p-2 rounded">
                  Ver
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClassList;
